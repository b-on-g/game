namespace $.$$ {
	export class $bog_game_actor extends $.$bog_game_actor {
		@$mol_mem
		move_speed_track() {
			if (this.move_forward()) return this.move_speed_track_max()
			if (this.move_backward()) return -this.move_speed_track_max()
			return 0
		}

		@$mol_mem
		move_speed_side() {
			if (this.move_right()) return this.move_speed_side_max()
			if (this.move_left()) return -this.move_speed_side_max()
			return 0
		}

		@$mol_mem
		turn_speed() {
			if (this.turn_right()) return this.turn_speed_max()
			if (this.turn_left()) return -this.turn_speed_max()
			return 0
		}

		@$mol_mem
		auto() {
			this.$.$mol_state_time.now(0)

			const move_speed_track = this.move_speed_track()
			const move_speed_side = this.move_speed_side()
			const angle = this.angle()
			const [x, y] = this.pos()

			const rx = x + Math.cos(angle) * move_speed_side + Math.sin(angle) * move_speed_track
			const ry = y + Math.sin(angle) * move_speed_side - Math.cos(angle) * move_speed_track

			if (this.place_by_pos([x, y]) !== '⚫') {
				this.pos([rx, ry])
			} else if (this.place_by_pos([rx, ry]) === '⚫') {
				this.pos([rx, ry])
			} else if (this.place_by_pos([x, ry]) === '⚫') {
				this.pos([x, ry])
			} else if (this.place_by_pos([rx, y]) === '⚫') {
				this.pos([rx, y])
			}

			let turn_speed = this.turn_speed()
			if (move_speed_track < 0) turn_speed = -turn_speed
			this.angle(this.angle() + turn_speed)
		}
	}
}
