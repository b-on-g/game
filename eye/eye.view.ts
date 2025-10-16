namespace $.$$ {
	export class $bog_game_eye extends $.$bog_game_eye {
		@$mol_mem
		program() {
			return this.context().func('bog_game_eye', {
				glob: {
					wireframe: 'float',
					projTrans: 'mat4',
					viewTrans: 'mat4',
					textures: 'sampler2DArray',
				},
				input: {
					vertexCoord: 'vec4',
					texOffset: 'vec2',
					instTrans: 'mat4',
					instTex: 'float',
				},
				pipe: {
					worldPos: 'vec4',
					viewPos: 'vec4',
					texId: 'float',
					textPos: 'vec2',
					texScale: 'vec2',
					instId: 'float',
					vertexId: 'float',
				},
				output: {
					color: 'vec4',
				},
			})
		}

		@$mol_mem
		proj_matrix() {
			let aspect = this.width() / this.height()
			if (!Number.isFinite(aspect)) aspect = 1
			return $mol_3d_mat4.perspective(Math.PI / 2, aspect, 0.0001, 50)
		}

		@$mol_mem
		view_matrix() {
			const map_width = this.Realm().map_width()
			const map_height = this.Realm().map_height()
			const [x, y] = this.pos()
			const a = this.angle()

			return $mol_3d_mat4.multiply(
				$mol_3d_mat4.rotation([1, 0, 0], -Math.PI / 2),
				$mol_3d_mat4.rotation([0, 0, 1], a),
				$mol_3d_mat4.scaling([1, 1, 1]),
				$mol_3d_mat4.translation([-x, y, 0.25]),
			)
		}

		@$mol_mem
		groups() {
			const groups = new Map<$mol_3d_shape, $mol_3d_object[]>()

			for (const obj of this.objects()) {
				let list = groups.get(obj.shape())
				if (list) list.push(obj)
				else groups.set(obj.shape(), [obj])
			}

			return groups
		}

		@$mol_mem_key
		group_textures(shape: $mol_3d_shape) {
			const program = this.program()
			const objects = this.groups().get(shape)!
			const ids = new Array(objects.length)
			const map = this.texture_map()

			for (let i = 0; i < objects.length; ++i) {
				ids[i] = new Float32Array([map.get(objects[i].texture())!])
			}

			program.geometry(shape).use(geometry => {
				program.param('instTex')!.vectors(1).send(ids)
			})

			return ids
		}

		// @ $mol_mem_key
		group_trans(shape: $mol_3d_shape) {
			const program = this.program()
			const objects = this.groups().get(shape)!

			return program.geometry(shape).use(geometry => {
				return program
					.param('instTrans')!
					.matrices([4, 4])
					.send(objects.map(obj => obj.transform()))
			})
		}

		@$mol_mem_key
		group_skin(shape: $mol_3d_shape) {
			const program = this.program()

			program.geometry(shape).use(geometry => {
				program.param('texOffset')!.vector(2).send([shape.skin()])
			})
		}

		@$mol_mem_key
		group_vertex(shape: $mol_3d_shape) {
			const program = this.program()

			program.geometry(shape).use(geometry => {
				program.param('vertexCoord')!.vector(3).send([shape.geometry()])
			})
		}

		// @ $mol_mem_key
		prepare_group(shape: $mol_3d_shape) {
			const program = this.program()

			this.group_skin(shape)
			this.group_textures(shape)
			this.group_trans(shape)
			this.group_vertex(shape)

			return program.geometry(shape).use(geometry => {
				geometry.size = shape.size()
				geometry.count = this.groups().get(shape)!.length
			})
		}

		// @ $mol_mem
		prepare() {
			return new Map([...this.groups().keys()].map(shape => [shape, this.prepare_group(shape)]))
		}

		@$mol_mem
		texture_map() {
			const map = new Map<$mol_3d_image, number>()

			for (const obj of this.objects()) {
				const texture = obj.texture()

				const index = map.get(texture)
				if (index !== undefined) continue

				map.set(texture, map.size)
			}

			return map
		}

		@$mol_mem
		textures() {
			const textures = $mol_wire_race(...[...this.texture_map().keys()].map(image => () => image.data()))

			return this.program().glob('textures').texture().send_multi(textures)
		}

		paint() {
			this.program().use(program => {
				this.textures()

				program.glob('projTrans').matrix(this.proj_matrix())
				program.glob('viewTrans').matrix(this.view_matrix())

				for (const [shape, geometry] of this.prepare().entries()) {
					geometry.use(() => {
						program.strips(0, shape.size(), geometry.count)

						if (this.wireframe()) {
							program.glob('wireframe').vector_float([1])
							program.lines(0, shape.size(), geometry.count)
							program.points(0, shape.size(), geometry.count)
							program.glob('wireframe').vector_float([0])
						}
					})
				}
			})
		}
	}
}
