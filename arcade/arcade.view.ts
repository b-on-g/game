namespace $.$$ {
	export class $bog_game_arcade extends $.$bog_game_arcade {
		stat() {
			return [
				`pos: ${this.guy_pos()
					.map(v => v.toFixed(3))
					.join(' x ')}`,
				`angle: ${this.guy_angle().toFixed(3)}`,
				`objects: ${this.Guy_eye().objects().length}`,
				`shapes: ${this.Guy_eye().groups().size}`,
				`textures: ${this.Guy_eye().texture_map().size}`,
			].join(' | ')
		}

		@$mol_mem
		world_items() {
			const map = this.Realm().map_rows()
			const items = [] as { x: number; y: number; kind: string; side: number }[]

			for (let y = 0; y < map.length; ++y) {
				const row = map[y]

				for (let x = 0; x < row.length; ++x) {
					if (row[x] === '⚫') continue

					if (map[y + 1]?.[x] === '⚫') items.push({ x, y, kind: map[y][x], side: 0 })
					if (map[y][x - 1] === '⚫') items.push({ x, y, kind: map[y][x], side: 1 })
					if (map[y - 1]?.[x] === '⚫') items.push({ x, y, kind: map[y][x], side: 2 })
					if (map[y][x + 1] === '⚫') items.push({ x, y, kind: map[y][x], side: 3 })
				}
			}

			return items
		}

		@$mol_mem
		walls() {
			return this.world_items().map((_, i) => this.Wall(i))
		}

		@ $mol_mem_key
		wall_image(index: number) {
			const kind = this.world_items()[index].kind as keyof ReturnType<this['place_skins']>
			const url = $mol_array_lottery(this.place_skins()[kind])
			return this.Image(url)
		}

		@$mol_mem_key
		wall_trans(index: number) {
			const items = this.world_items()
			const { x, y, side } = items[index]

			return $mol_3d_mat4.multiply(
				$mol_3d_mat4.translation([x + 0.5, -y - 0.5, 0]),
				$mol_3d_mat4.scaling([0.5, 0.5, 0.5]),
				$mol_3d_mat4.rotation([1, 0, 0], Math.PI / 2),
				$mol_3d_mat4.rotation([0, 1, 0], (side * -Math.PI) / 2),
				$mol_3d_mat4.translation([0, 0, 1]),
			)
		}

		@$mol_mem
		floor_trans() {
			const width = this.map_width()
			const height = this.map_height()

			return $mol_3d_mat4.multiply(
				$mol_3d_mat4.translation([width / 2, -height / 2, -0.5]),
				$mol_3d_mat4.scaling([width / 2, height / 2, 1]),
			)
		}

		@$mol_mem
		ceil_trans() {
			const width = this.map_width()
			const height = this.map_height()

			return $mol_3d_mat4.multiply(
				$mol_3d_mat4.translation([width / 2, -height / 2, 0.5]),
				$mol_3d_mat4.scaling([width / 2, -height / 2, 1]),
			)
		}

		@$mol_mem
		square_big_skin() {
			return new Float32Array([0, 20, 20, 20, 0, 0, 20, 0])
		}

		image_uri(url: string) {
			return url
		}

		@$mol_mem
		avatars() {
			return this.actors().map((_, i) => this.Avatar(i))
		}

		@$mol_mem_key
		avatar_trans(index: number) {
			const actor = this.actors()[index]
			const [x, y] = actor.pos()

			return $mol_3d_mat4.multiply(
				$mol_3d_mat4.translation([+x, -y, 0]),
				$mol_3d_mat4.scaling([0.5, 0.5, 0.5]),
				$mol_3d_mat4.rotation([0, 0, 1], -actor.angle()),
				$mol_3d_mat4.rotation([1, 0, 0], -Math.PI / 2),
			)
		}

		@$mol_mem
		auto() {
			for (const actor of this.actors()) {
				actor.auto()
			}
		}
	}
}
