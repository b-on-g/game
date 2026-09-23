namespace $.$$ {
	export class $bog_game_arcade extends $.$bog_game_arcade {

		stat() {
			const [ x, y ] = this.guy_pos()
			return [
				`pos: ${ x.toFixed( 3 ) } x ${ y.toFixed( 3 ) }`,
				`angle: ${ this.guy_angle().toFixed( 3 ) }`,
				`objects: ${ this.nodes().length }`,
				`batches: ${ this.Scene().batches().length }`,
				`layers: ${ this.Atlas().ready() ? this.Atlas().uris().length : 0 }`,
			].join( ' | ' )
		}

		@ $mol_mem
		wall_ids() {
			const rows = this.map_rows()
			const ids = [] as string[]
			for( let y = 0; y < rows.length; ++y ) {
				for( let x = 0; x < rows[ y ].length; ++x ) {
					if( rows[ y ][ x ] !== '⚫' ) ids.push( `${ x }_${ y }` )
				}
			}
			return ids as readonly string[]
		}

		@ $mol_mem
		walls() {
			return this.wall_ids().map( id => this.Wall( id ) )
		}

		@ $mol_mem_key
		wall_frame( id: string ) {
			const [ x, y ] = id.split( '_' ).map( Number )
			const skins = this.place_skins()
			const kind = this.map_rows()[ y ][ x ] as keyof typeof skins
			return $mol_array_lottery( skins[ kind ] )
		}

		@ $mol_mem_key
		wall_pos( id: string ) {
			const [ x, y ] = id.split( '_' ).map( Number )
			return new Float32Array([ x + 0.5, 0.5, y + 0.5 ])
		}

		@ $mol_mem
		floor_pos() {
			return new Float32Array([ this.map_width() / 2, 0, this.map_height() / 2 ])
		}

		@ $mol_mem
		floor_size() {
			return new Float32Array([ this.map_width(), 1, this.map_height() ])
		}

		@ $mol_mem
		ceil_pos() {
			return new Float32Array([ this.map_width() / 2, 1, this.map_height() / 2 ])
		}

		@ $mol_mem
		ceil_rot() {
			return new Float32Array([ Math.PI, 0, 0 ])
		}

		@ $mol_mem
		cam_pos() {
			const [ x, y ] = this.guy_pos()
			return new Float32Array([ x, 0.25, y ])
		}

		@ $mol_mem
		cam_rot() {
			return new Float32Array([ 0, - this.guy_angle(), 0 ])
		}

		@ $mol_mem
		avatars() {
			return this.actors().map( ( _, i ) => this.Avatar( i ) )
		}

		@ $mol_mem_key
		avatar_pos( index: number ) {
			const [ x, y ] = this.actors()[ index ].pos()
			return new Float32Array([ x, 0.5, y ])
		}

		@ $mol_mem
		nodes() {
			return [ ... this.walls(), this.Floor(), this.Ceil(), ... this.avatars() ]
		}

		@ $mol_mem
		auto() {
			for( const actor of this.actors() ) {
				actor.auto()
			}
		}

	}
}
