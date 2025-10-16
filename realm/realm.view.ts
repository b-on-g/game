namespace $.$$ {
	export class $bog_game_realm extends $.$bog_game_realm {
		@$mol_mem
		map_rows() {
			return this.map()
				.split('\n')
				.map(row => [...row].map(p => (p === '💫' ? '⚫' : p)))
		}

		@$mol_mem
		map_width() {
			return this.map_rows().reduce((max, row) => Math.max(max, row.length), 0)
		}

		@$mol_mem
		map_height() {
			return this.map_rows().length
		}

		coord_by_pos([px, py]: readonly number[]) {
			return [Math.floor(px), Math.floor(py)]
		}

		pos_by_coord([cx, cy]: number[]) {
			return [cx + 0.5, cy + 0.5]
		}

		place_by_pos([px, py]: number[]) {
			const [cx, cy] = this.coord_by_pos([px, py])
			return this.map_rows()[cy]?.[cx] ?? '%'
		}

		@$mol_mem
		spawn_places() {
			const places = [] as { x: number; y: number }[]
			const rows = this.map().split('\n')

			for (let y = 0; y < rows.length; ++y) {
				const row = [...rows[y]]

				for (let x = 0; x < row.length; ++x) {
					if (row[x] !== '💫') continue
					places.push({ x, y })
				}
			}

			return places
		}

		// @ $mol_mem
		spawn_pos() {
			const place = $mol_array_lottery(this.spawn_places())
			return this.pos_by_coord([place.x, place.y])
		}
	}
}
