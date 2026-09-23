namespace $ {

	export const $bog_game_probe_page = 'bog/game/arcade/-/index.html'

	export const $bog_game_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_game_probe_ok = 'аркада нарисована, атлас загружен, игрок идёт вперёд по W'

	export const $bog_game_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_game_probe_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, loaded: false }
		const read = ()=> {
			const found = document.body.innerText.match( /pos: (-?[\\d.]+) x (-?[\\d.]+) \\| angle: (-?[\\d.]+) \\| objects: (\\d+) \\| batches: (\\d+) \\| layers: (\\d+)/ )
			if( !found ) return null
			const nums = found.slice( 1 ).map( Number )
			return nums[ 5 ] > 0 ? nums : null
		}
		let start = null
		for( let i = 0; i < 600 && !start; ++ i ) { await frame(); start = read() }
		if( !start ) return { webgl: true, loaded: false }
		await frame()
		await frame()
		const pixel = new Uint8Array( 4 )
		gl.readPixels( canvas.width / 2 | 0, canvas.height / 2 | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel )
		document.body.dispatchEvent( new KeyboardEvent( 'keydown', { keyCode: 87, bubbles: true } ) )
		for( let i = 0; i < 60; ++ i ) await frame()
		const moved = read()
		document.body.dispatchEvent( new KeyboardEvent( 'keyup', { keyCode: 87, bubbles: true } ) )
		return { webgl: true, loaded: true, start, moved, center: Array.from( pixel ), size: [ canvas.width, canvas.height ] }
	`

	export type $bog_game_probe_result = {
		readonly webgl: boolean
		readonly loaded: boolean
		readonly start?: readonly number[]
		readonly moved?: readonly number[] | null
		readonly center?: readonly [ number, number, number, number ]
		readonly size?: readonly [ number, number ]
	}

	export async function $bog_game_probe_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_game_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_game_probe_page,
			ready: $bog_game_probe_ready,
			script: $bog_game_probe_script,
			width: 1024,
			height: 768,
		}) as $bog_game_probe_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )
		if( !got.loaded || !got.start ) return fail( 'подвал не показал позицию и слои атласа' )
		const [ r, g, b ] = got.center!
		if( r < 40 && g < 40 && b < 40 ) return fail( 'центр чёрный, сцена не нарисована' )
		if( !got.moved ) return fail( 'подвал пропал после нажатия W' )
		if( got.moved[ 0 ] === got.start[ 0 ] && got.moved[ 1 ] === got.start[ 1 ] ) return fail( 'игрок не сдвинулся по W' )

		return say( $bog_game_probe_ok )
	}

}
