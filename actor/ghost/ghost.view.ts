namespace $.$$ {
	export class $bog_game_actor_ghost extends $.$bog_game_actor_ghost {
		@$mol_mem
		auto() {
			this.$.$mol_state_time.now(1000)

			this.move_forward(Math.random() > 0.5)

			this.turn_left(Math.random() > 0.5)
			this.turn_right(Math.random() > 0.5)

			super.auto()
		}
	}
}
