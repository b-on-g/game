namespace $ {

	$mol_test({

		'arcade draws, atlas loads and guy walks forward on W'() {
			const out = $bog_probe_test( 'bog/game/probe/-/node.js', 'bog_game_probe_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_game_probe_ok ) )
		},

	})

}
