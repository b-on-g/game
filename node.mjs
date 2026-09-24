#!/usr/bin/env node
"use strict";
var exports = void 0;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;

;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const mod = require /****/('module');
    const internals = mod.builtinModules;
    function $node_internal_check(name) {
        if (name.startsWith('node:'))
            return true;
        return internals.includes(name);
    }
    $.$node_internal_check = $node_internal_check;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        try {
            return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
        }
        catch {
            return false;
        }
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error; /// Use 'Never Pause Here' breakpoint in DevTools or simply blackbox this script
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const catched = new WeakSet();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.has(error))
            return false;
        catched.add(error);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_try(handler) {
        try {
            return handler();
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    $.$mol_try = $mol_try;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        $mol_try(() => { $mol_fail_hidden(error); });
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const path = require /****/('path');
    const mod = require /****/('module');
    const localRequire = mod.createRequire(path.join(process.cwd(), 'package.json'));
    function $node_autoinstall(name) {
        try {
            localRequire.resolve(name);
        }
        catch {
            this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', name], dir: '.' });
            try {
                this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', '@types/' + name], dir: '.' });
            }
            catch (e) {
                if (this.$mol_promise_like(e))
                    this.$mol_fail_hidden(e);
                this.$mol_fail_log(e);
            }
        }
    }
    $.$node_autoinstall = $node_autoinstall;
})($ || ($ = {}));

;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        if ($.$node_internal_check(name))
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        $.$node_autoinstall(name);
        return target.require(name);
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);

;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function cause_serialize(cause) {
        return JSON.stringify(cause, null, '  ')
            .replace(/\(/, '<')
            .replace(/\)/, ' >');
    }
    function frame_normalize(frame) {
        return (typeof frame === 'string' ? frame : cause_serialize(frame))
            .trim()
            .replace(/at /gm, '   at ')
            .replace(/^(?!    +at )(.*)/gm, '    at | $1 (#)');
    }
    class $mol_error_mix extends AggregateError {
        cause;
        name = $$.$mol_func_name(this.constructor).replace(/^\$/, '') + '_Error';
        constructor(message, cause = {}, ...errors) {
            super(errors, message, { cause });
            this.cause = cause;
            const desc = Object.getOwnPropertyDescriptor(this, 'stack');
            const stack_get = () => desc?.get?.() ?? super.stack ?? desc?.value ?? this.message;
            Object.defineProperty(this, 'stack', {
                get: () => stack_get() + '\n' + [
                    this.cause ?? 'no cause',
                    ...this.errors.flatMap(e => [
                        String(e.stack),
                        ...e instanceof $mol_error_mix || !e.cause ? [] : [e.cause]
                    ])
                ].map(frame_normalize).join('\n')
            });
            // в nodejs, что б не дублировалось cause в консоли
            Object.defineProperty(this, 'cause', {
                get: () => cause
            });
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        static make(...params) {
            return new this(...params);
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    /**
     * Proxy that delegates all to lazy returned target.
     *
     * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
     */
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object' && typeof having !== 'function')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_key_handle = Symbol.for('$mol_key_handle');
    $.$mol_key_store = new WeakMap();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if (!Symbol.dispose)
        Symbol.dispose = Symbol('Symbol.dispose');
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || this.constructor.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
        }
        static toJSON() {
            return this.toString();
        }
        static [$mol_key_handle]() {
            return this.toString();
        }
        destructor() { }
        static destructor() { }
        [Symbol.dispose]() {
            this.destructor();
        }
        //[ Symbol.toPrimitive ]( hint: string ) {
        //	return hint === 'number' ? this.valueOf() : this.toString()
        //}
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Generates unique identifier. */
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Special status statuses. */
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        /** Update required. */
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        /** Some of (transitive) pub update required. */
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        /** Actual state but may be dropped. */
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        /** State will never be changed. */
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Collects subscribers in compact array. 28B
     */
    class $mol_wire_pub extends Object {
        constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
            super();
            this[Symbol.toStringTag] = id;
        }
        [Symbol.toStringTag];
        data = [];
        // Derived objects should be Arrays.
        static get [Symbol.species]() {
            return Array;
        }
        /**
         * Index of first subscriber.
         */
        sub_from = 0; // 4B
        /**
         * All current subscribers.
         */
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        /**
         * Has any subscribers or not.
         */
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        /**
         * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
         */
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        /**
         * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
         */
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.length = end;
            if (end === this.sub_from)
                this.reap();
        }
        /**
         * Called when last sub was unsubscribed.
         **/
        reap() { }
        /**
         * Autowire this publisher with current subscriber.
         **/
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        /**
         * Enforce actualization. Should not throw errors.
         */
        fresh() { }
        /**
         * Allow to put data to caches in the subtree.
         */
        complete() { }
        get incompleted() {
            return false;
        }
        /**
         * Notify subscribers about self changes.
         */
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant, this.data[i + 1]);
            }
        }
        /**
         * Moves peer from one position to another. Doesn't clear data at old position!
         */
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        /**
         * Updates self position in the peer.
         */
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    /**
     * When fulfilled, all publishers are promoted to this subscriber on access to its.
     */
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    /**
     * Affection queue. Used to prevent accidental stack overflow on emit.
     */
    $.$mol_wire_affected = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    // https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview#
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    function $mol_dev_format_button(label, click) {
        return $mol_dev_format_auto({
            [$.$mol_dev_format_head]() {
                return $.$mol_dev_format_span({ color: 'cornflowerblue' }, label);
            },
            [$.$mol_dev_format_body]() {
                Promise.resolve().then(click);
                return $.$mol_dev_format_span({});
            }
        });
    }
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                try {
                    return val[$.$mol_dev_format_head]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            if (val instanceof Error) {
                return $.$mol_dev_format_span({}, $mol_dev_format_native(val), ' ', $mol_dev_format_button('throw', () => $mol_fail_hidden(val)));
            }
            if (val instanceof Promise) {
                return $.$mol_dev_format_shade($mol_dev_format_native(val), ' ', val[Symbol.toStringTag] ?? '');
            }
            if (Symbol.toStringTag in val) {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: (val, config = false) => {
            if (config)
                return false;
            if (!val)
                return false;
            // if( Error.isError( val ) ) true
            if (val[$.$mol_dev_format_body])
                return true;
            return false;
        },
        body: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_body in val) {
                try {
                    return val[$.$mol_dev_format_body]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            // if( Error.isError( val ) ) {
            // 	return $mol_dev_format_native( val )
            // }
            return null;
        },
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        // if( ![ 'object', 'function', 'symbol' ].includes( typeof obj )  ) return obj
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    $.$mol_dev_format_span = $mol_dev_format_element.bind(null, 'span');
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $.$mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $.$mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $.$mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $.$mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-inline-start': '13px'
    });
    class Stack extends Array {
        // [ Symbol.toPrimitive ]() {
        // 	return this.toString()
        // }
        match(...args) {
            return this.toString().match(...args);
        }
        split(...args) {
            return this.toString().split(...args);
        }
        toString() {
            return this.join('\n');
        }
    }
    class Call extends Object {
        type;
        function;
        method;
        eval;
        source;
        offset;
        pos;
        object;
        flags;
        [Symbol.toStringTag];
        constructor(call) {
            super();
            this.type = call.getTypeName() ?? '';
            this.function = call.getFunctionName() ?? '';
            this.method = call.getMethodName() ?? '';
            if (this.method === this.function)
                this.method = '';
            // const func = c.getFunction()
            this.pos = [call.getEnclosingLineNumber() ?? 0, call.getEnclosingColumnNumber() ?? 0];
            this.eval = call.getEvalOrigin() ?? '';
            this.source = call.getScriptNameOrSourceURL() ?? '';
            this.object = call.getThis();
            this.offset = call.getPosition();
            const flags = [];
            if (call.isAsync())
                flags.push('async');
            if (call.isConstructor())
                flags.push('constructor');
            if (call.isEval())
                flags.push('eval');
            if (call.isNative())
                flags.push('native');
            if (call.isPromiseAll())
                flags.push('PromiseAll');
            if (call.isToplevel())
                flags.push('top');
            this.flags = flags;
            const type = this.type ? this.type + '.' : '';
            const func = this.function || '<anon>';
            const method = this.method ? ' [' + this.method + '] ' : '';
            this[Symbol.toStringTag] = `${type}${func}${method}`;
        }
        [Symbol.toPrimitive]() {
            return this.toString();
        }
        toString() {
            const object = this.object || '';
            const label = this[Symbol.toStringTag];
            const source = `${this.source}:${this.pos.join(':')} #${this.offset}`;
            return `\tat ${object}${label} (${source})`;
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_div({}, $mol_dev_format_native(this), $.$mol_dev_format_shade(' '), ...this.object ? [
                $mol_dev_format_native(this.object),
            ] : [], ...this.method ? [$.$mol_dev_format_shade(' ', ' [', this.method, ']')] : [], $.$mol_dev_format_shade(' ', this.flags.join(', ')));
        }
    }
    Error.prepareStackTrace ??= (error, stack) => new Stack(...stack.map(call => new Call(call)));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Publisher that can auto collect other publishers. 32B
     *
     * 	P1 P2 P3 P4 S1 S2 S3
     * 	^           ^
     * 	pubs_from   subs_from
     */
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0; // 4B
        cursor = $mol_wire_cursor.stale; // 4B
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
            }
            this.data.length = this.sub_from;
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.stale;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let end = this.data.length;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                end -= 2;
                if (this.sub_from <= end)
                    this.peer_move(end, cursor);
            }
            this.data.length = end;
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale, pos = -1) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
            // if( pos >= 0 && pos < this.sub_from - 2 ) {
            // 	const pub = this.data[ pos ] as $mol_wire_pub
            // 	if( pub instanceof $mol_wire_task ) return
            // 	for(
            // 		let cursor = this.pub_from;
            // 		cursor < this.sub_from;
            // 		cursor += 2
            // 	) {
            // 		const pub = this.data[ cursor ] as $mol_wire_pub
            // 		if( pub instanceof $mol_wire_task ) {
            // 			pub.destructor()
            // 		}
            // 	}
            // }
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        /**
         * Is subscribed to any publisher or not.
         */
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        static promise = null;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            if (!$mol_after_tick.promise)
                $mol_after_tick.promise = Promise.resolve().then(() => {
                    $mol_after_tick.promise = null;
                });
            $mol_after_tick.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const wrappers = new WeakMap();
    /**
     * Suspendable task with support both sync/async api.
     *
     * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
     * 	^           ^           ^
     * 	args_from   pubs_from   subs_from
     **/
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_tick(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            // Sync whole fiber graph
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            // Collect garbage
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super(id);
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
            return this;
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_owning_check(this, this.cache)
                ? $mol_dev_format_shade(cursor)
                : $mol_dev_format_shade(this[Symbol.toStringTag], cursor), $mol_dev_format_auto(this.cache));
        }
        [$mol_dev_format_body]() { return null; }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result).then(a => a);
                    }
                    else {
                        const put = (res) => {
                            if (this.cache === result)
                                this.put(res);
                            return res;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        wrappers.set(result, result);
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result);
                    }
                    else {
                        const put = (v) => {
                            if (this.cache === result)
                                this.absorb();
                            return v;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
            return this;
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        /**
         * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
         * Should be called inside SuspenseAPI consumer (ie fiber).
         */
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        /**
         * Asynchronous execution.
         * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
         */
        async async_raw() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    // never ends on destructed fiber
                    await new Promise(() => { });
                }
            }
        }
        async() {
            const promise = this.async_raw();
            if (!promise.destructor)
                promise.destructor = () => this.destructor();
            return promise;
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    setTimeout(() => sub.destructor());
                };
            });
        }
        destructor() {
            super.destructor();
            $mol_wire_fiber.planning.delete(this);
            if (!$mol_owning_check(this, this.cache))
                return;
            try {
                this.cache.destructor();
            }
            catch (result) {
                if ($mol_promise_like(result)) {
                    const error = new Error(`Promise in ${this}.destructor()`);
                    Object.defineProperty(result, 'stack', { get: () => error.stack });
                }
                $mol_fail_hidden(result);
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && $mol_compare_deep(left.stack, right.stack);
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap();
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        left_cache.set(right, true);
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        if (left instanceof DataView)
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Log begin of collapsed group only when some logged inside, returns func to close group */
    function $mol_log3_area_lazy(event) {
        const self = this.$;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Position in any resource. */
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = this.uri + ('#' + this.row + ':' + this.col + '/' + this.length);
        }
        /** Span for begin of unknown resource */
        static unknown = $mol_span.begin('?');
        /** Makes new span for begin of resource. */
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        /** Makes new span for end of resource. */
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, 0);
        }
        /** Makes new span for entire resource. */
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        /** Makes new error for this span. */
        error(message, Class = Error) {
            return new Class(`${message} (${this})`);
        }
        /** Makes new span for same uri. */
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        /** Makes new span after end of this. */
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        /** Makes new span between begin and end. */
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(this.error(`Begin value '${begin}' out of range`, RangeError));
            if (end < 0 || end > len)
                this.$.$mol_fail(this.error(`End value '${end}' out of range`, RangeError));
            if (end < begin)
                this.$.$mol_fail(this.error(`End value '${end}' can't be less than begin value`, RangeError));
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Serializes tree to string in tree format. */
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Abstract Syntax Tree with human readable serialization.
     * Avoid direct instantiation. Use static factories instead.
     * @see https://github.com/nin-jin/tree.d
     */
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(
        /** Type of structural node, `value` should be empty */
        type, 
        /** Content of data node, `type` should be empty */
        value, 
        /** Child nodes */
        kids, 
        /** Position in most far source resource */
        span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        /** Makes collection node. */
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        /** Makes new derived collection node. */
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        /** Makes data node for any string. */
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        /** Makes new derived data node. */
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        /** Makes struct node. */
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        /** Makes new derived structural node. */
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        /** Makes new derived node with different kids id defined. */
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        /** Returns multiline text content. */
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        /** Parses tree format. */
        /** @deprecated Use $mol_tree2_from_string */
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        /** Serializes to tree format. */
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        /** Makes new tree with node overrided by path. */
        insert(value, ...path) {
            return this.update($mol_maybe(value), ...path)[0];
        }
        /** Makes new tree with node overrided by path. */
        update(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.flatMap((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.update(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(...this.struct(type, []).update(value, ...path.slice(1)));
                }
                return [this.clone(sub)];
            }
            else if (typeof type === 'number') {
                const ins = (this.kids[type] || this.list([]))
                    .update(value, ...path.slice(1));
                return [this.clone([
                        ...this.kids.slice(0, type),
                        ...ins,
                        ...this.kids.slice(type + 1),
                    ])];
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .flatMap(item => item.update(value, ...path.slice(1)));
                return [this.clone(kids)];
            }
        }
        /** Query nodes by path. */
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        /** Filter kids by path or value. */
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack_self(belt, context = {}) {
            let handle = belt[this.type] || belt[''];
            if (!handle || handle === Object.prototype[this.type]) {
                handle = (input, belt, context) => [
                    input.clone(input.hack(belt, context), context.span)
                ];
            }
            try {
                return handle(this, belt, context);
            }
            catch (error) {
                error.message += `\n${this.clone([])}${this.span}`;
                $mol_fail_hidden(error);
            }
        }
        /** Transform tree through context with transformers */
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => child.hack_self(belt, context)));
        }
        /** Makes Error with node coordinates. */
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Syntax error with cordinates and source line snippet. */
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Parses tree format from string. */
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            // read indent
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            // invalid tab size
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                // skip error line
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            // parse types
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                // type can not contain space and tab
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                // read type
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                // read one space if exists
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            // read data
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            // now must be end of text
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_array_chunks(array, rule) {
        const br = typeof rule === 'number' ? (_, i) => i % rule === 0 : rule;
        let chunk = [];
        const chunks = [];
        for (let i = 0; i < array.length; ++i) {
            const item = array[i];
            if (br(item, i)) {
                if (chunk.length)
                    chunks.push(chunk);
                chunk = [];
            }
            chunk.push(item);
        }
        if (chunk.length)
            chunks.push(chunk);
        return chunks;
    }
    $.$mol_array_chunks = $mol_array_chunks;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === 'boolean' || typeof json === 'number' || json === null) {
            return new $mol_tree2(String(json), '', [], span);
        }
        if (typeof json === 'string') {
            return $mol_tree2.data(json, [], span);
        }
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
        }
        if (Array.isArray(json)) {
            const sub = json.map(json => $mol_tree2_from_json(json, span));
            return new $mol_tree2('/', '', sub, span);
        }
        if (ArrayBuffer.isView(json)) {
            const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
            const codes = [...buf].map(b => b.toString(16).toUpperCase().padStart(2, '0'));
            const str = $mol_array_chunks(codes, 8).map(c => c.join(' ')).join('\n');
            return $mol_tree2.data(str, [], span);
        }
        if (json instanceof Date) {
            return new $mol_tree2('', json.toISOString(), [], span);
        }
        if (json.toString !== Object.prototype.toString) {
            return $mol_tree2.data(json.toString(), [], span);
        }
        if (json instanceof Error) {
            const { name, message, stack } = json;
            json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
            const val = json[key];
            if (val === undefined)
                continue;
            const subsub = $mol_tree2_from_json(val, span);
            if (/^[^\n\t\\ ]+$/.test(key)) {
                sub.push(new $mol_tree2(key, '', [subsub], span));
            }
            else {
                sub.push($mol_tree2.data(key, [subsub], span));
            }
        }
        return new $mol_tree2('*', '', sub, span);
    }
    $.$mol_tree2_from_json = $mol_tree2_from_json;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Module for working with terminal. Text coloring when output in terminal */
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { ...event, time: new Date().toISOString() };
            let tree = this.$mol_tree2_from_json(event);
            tree = tree.struct(type, tree.kids);
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** One-shot fiber */
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                let cause = '';
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.host !== host) {
                        cause = 'host';
                        break reuse;
                    }
                    if (existen.task !== task) {
                        cause = 'task';
                        break reuse;
                    }
                    if (!$mol_compare_deep(existen.args, args)) {
                        cause = 'args';
                        break reuse;
                    }
                    return existen;
                }
                const key = (host?.[Symbol.toStringTag] ?? host) + ('.' + task.name + '<#>');
                const next = new $mol_wire_task(key, task, host, args);
                // Disabled because non-idempotency is required for try-catch
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Different ${cause} on restart`,
                        sub,
                        prev: existen,
                        next,
                        hint: 'Maybe required additional memoization',
                    });
                }
                return next;
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
        destructor() {
            super.destructor();
            this.cursor = $mol_wire_cursor.final;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const factories = new WeakMap();
    function factory(val) {
        let make = factories.get(val);
        if (make)
            return make;
        make = $mol_func_name_from((...args) => new val(...args), val);
        factories.set(val, make);
        return make;
    }
    const getters = new WeakMap();
    function get_prop(host, field) {
        let props = getters.get(host);
        let get_val = props?.[field];
        if (get_val)
            return get_val;
        get_val = (next) => {
            if (next !== undefined)
                host[field] = next;
            return host[field];
        };
        Object.defineProperty(get_val, 'name', { value: field });
        if (!props) {
            props = {};
            getters.set(host, props);
        }
        props[field] = get_val;
        return get_val;
    }
    /**
     * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                let val = obj[field];
                const temp = $mol_wire_task.getter(typeof val === 'function' ? val : get_prop(obj, field));
                if (typeof val !== 'function')
                    return temp(obj, []).sync();
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            set(obj, field, next) {
                const temp = $mol_wire_task.getter(get_prop(obj, field));
                temp(obj, [next]).sync();
                return true;
            },
            construct(obj, args) {
                const temp = $mol_wire_task.getter(factory(obj));
                return temp(obj, args).sync();
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                return temp(self, args).sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_run_error extends $mol_error_mix {
    }
    $.$mol_run_error = $mol_run_error;
    $.$mol_run_spawn = (...args) => $node['child_process'].spawn(...args);
    $.$mol_run_spawn_sync = (...args) => $node['child_process'].spawnSync(...args);
    class $mol_run extends $mol_object {
        static async_enabled() {
            return Boolean(this.$.$mol_env()['MOL_RUN_ASYNC']);
        }
        static spawn(options) {
            const sync = !this.async_enabled() || !Boolean($mol_wire_auto());
            const env = options.env ?? this.$.$mol_env();
            return $mol_wire_sync(this).spawn_async({ ...options, sync, env });
        }
        static spawn_async({ dir, sync, timeout, command, env }) {
            const args_raw = typeof command === 'string' ? command.split(' ') : command;
            const [app, ...args] = args_raw;
            const opts = { shell: true, cwd: dir, env };
            const log_object = {
                place: `${this}.spawn()`,
                message: 'Run',
                command: args_raw.join(' '),
                dir: $node.path.relative('', dir),
            };
            if (sync) {
                this.$.$mol_log3_come({
                    hint: 'Run inside fiber',
                    ...log_object
                });
                let error;
                let res;
                try {
                    res = this.$.$mol_run_spawn_sync(app, args, opts);
                    error = res.error;
                }
                catch (err) {
                    error = err;
                }
                if (!res || error || res.status) {
                    throw new $mol_run_error(this.error_message(res), { ...log_object, status: res?.status, signal: res?.signal }, ...(error ? [error] : []));
                }
                return res;
            }
            let sub;
            try {
                sub = this.$.$mol_run_spawn(app, args, {
                    ...opts,
                    stdio: ['pipe', 'inherit', 'inherit'],
                });
            }
            catch (error) {
                throw new $mol_run_error(this.error_message(undefined), log_object, error);
            }
            const pid = sub.pid ?? 0;
            this.$.$mol_log3_come({
                ...log_object,
                pid,
            });
            let timeout_kill = false;
            let timer;
            const std_data = [];
            const error_data = [];
            const add = (std_chunk, error_chunk) => {
                if (std_chunk)
                    std_data.push(std_chunk);
                if (error_chunk)
                    error_data.push(error_chunk);
                if (!timeout)
                    return;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const signal = timeout_kill ? 'SIGKILL' : 'SIGTERM';
                    timeout_kill = true;
                    add();
                    sub.kill(signal);
                }, timeout);
            };
            add();
            sub.stdout?.on('data', data => add(data));
            sub.stderr?.on('data', data => add(undefined, data));
            const result_promise = new Promise((done, fail) => {
                const close = (error, status = null, signal = null) => {
                    if (!timer && timeout)
                        return;
                    clearTimeout(timer);
                    timer = undefined;
                    const res = {
                        pid,
                        signal,
                        get stdout() { return Buffer.concat(std_data); },
                        get stderr() { return Buffer.concat(error_data); }
                    };
                    if (error || status || timeout_kill)
                        return fail(new $mol_run_error(this.error_message(res) + (timeout_kill ? ', timeout' : ''), { ...log_object, pid, status, signal, timeout_kill }, ...error ? [error] : []));
                    this.$.$mol_log3_done({
                        ...log_object,
                        pid,
                    });
                    done(res);
                };
                sub.on('disconnect', () => close(new Error('Disconnected')));
                sub.on('error', err => close(err));
                sub.on('exit', (status, signal) => close(null, status, signal));
            });
            return Object.assign(result_promise, { destructor: () => {
                    clearTimeout(timer);
                    sub.kill('SIGKILL');
                } });
        }
        static error_message(res) {
            return res?.stderr.toString() || res?.stdout.toString() || 'Run error';
        }
    }
    $.$mol_run = $mol_run;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: `http://${process.env.DOMAIN || 'localhost'}/` }).window;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_style_attach(id, text) {
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        const elid = `$mol_style_attach:${id}`;
        let el = doc.getElementById(elid);
        if (!el) {
            el = doc.createElement('style');
            el.id = elid;
            doc.head.appendChild(el);
        }
        if (el.innerHTML != text)
            el.innerHTML = text;
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise extends Promise {
        done;
        fail;
        constructor(executor) {
            let done;
            let fail;
            super((d, f) => {
                done = d;
                fail = f;
                executor?.(d, f);
            });
            this.done = done;
            this.fail = fail;
        }
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise_blocker extends $mol_promise {
        static [Symbol.toStringTag] = '$mol_promise_blocker';
    }
    $.$mol_promise_blocker = $mol_promise_blocker;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS Units
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    /**
     * CSS Functions
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static linear_gradient(value) {
            return new $mol_style_func('linear-gradient', value);
        }
        static radial_gradient(value) {
            return new $mol_style_func('radial-gradient', value);
        }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Create record of CSS variables. */
    function $mol_style_prop(prefix, keys) {
        const record = keys.reduce((rec, key) => {
            rec[key] = $mol_style_func.vary(`--${prefix}_${key}`);
            return rec;
        }, {});
        return record;
    }
    $.$mol_style_prop = $mol_style_prop;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    $.$mol_theme = $mol_style_prop('mol_theme', [
        'back',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
        'spirit',
        'hue',
        'hue_spread',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 240deg;\n\t--mol_theme_hue_spread: 90deg;\n\tcolor-scheme: dark light;\n}\n\nbody, :where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\t--mol_theme_spirit: hsl( 0deg, 0%, 0%, .75 );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\t\n\t--mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 30% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 15% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 60% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 70% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 70% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl( 0deg, 0%, 100%, .75 );\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 92% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .75 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t--mol_theme_back: oklch( 92% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 99% .01 var(--mol_theme_hue) / .5 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 50% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 60% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 40% .15 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 50% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 50% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 25% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 85% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 98% .03 var(--mol_theme_hue) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 35% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 45% .15 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 83% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n\n");
})($ || ($ = {}));

;
"use strict";
// namespace $ {
// 	$mol_style_attach( '$mol_theme_lights', `:root { --mol_theme_back: oklch( ${ $$.$mol_lights() ? 92 : 20 }% .01 var(--mol_theme_hue) ) }` )
// }

;
"use strict";
var $;
(function ($) {
    /**
     * Gap in CSS
     * @see https://page.hyoo.ru/#!=msdb74_bm7nsq
     */
    $.$mol_gap = $mol_style_prop('mol_gap', [
        'page',
        'block',
        'text',
        'emoji',
        'round',
        'space',
        'blur',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_page: 3rem;\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_emoji: .5rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    /**
     * JSX adapter that makes DOM tree.
     * Generates global unique ids for every DOM-element by components tree with ids.
     * Ensures all local ids are unique.
     * Can reuse an existing nodes by GUIDs when used inside [`mol_jsx_attach`](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach).
     */
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            return {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    /** Returns string key for any value. */
    function $mol_key(value) {
        primitives: {
            if (typeof value === 'bigint')
                return value.toString() + 'n';
            if (typeof value === 'symbol')
                return `Symbol(${value.description})`;
            if (!value)
                return JSON.stringify(value); // 0, null, ""
            if (typeof value !== 'object' && typeof value !== 'function')
                return JSON.stringify(value); // boolean, number, string
        }
        caching: {
            let key = $mol_key_store.get(value);
            if (key)
                return key;
        }
        objects: {
            if (value instanceof TypedArray) {
                return `${value[Symbol.toStringTag]}([${[...value].map(v => $mol_key(v))}])`;
            }
            if (Array.isArray(value))
                return `[${value.map(v => $mol_key(v))}]`;
            if (value instanceof RegExp)
                return value.toString();
            if (value instanceof Date)
                return `Date(${value.valueOf()})`;
        }
        structures: {
            const proto = Reflect.getPrototypeOf(value);
            if (!proto || !Reflect.getPrototypeOf(proto)) {
                return `{${Object.entries(value).map(([k, v]) => JSON.stringify(k) + ':' + $mol_key(v))}}`;
            }
        }
        handlers: {
            if ($mol_key_handle in value) {
                return value[$mol_key_handle]();
            }
        }
        containers: {
            const key = JSON.stringify('#' + $mol_guid());
            $mol_key_store.set(value, key);
            return key;
        }
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber.
     */
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Long-living fiber. */
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = prefix + ('.' + task.name + '<>');
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key_str = $mol_key(key);
            if (dict) {
                const existen = dict.get(key_str);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const id = prefix + ('.' + task.name) + ('<' + key_str.replace(/^"|"$/g, "'") + '>');
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(key_str, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        /**
         * Update atom value through another temp fiber.
         */
        resync(args) {
            // enforce pulling tasks abort
            for (let cursor = this.pub_from; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                if (pub && pub instanceof $mol_wire_task) {
                    pub.destructor();
                }
            }
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                const key = $mol_key(this.args[0]);
                const map = (this.host ?? this.task)[this.field()];
                if (!map.has(key))
                    this.$.$mol_log3_warn({
                        place: this,
                        message: 'Absent key on destruction',
                        hint: 'Check for $mol_key(key) is not changed',
                    });
                map.delete(key);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive memoizing multiplexed property decorator. */
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Reactive memoizing solo property decorator from [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem
     * name(next?: string) {
     * 	return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem = $mol_wire_solo;
    /**
     * Reactive memoizing multiplexed property decorator [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem_key
     * name(id: number, next?: string) {
     *  return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element?.shadowRoot) {
                element = element.shadowRoot.activeElement;
            }
            while (element) {
                parents.push(element);
                const parent = element.parentNode;
                if (parent instanceof ShadowRoot)
                    element = parent.host;
                else
                    element = parent;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (next) {
                if (next === undefined && store.has(this ?? fun))
                    return store.get(this ?? fun);
                const val = task.call(this, next) ?? next;
                store.set(this ?? fun, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Run code without state changes */
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Real-time refresh current atom.
     * Don't use if possible. May reduce performance.
     */
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Returns closure that returns constant value.
     * @example
     * const rnd = $mol_const( Math.random() )
     */
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, '()=> ', $mol_dev_format_auto(value));
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Disable reaping of current subscriber
     */
    function $mol_wire_solid() {
        let current = $mol_wire_auto();
        if (current.temp)
            current = current.host;
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === undefined) {
                continue;
            }
            else if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_message(error) {
        return String((error instanceof Error ? error.message : null) || error) || 'Unknown';
    }
    $.$mol_error_message = $mol_error_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            if (val === el[key])
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Convert a pseudo-synchronous (Suspense API) API to an explicit asynchronous one (for integrating with external systems). */
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "@view-transition {\n\tnavigation: auto;\n}\n\n[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform, scale, translate, rotate;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n\t/* text-wrap-style: pretty; dont work in textarea */\n\tunicode-bidi: plaintext\n}\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: system-ui, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\t/* background: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text); */\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n\t/*overscroll-behavior: contain; /** Disable navigation gestures **/\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"], [mol_view_error=\"$mol_promise_blocker\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"$mol_promise_blocker\"]),\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps(20,end) infinite;\n}\n");
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    /**
     * The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions.
     * @see https://mol.hyoo.ru/#!section=docs/=vv2nig_s5zr0f
     */
    /// Reactive statefull lazy ViewModel
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        static roots() {
            return [...$mol_dom.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])')].map((node, index) => {
                const name = node.getAttribute('mol_view_root');
                const View = this.$[name];
                if (!View) {
                    $mol_fail_log(new Error(`Autobind unknown view class`, { cause: { name } }));
                    return null;
                }
                const view = View.Root(index);
                view.dom_node(node);
                return view;
            }).filter($mol_guard_defined);
        }
        static auto() {
            const roots = this.roots();
            if (!roots.length)
                return;
            for (const root of roots) {
                try {
                    root.dom_tree();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
            }
            try {
                document.title = roots[0].title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            descr: try {
                const descr = roots[0].hint();
                if (!descr)
                    break descr;
                const head = $mol_dom.document.head;
                let node = head.querySelector('meta[name="description"]');
                if (node)
                    node.content = descr;
                else
                    head.append($mol_jsx("meta", { name: "description", content: descr }));
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        title() {
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        hint() {
            return '';
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        /// Name of element that created when element not found in DOM
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        /// NameSpace of element that created when element not found in DOM
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        /// Raw child views
        sub() {
            return [];
        }
        /// Visible sub views with defined ambient context
        /// Render all by default
        sub_visible() {
            return this.sub();
        }
        /// Minimal width that used for lazy rendering
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        /// Minimal height that used for lazy rendering
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null; // don't touch DOM to prevent instant reflow
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom }; // pick to optimize compare
            }
        }
        dom_id() {
            return this.toString().replace(/</g, '(').replace(/>/g, ')').replaceAll(/"/g, "'");
        }
        dom_node_external(next) {
            const node = next ?? $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            return node;
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = this.dom_node_external(next);
            $mol_dom_render_attributes(node, this.attr_static());
            const events = this.event_async();
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                const mol_view_error = $mol_promise_like(error)
                    ? error.constructor[Symbol.toStringTag] ?? 'Promise'
                    : error.name || error.constructor.name;
                $mol_dom_render_attributes(node, { mol_view_error });
                if ($mol_promise_like(error))
                    break render;
                try {
                    ;
                    node.innerText = this.$.$mol_error_message(error).replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            const attr = this.attr();
            const style = this.style();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return [];
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        theme(next) {
            return next;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                mol_theme: this.theme(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return { ...$mol_wire_async(this.event()) };
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        /** Deep search view by predicate. */
        *view_find(check, path = []) {
            if (path.length === 0 && check(this))
                return yield [this];
            try {
                const checked = new Set();
                const sub = this.sub();
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (!check(item))
                        continue;
                    checked.add(item);
                    yield [...path, this, item];
                }
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (checked.has(item))
                        continue;
                    yield* item.view_find(check, [...path, this]);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        /** Renders path of views to DOM. */
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        /** Renders view to DOM and scroll to it. */
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            finally {
                view.dom_node().scrollIntoView({ block: align });
            }
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            // new this.$.$mol_after_frame( ()=> {
            // 	this.dom_node().scrollIntoView({ block: 'start', inline: 'nearest' })
            // } )
            new this.$.$mol_after_timeout(0, () => {
                this.focused(true);
            });
        }
        destructor() {
            const node = $mol_wire_probe(() => this.dom_node());
            if (!node)
                return;
            const events = $mol_wire_probe(() => this.event_async());
            if (!events)
                return;
            for (let event_name in events) {
                node.removeEventListener(event_name, events[event_name]);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_id", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "event_async", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "roots", null);
    __decorate([
        $mol_mem
    ], $mol_view, "auto", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Plugin is component without its own DOM element, but instead uses the owner DOM element */
    class $mol_plugin extends $mol_view {
        dom_node_external(next) {
            return next ?? $mol_owning_get(this).host.dom_node();
        }
        render() {
            this.dom_node_actual();
        }
    }
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));

;
	($.$mol_stack) = class $mol_stack extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/stack/stack.view.css", "[mol_stack] {\n\tdisplay: grid;\n\t/* width: max-content; */\n\t/* height: max-content; */\n\talign-items: flex-start;\n\tjustify-items: flex-start;\n}\n\n[mol_stack] > * {\n\tgrid-area: 1/1;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$bog_game_realm) = class $bog_game_realm extends ($.$mol_object2) {
		map(){
			return " ";
		}
		map_rows(){
			return [];
		}
		map_width(){
			return 0;
		}
		map_height(){
			return 0;
		}
		place_by_pos(id){
			return "";
		}
		spawn_pos(){
			return [0, 0];
		}
	};


;
"use strict";
var $;
(function ($) {
    function $mol_array_lottery(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    $.$mol_array_lottery = $mol_array_lottery;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_game_realm extends $.$bog_game_realm {
            map_rows() {
                return this.map()
                    .split('\n')
                    .map(row => [...row].map(p => (p === '💫' ? '⚫' : p)));
            }
            map_width() {
                return this.map_rows().reduce((max, row) => Math.max(max, row.length), 0);
            }
            map_height() {
                return this.map_rows().length;
            }
            coord_by_pos([px, py]) {
                return [Math.floor(px), Math.floor(py)];
            }
            pos_by_coord([cx, cy]) {
                return [cx + 0.5, cy + 0.5];
            }
            place_by_pos([px, py]) {
                const [cx, cy] = this.coord_by_pos([px, py]);
                return this.map_rows()[cy]?.[cx] ?? '%';
            }
            spawn_places() {
                const places = [];
                const rows = this.map().split('\n');
                for (let y = 0; y < rows.length; ++y) {
                    const row = [...rows[y]];
                    for (let x = 0; x < row.length; ++x) {
                        if (row[x] !== '💫')
                            continue;
                        places.push({ x, y });
                    }
                }
                return places;
            }
            spawn_pos() {
                const place = $mol_array_lottery(this.spawn_places());
                return this.pos_by_coord([place.x, place.y]);
            }
        }
        __decorate([
            $mol_mem
        ], $bog_game_realm.prototype, "map_rows", null);
        __decorate([
            $mol_mem
        ], $bog_game_realm.prototype, "map_width", null);
        __decorate([
            $mol_mem
        ], $bog_game_realm.prototype, "map_height", null);
        __decorate([
            $mol_mem
        ], $bog_game_realm.prototype, "spawn_places", null);
        $$.$bog_game_realm = $bog_game_realm;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_game_actor) = class $bog_game_actor extends ($.$mol_object2) {
		place_by_pos(id){
			return (this.Realm().place_by_pos(id));
		}
		auto(){
			return null;
		}
		Realm(){
			const obj = new this.$.$bog_game_realm();
			return obj;
		}
		pos(next){
			if(next !== undefined) return next;
			return [...(this.pos_spawn())];
		}
		pos_spawn(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		angle(next){
			if(next !== undefined) return next;
			return 0;
		}
		move_speed_track(next){
			if(next !== undefined) return next;
			return 0;
		}
		move_speed_side(next){
			if(next !== undefined) return next;
			return 0;
		}
		move_speed_track_max(next){
			if(next !== undefined) return next;
			return 0.03;
		}
		move_speed_side_max(next){
			if(next !== undefined) return next;
			return 0.1;
		}
		turn_speed(next){
			if(next !== undefined) return next;
			return 0;
		}
		turn_speed_max(next){
			if(next !== undefined) return next;
			return 0.04;
		}
		turn_left(next){
			if(next !== undefined) return next;
			return false;
		}
		turn_right(next){
			if(next !== undefined) return next;
			return false;
		}
		move_forward(next){
			if(next !== undefined) return next;
			return false;
		}
		move_backward(next){
			if(next !== undefined) return next;
			return false;
		}
		move_right(next){
			if(next !== undefined) return next;
			return false;
		}
		move_left(next){
			if(next !== undefined) return next;
			return false;
		}
	};
	($mol_mem(($.$bog_game_actor.prototype), "Realm"));
	($mol_mem(($.$bog_game_actor.prototype), "pos"));
	($mol_mem(($.$bog_game_actor.prototype), "pos_spawn"));
	($mol_mem(($.$bog_game_actor.prototype), "angle"));
	($mol_mem(($.$bog_game_actor.prototype), "move_speed_track"));
	($mol_mem(($.$bog_game_actor.prototype), "move_speed_side"));
	($mol_mem(($.$bog_game_actor.prototype), "move_speed_track_max"));
	($mol_mem(($.$bog_game_actor.prototype), "move_speed_side_max"));
	($mol_mem(($.$bog_game_actor.prototype), "turn_speed"));
	($mol_mem(($.$bog_game_actor.prototype), "turn_speed_max"));
	($mol_mem(($.$bog_game_actor.prototype), "turn_left"));
	($mol_mem(($.$bog_game_actor.prototype), "turn_right"));
	($mol_mem(($.$bog_game_actor.prototype), "move_forward"));
	($mol_mem(($.$bog_game_actor.prototype), "move_backward"));
	($mol_mem(($.$bog_game_actor.prototype), "move_right"));
	($mol_mem(($.$bog_game_actor.prototype), "move_left"));


;
"use strict";
var $;
(function ($) {
    /** State of time moment */
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));

;
"use strict";

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_game_actor extends $.$bog_game_actor {
            move_speed_track() {
                if (this.move_forward())
                    return this.move_speed_track_max();
                if (this.move_backward())
                    return -this.move_speed_track_max();
                return 0;
            }
            move_speed_side() {
                if (this.move_right())
                    return this.move_speed_side_max();
                if (this.move_left())
                    return -this.move_speed_side_max();
                return 0;
            }
            turn_speed() {
                if (this.turn_right())
                    return this.turn_speed_max();
                if (this.turn_left())
                    return -this.turn_speed_max();
                return 0;
            }
            auto() {
                this.$.$mol_state_time.now(0);
                const move_speed_track = this.move_speed_track();
                const move_speed_side = this.move_speed_side();
                const angle = this.angle();
                const [x, y] = this.pos();
                const rx = x + Math.cos(angle) * move_speed_side + Math.sin(angle) * move_speed_track;
                const ry = y + Math.sin(angle) * move_speed_side - Math.cos(angle) * move_speed_track;
                if (this.place_by_pos([x, y]) !== '⚫') {
                    this.pos([rx, ry]);
                }
                else if (this.place_by_pos([rx, ry]) === '⚫') {
                    this.pos([rx, ry]);
                }
                else if (this.place_by_pos([x, ry]) === '⚫') {
                    this.pos([x, ry]);
                }
                else if (this.place_by_pos([rx, y]) === '⚫') {
                    this.pos([rx, y]);
                }
                let turn_speed = this.turn_speed();
                if (move_speed_track < 0)
                    turn_speed = -turn_speed;
                this.angle(this.angle() + turn_speed);
            }
        }
        __decorate([
            $mol_mem
        ], $bog_game_actor.prototype, "move_speed_track", null);
        __decorate([
            $mol_mem
        ], $bog_game_actor.prototype, "move_speed_side", null);
        __decorate([
            $mol_mem
        ], $bog_game_actor.prototype, "turn_speed", null);
        __decorate([
            $mol_mem
        ], $bog_game_actor.prototype, "auto", null);
        $$.$bog_game_actor = $bog_game_actor;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_game_actor_ghost) = class $bog_game_actor_ghost extends ($.$bog_game_actor) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_game_actor_ghost extends $.$bog_game_actor_ghost {
            auto() {
                this.$.$mol_state_time.now(1000);
                this.move_forward(Math.random() > 0.5);
                this.turn_left(Math.random() > 0.5);
                this.turn_right(Math.random() > 0.5);
                super.auto();
            }
        }
        __decorate([
            $mol_mem
        ], $bog_game_actor_ghost.prototype, "auto", null);
        $$.$bog_game_actor_ghost = $bog_game_actor_ghost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const prefix = `#version 300 es
				precision highp float;
				precision highp sampler2D;
				precision highp sampler2DArray;
				precision highp sampler2DShadow;
			`;
    function $bog_gamengine_gl_decl(kind, type, name) {
        const open = type.indexOf('[');
        if (open < 0)
            return `${kind} ${type} ${name};\n`;
        return `${kind} ${type.slice(0, open)} ${name}${type.slice(open)};\n`;
    }
    $.$bog_gamengine_gl_decl = $bog_gamengine_gl_decl;
    function $bog_gamengine_gl_slots(type) {
        switch (type) {
            case 'mat4': return 4;
            case 'mat3': return 3;
            case 'mat2': return 2;
            default: return 1;
        }
    }
    $.$bog_gamengine_gl_slots = $bog_gamengine_gl_slots;
    function $bog_gamengine_gl_source(face, vert, frag) {
        let revert = prefix;
        let refrag = prefix;
        for (const name in face.glob ?? {}) {
            const decl = $bog_gamengine_gl_decl('uniform', face.glob[name], name);
            revert += decl;
            refrag += decl;
        }
        let location = 0;
        for (const name in face.input ?? {}) {
            const type = face.input[name];
            revert += `layout( location = ${location} ) in ${type} ${name};\n`;
            location += $bog_gamengine_gl_slots(type);
        }
        for (const name in face.pipe ?? {}) {
            revert += `out ${face.pipe[name]} ${name};\n`;
            refrag += `in ${face.pipe[name]} ${name};\n`;
        }
        for (const name in face.output ?? {}) {
            refrag += `out ${face.output[name]} ${name};\n`;
        }
        return { vert: revert + vert, frag: refrag + frag };
    }
    $.$bog_gamengine_gl_source = $bog_gamengine_gl_source;
    function $bog_gamengine_gl_shader(gl, type, code) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, code);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
            return shader;
        const log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(String(log));
    }
    $.$bog_gamengine_gl_shader = $bog_gamengine_gl_shader;
    class $bog_gamengine_gl_program extends Object {
        gl;
        native;
        uniforms = new Map();
        constructor(gl, face, vert, frag) {
            super();
            this.gl = gl;
            const source = $bog_gamengine_gl_source(face, vert, frag);
            const program = gl.createProgram();
            gl.attachShader(program, $bog_gamengine_gl_shader(gl, gl.VERTEX_SHADER, source.vert));
            gl.attachShader(program, $bog_gamengine_gl_shader(gl, gl.FRAGMENT_SHADER, source.frag));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                const log = gl.getProgramInfoLog(program);
                gl.deleteProgram(program);
                throw new Error(String(log));
            }
            this.native = program;
        }
        uniform(name) {
            let location = this.uniforms.get(name);
            if (location === undefined) {
                location = this.gl.getUniformLocation(this.native, name);
                this.uniforms.set(name, location);
            }
            return location;
        }
        attribute(name) {
            const location = this.gl.getAttribLocation(this.native, name);
            return location === -1 ? null : location;
        }
    }
    $.$bog_gamengine_gl_program = $bog_gamengine_gl_program;
    class $bog_gamengine_gl_buffer extends Object {
        gl;
        native;
        constructor(gl, location, size, divisor) {
            super();
            this.gl = gl;
            this.native = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.native);
            if (size === 16) {
                for (let row = 0; row < 4; ++row) {
                    gl.enableVertexAttribArray(location + row);
                    gl.vertexAttribPointer(location + row, 4, gl.FLOAT, false, 64, row * 16);
                    gl.vertexAttribDivisor(location + row, divisor);
                }
            }
            else {
                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
                gl.vertexAttribDivisor(location, divisor);
            }
        }
        send(data) {
            const gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.native);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            return data;
        }
        reserve(bytes) {
            const gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.native);
            gl.bufferData(gl.ARRAY_BUFFER, bytes, gl.DYNAMIC_DRAW);
            return bytes;
        }
    }
    $.$bog_gamengine_gl_buffer = $bog_gamengine_gl_buffer;
    function $bog_gamengine_gl_texture_array(gl, images, size) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGBA, size, size, images.length, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        for (let i = 0; i < images.length; ++i) {
            gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, i, size, size, 1, gl.RGBA, gl.UNSIGNED_BYTE, images[i]);
        }
        const anisotropic = gl.getExtension('EXT_texture_filter_anisotropic');
        if (anisotropic) {
            const max = gl.getParameter(anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            gl.texParameterf(gl.TEXTURE_2D_ARRAY, anisotropic.TEXTURE_MAX_ANISOTROPY_EXT, max);
        }
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        return texture;
    }
    $.$bog_gamengine_gl_texture_array = $bog_gamengine_gl_texture_array;
    class $bog_gamengine_gl_depth_target extends Object {
        gl;
        size;
        native;
        texture;
        constructor(gl, size) {
            super();
            this.gl = gl;
            this.size = size;
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texStorage2D(gl.TEXTURE_2D, 1, gl.DEPTH_COMPONENT24, size, size);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_FUNC, gl.LEQUAL);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.native = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.native);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.texture, 0);
            gl.drawBuffers([gl.NONE]);
            gl.readBuffer(gl.NONE);
            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            if (status === gl.FRAMEBUFFER_COMPLETE)
                return;
            this.dispose();
            throw new Error(`Depth target is incomplete (${status})`);
        }
        dispose() {
            this.gl.deleteFramebuffer(this.native);
            this.gl.deleteTexture(this.texture);
            return this;
        }
    }
    $.$bog_gamengine_gl_depth_target = $bog_gamengine_gl_depth_target;
    class $bog_gamengine_gl_color_target extends Object {
        gl;
        native = null;
        texture = null;
        depth = null;
        width = 0;
        height = 0;
        float;
        constructor(gl, width, height) {
            super();
            this.gl = gl;
            this.float = !!gl.getExtension('EXT_color_buffer_float');
            this.attach(width, height);
        }
        attach(width, height) {
            const gl = this.gl;
            this.width = Math.max(Math.round(width), 1);
            this.height = Math.max(Math.round(height), 1);
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texStorage2D(gl.TEXTURE_2D, 1, this.float ? gl.RGBA16F : gl.RGBA8, this.width, this.height);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.depth = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, this.width, this.height);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            this.native = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.native);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth);
            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            if (status === gl.FRAMEBUFFER_COMPLETE)
                return this;
            this.dispose();
            throw new Error(`Color target is incomplete (${status})`);
        }
        resize(width, height) {
            if (this.width === Math.max(Math.round(width), 1) && this.height === Math.max(Math.round(height), 1))
                return this;
            this.dispose();
            return this.attach(width, height);
        }
        dispose() {
            const gl = this.gl;
            if (this.native)
                gl.deleteFramebuffer(this.native);
            if (this.texture)
                gl.deleteTexture(this.texture);
            if (this.depth)
                gl.deleteRenderbuffer(this.depth);
            this.native = null;
            this.texture = null;
            this.depth = null;
            return this;
        }
    }
    $.$bog_gamengine_gl_color_target = $bog_gamengine_gl_color_target;
    function $bog_gamengine_gl_uniform_matrix(gl, location, data) {
        if (!location)
            return data;
        switch (data.length) {
            case 16:
                gl.uniformMatrix4fv(location, false, data);
                break;
            case 9:
                gl.uniformMatrix3fv(location, false, data);
                break;
            case 4:
                gl.uniformMatrix2fv(location, false, data);
                break;
            default: throw new Error(`Wrong matrix data length (${data.length})`);
        }
        return data;
    }
    $.$bog_gamengine_gl_uniform_matrix = $bog_gamengine_gl_uniform_matrix;
    function $bog_gamengine_gl_uniform_vector(gl, location, data) {
        if (!location)
            return data;
        switch (data.length) {
            case 4:
                gl.uniform4fv(location, data);
                break;
            case 3:
                gl.uniform3fv(location, data);
                break;
            case 2:
                gl.uniform2fv(location, data);
                break;
            case 1:
                gl.uniform1fv(location, data);
                break;
            default: throw new Error(`Wrong vector data length (${data.length})`);
        }
        return data;
    }
    $.$bog_gamengine_gl_uniform_vector = $bog_gamengine_gl_uniform_vector;
    function $bog_gamengine_gl_uniform_vec4s(gl, location, data) {
        if (location)
            gl.uniform4fv(location, data);
        return data;
    }
    $.$bog_gamengine_gl_uniform_vec4s = $bog_gamengine_gl_uniform_vec4s;
    function $bog_gamengine_gl_uniform_int(gl, location, value) {
        if (location)
            gl.uniform1i(location, value);
        return value;
    }
    $.$bog_gamengine_gl_uniform_int = $bog_gamengine_gl_uniform_int;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_3d_glsl_both = '';
    $.$mol_3d_glsl_vert = '';
    $.$mol_3d_glsl_frag = '';
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader extends $mol_object2 {
        programs = new WeakMap();
        face() {
            return {};
        }
        vert() {
            return `void main() {}`;
        }
        frag() {
            return `void main() {}`;
        }
        depth() {
            return false;
        }
        sources() {
            return {
                vert: $mol_3d_glsl_both + this.vert(),
                frag: $mol_3d_glsl_both + this.frag(),
            };
        }
        program(gl) {
            let program = this.programs.get(gl);
            if (!program) {
                const sources = this.sources();
                program = new $bog_gamengine_gl_program(gl, this.face(), sources.vert, sources.frag);
                this.programs.set(gl, program);
            }
            return program;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_shader.prototype, "sources", null);
    $.$bog_gamengine_shader = $bog_gamengine_shader;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** App tree: `plugins / <= Control mol_keyboard_state key <= key_map`, where `key_map()` in app ts returns `this.Key().keys()` */
    class $bog_gamengine_key extends $mol_object2 {
        bind(next = {}) {
            return next;
        }
        states = new Map();
        pressed(name, next) {
            if (next !== undefined)
                this.states.set(name, next);
            return this.states.get(name) ?? false;
        }
        action(name) {
            const keys = this.bind()[name];
            if (!keys)
                return false;
            for (let i = 0; i < keys.length; ++i)
                if (this.pressed(keys[i]))
                    return true;
            return false;
        }
        axis(neg, pos) {
            return (this.action(pos) ? 1 : 0) - (this.action(neg) ? 1 : 0);
        }
        keys() {
            const keys = {};
            for (const names of Object.values(this.bind())) {
                for (const name of names) {
                    keys[name] = (state) => this.pressed(name, state);
                }
            }
            return keys;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_key.prototype, "bind", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_key.prototype, "keys", null);
    $.$bog_gamengine_key = $bog_gamengine_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const button_index = {
        a: 0, b: 1, x: 2, y: 3,
        lb: 4, rb: 5, lt: 6, rt: 7,
        back: 8, start: 9, ls: 10, rs: 11,
        up: 12, down: 13, left: 14, right: 15,
    };
    const axis_index = {
        'lx-': [0, -1], 'lx+': [0, 1],
        'ly-': [1, -1], 'ly+': [1, 1],
        'rx-': [2, -1], 'rx+': [2, 1],
        'ry-': [3, -1], 'ry+': [3, 1],
    };
    class $bog_gamengine_pad extends $mol_object2 {
        bind(next = {}) {
            return next;
        }
        dead(next = 0.2) {
            return next;
        }
        buttons = new Uint8Array(16);
        axes = new Float32Array(4);
        pads() {
            return globalThis.navigator?.getGamepads?.() ?? [];
        }
        poll() {
            const pads = this.pads();
            let pad = null;
            for (let i = 0; i < pads.length; ++i) {
                if (pads[i]) {
                    pad = pads[i];
                    break;
                }
            }
            const buttons = this.buttons;
            const axes = this.axes;
            if (!pad) {
                buttons.fill(0);
                axes.fill(0);
                return;
            }
            for (let i = 0; i < buttons.length; ++i)
                buttons[i] = pad.buttons[i]?.pressed ? 1 : 0;
            for (let i = 0; i < axes.length; ++i)
                axes[i] = pad.axes[i] ?? 0;
        }
        value(name) {
            const button = button_index[name];
            if (button !== undefined)
                return this.buttons[button];
            const axis = axis_index[name];
            if (!axis)
                return 0;
            const raw = this.axes[axis[0]] * axis[1];
            return raw > this.dead() ? raw : 0;
        }
        strength(name) {
            const names = this.bind()[name];
            if (!names)
                return 0;
            let max = 0;
            for (let i = 0; i < names.length; ++i) {
                const value = this.value(names[i]);
                if (value > max)
                    max = value;
            }
            return max;
        }
        action(name) {
            return this.strength(name) > 0;
        }
        axis(neg, pos) {
            return this.strength(pos) - this.strength(neg);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_pad.prototype, "bind", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_pad.prototype, "dead", null);
    $.$bog_gamengine_pad = $bog_gamengine_pad;
})($ || ($ = {}));

;
	($.$mol_speck) = class $mol_speck extends ($.$mol_view) {
		value(){
			return null;
		}
		theme(){
			return "$mol_theme_accent";
		}
		sub(){
			return [(this.value())];
		}
	};


;
"use strict";
var $;
(function ($) {
    /**
     * Z-index values for layers
     * https://page.hyoo.ru/#!=xthcpx_wqmiba
     */
    $.$mol_layer = $mol_style_prop('mol_layer', [
        'hover',
        'focus',
        'speck',
        'float',
        'popup',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/layer/layer.css", ":root {\n\t--mol_layer_hover: 1;\n\t--mol_layer_focus: 2;\n\t--mol_layer_speck: 3;\n\t--mol_layer_float: 4;\n\t--mol_layer_popup: 5;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .75rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.2rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .75rem;\n\tvertical-align: sub;\n\tpadding: 0 .2rem;\n\tposition: absolute;\n\tz-index: var(--mol_layer_speck);\n\ttext-align: center;\n\tline-height: .9;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\tuser-select: none;\n\tbox-shadow: 0 0 3px rgba(0,0,0,.5);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button) = class $mol_button extends ($.$mol_view) {
		event_activate(next){
			if(next !== undefined) return next;
			return null;
		}
		activate(next){
			return (this.event_activate(next));
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		event_key_press(next){
			if(next !== undefined) return next;
			return null;
		}
		key_press(next){
			return (this.event_key_press(next));
		}
		disabled(){
			return false;
		}
		tab_index(){
			return 0;
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		error(){
			return "";
		}
		enabled(){
			return true;
		}
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		status(next){
			if(next !== undefined) return next;
			return [];
		}
		event(){
			return {
				...(super.event()), 
				"click": (next) => (this.activate(next)), 
				"dblclick": (next) => (this.clicks(next)), 
				"keydown": (next) => (this.key_press(next))
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"disabled": (this.disabled()), 
				"role": "button", 
				"tabindex": (this.tab_index()), 
				"title": (this.hint_safe())
			};
		}
		sub(){
			return [(this.title())];
		}
		Speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ((this.error()));
			return obj;
		}
	};
	($mol_mem(($.$mol_button.prototype), "event_activate"));
	($mol_mem(($.$mol_button.prototype), "clicks"));
	($mol_mem(($.$mol_button.prototype), "event_key_press"));
	($mol_mem(($.$mol_button.prototype), "click"));
	($mol_mem(($.$mol_button.prototype), "event_click"));
	($mol_mem(($.$mol_button.prototype), "status"));
	($mol_mem(($.$mol_button.prototype), "Speck"));


;
"use strict";
var $;
(function ($) {
    /**
    * Key names code for hotkey
    * @see [mol_hotkey](../../hotkey/hotkey.view.ts)
    */
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Simple button.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button extends $.$mol_button {
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                try {
                    this.event_click(next);
                    this.click(next);
                    this.status([null]);
                }
                catch (error) {
                    // Calling actions from catch section, if throwing promise breaks idempotency
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
            }
            event_key_press(event) {
                if (event.keyCode === $mol_keyboard_code.enter) {
                    return this.activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
            error() {
                const error = this.status()?.[0];
                if (!error)
                    return '';
                if ($mol_promise_like(error)) {
                    return $mol_fail_hidden(error);
                }
                return this.$.$mol_error_message(error);
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
            sub_visible() {
                return [
                    ...this.error() ? [this.Speck()] : [],
                    ...this.sub(),
                ];
            }
        }
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\t-webkit-user-select: none;\n\tborder-radius: var(--mol_gap_round);\n\tbackground: transparent;\n\tcolor: inherit;\n}\n\n[mol_button]:where(:not(:disabled)):hover {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_button]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$bog_gamengine_input_screen) = class $bog_gamengine_input_screen extends ($.$mol_view) {
		stick_down(next){
			if(next !== undefined) return next;
			return null;
		}
		stick_move(next){
			if(next !== undefined) return next;
			return null;
		}
		stick_up(next){
			if(next !== undefined) return next;
			return null;
		}
		stick_cancel(next){
			if(next !== undefined) return next;
			return null;
		}
		stick_leave(next){
			if(next !== undefined) return next;
			return null;
		}
		Knob(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"transform": (this.knob_shift())});
			return obj;
		}
		Stick(){
			const obj = new this.$.$mol_view();
			(obj.event) = () => ({
				"pointerdown": (next) => (this.stick_down(next)), 
				"pointermove": (next) => (this.stick_move(next)), 
				"pointerup": (next) => (this.stick_up(next)), 
				"pointercancel": (next) => (this.stick_cancel(next)), 
				"pointerleave": (next) => (this.stick_leave(next))
			});
			(obj.sub) = () => ([(this.Knob())]);
			return obj;
		}
		buttons(){
			return [];
		}
		Buttons(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.buttons()));
			return obj;
		}
		button_title(id){
			return "";
		}
		button_down(id, next){
			if(next !== undefined) return next;
			return null;
		}
		button_up(id, next){
			if(next !== undefined) return next;
			return null;
		}
		button_cancel(id, next){
			if(next !== undefined) return next;
			return null;
		}
		button_leave(id, next){
			if(next !== undefined) return next;
			return null;
		}
		shown(next){
			if(next !== undefined) return next;
			return false;
		}
		actions(){
			return [];
		}
		titles(){
			return {};
		}
		bind(){
			return {};
		}
		dead(){
			return 0.2;
		}
		radius(){
			return 48;
		}
		knob_shift(next){
			if(next !== undefined) return next;
			return "";
		}
		sub(){
			return [(this.Stick()), (this.Buttons())];
		}
		Button(id){
			const obj = new this.$.$mol_button();
			(obj.title) = () => ((this.button_title(id)));
			(obj.event) = () => ({
				...(this.$.$mol_button.prototype.event.call(obj)), 
				"pointerdown": (next) => (this.button_down(id, next)), 
				"pointerup": (next) => (this.button_up(id, next)), 
				"pointercancel": (next) => (this.button_cancel(id, next)), 
				"pointerleave": (next) => (this.button_leave(id, next))
			});
			return obj;
		}
	};
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "stick_down"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "stick_move"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "stick_up"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "stick_cancel"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "stick_leave"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "Knob"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "Stick"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "Buttons"));
	($mol_mem_key(($.$bog_gamengine_input_screen.prototype), "button_down"));
	($mol_mem_key(($.$bog_gamengine_input_screen.prototype), "button_up"));
	($mol_mem_key(($.$bog_gamengine_input_screen.prototype), "button_cancel"));
	($mol_mem_key(($.$bog_gamengine_input_screen.prototype), "button_leave"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "shown"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "knob_shift"));
	($mol_mem_key(($.$bog_gamengine_input_screen.prototype), "Button"));


;
"use strict";
var $;
(function ($) {
    class $mol_media extends $mol_object2 {
        static match(query, next) {
            if (next !== undefined)
                return next;
            const res = this.$.$mol_dom_context.matchMedia?.(query) ?? {};
            res.onchange = () => this.match(query, res.matches);
            return res.matches;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_media, "match", null);
    $.$mol_media = $mol_media;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config0) {
        let rules = [];
        const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
        const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
        const make_class = (prefix, path, config) => {
            const props = [];
            const selector = (prefix, path) => {
                if (path.length === 0)
                    return prefix || `[${block}]`;
                let res = `[${block}_${path.join('_')}]`;
                if (prefix)
                    res = prefix + ' :where(' + res + ')';
                return res;
            };
            for (const key of Object.keys(config).reverse()) {
                if (/^(--)?[a-z]/.test(key)) {
                    const addProp = (keys, val) => {
                        if (Array.isArray(val)) {
                            if (val[0] && [Array, Object].includes(val[0].constructor)) {
                                val = val.map(v => {
                                    return Object.entries(v).map(([n, a]) => {
                                        if (a === true)
                                            return kebab(n);
                                        if (a === false)
                                            return null;
                                        return String(a);
                                    }).filter(Boolean).join(' ');
                                }).join(',');
                            }
                            else {
                                val = val.join(' ');
                            }
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                        else if (val.constructor === Object) {
                            for (let suffix of Object.keys(val).reverse()) {
                                addProp([...keys, kebab(suffix)], val[suffix]);
                            }
                        }
                        else {
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                    };
                    addProp([kebab(key)], config[key]);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix, [...path, key.toLowerCase()], config[key]);
                }
                else if (key[0] === '$') {
                    make_class(selector(prefix, path) + ' :where([' + $mol_dom_qname(key) + '])', [], config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type of Object.keys(types).reverse()) {
                        make_class(selector(prefix, path) + ' > :where([' + $mol_dom_qname(type) + '])', [], types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name of Object.keys(attrs).reverse()) {
                        for (let val in attrs[name]) {
                            make_class(selector(prefix, path) + ':where([' + name + '=' + JSON.stringify(val) + '])', [], attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media' || key === '@container') {
                    const media = config[key];
                    for (let query of Object.keys(media).reverse()) {
                        rules.push('}\n');
                        make_class(prefix, path, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else if (key === '@starting-style') {
                    const styles = config[key];
                    rules.push('}\n');
                    make_class(prefix, path, styles);
                    rules.push(`${key} {\n`);
                }
                else if (key[0] === '[' && key[key.length - 1] === ']') {
                    const attr = key.slice(1, -1);
                    const vals = config[key];
                    for (let val of Object.keys(vals).reverse()) {
                        make_class(selector(prefix, path) + ':where([' + attr + '=' + JSON.stringify(val) + '])', [], vals[val]);
                    }
                }
                else {
                    make_class(selector(prefix, path) + key, [], config[key]);
                }
            }
            if (props.length) {
                rules.push(`${selector(prefix, path)} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class('', [], config0);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS in TS.
     * Statically typed CSS style sheets. Following samples show which CSS code are generated from TS code.
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    function $mol_style_define(Component, config) {
        return $mol_style_attach(Component.name, $mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));

;
"use strict";

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_gamengine_input_screen extends $.$bog_gamengine_input_screen {
            stick = new Float32Array(2);
            held = new Map();
            stick_pointer = -1;
            bind() {
                return { left: ['x-'], right: ['x+'], up: ['y+'], down: ['y-'] };
            }
            coarse() {
                return this.$.$mol_media.match('(pointer: coarse)');
            }
            visible() {
                return this.shown() || this.coarse();
            }
            sub() {
                return this.visible() ? super.sub() : [];
            }
            buttons() {
                return this.actions().map(name => this.Button(name));
            }
            button_title(name) {
                return this.titles()[name] ?? name;
            }
            value(name) {
                const stick = this.stick;
                if (name === 'x-')
                    return stick[0] < 0 ? -stick[0] : 0;
                if (name === 'x+')
                    return stick[0] > 0 ? stick[0] : 0;
                if (name === 'y-')
                    return stick[1] < 0 ? -stick[1] : 0;
                if (name === 'y+')
                    return stick[1] > 0 ? stick[1] : 0;
                return this.held.get(name) ? 1 : 0;
            }
            strength(name) {
                let max = this.held.get(name) ? 1 : 0;
                const names = this.bind()[name];
                if (!names)
                    return max;
                for (let i = 0; i < names.length; ++i) {
                    const value = this.value(names[i]);
                    if (value > max)
                        max = value;
                }
                return max;
            }
            action(name) {
                return this.strength(name) > 0;
            }
            axis(neg, pos) {
                return this.strength(pos) - this.strength(neg);
            }
            move(dx, dy) {
                const radius = this.radius();
                let x = dx / radius;
                let y = -dy / radius;
                const len = Math.hypot(x, y);
                if (len > 1) {
                    x /= len;
                    y /= len;
                }
                this.knob_shift(`translate(${(x * radius).toFixed(1)}px, ${(-y * radius).toFixed(1)}px)`);
                if (len < this.dead()) {
                    x = 0;
                    y = 0;
                }
                this.stick[0] = x;
                this.stick[1] = y;
            }
            press(name) {
                this.held.set(name, true);
            }
            release(name) {
                this.held.set(name, false);
            }
            stick_track(event) {
                const box = event.currentTarget.getBoundingClientRect();
                this.move(event.clientX - box.left - box.width / 2, event.clientY - box.top - box.height / 2);
            }
            stick_down(event) {
                if (!event)
                    return null;
                this.stick_pointer = event.pointerId;
                this.stick_track(event);
                return event;
            }
            stick_move(event) {
                if (!event || event.pointerId !== this.stick_pointer)
                    return null;
                this.stick_track(event);
                return event;
            }
            stick_up(event) {
                if (!event || event.pointerId !== this.stick_pointer)
                    return null;
                this.stick_pointer = -1;
                this.move(0, 0);
                return event;
            }
            stick_cancel(event) {
                return this.stick_up(event);
            }
            stick_leave(event) {
                return this.stick_up(event);
            }
            button_down(name, event) {
                if (!event)
                    return null;
                this.press(name);
                return event;
            }
            button_up(name, event) {
                if (!event)
                    return null;
                this.release(name);
                return event;
            }
            button_cancel(name, event) {
                return this.button_up(name, event);
            }
            button_leave(name, event) {
                return this.button_up(name, event);
            }
        }
        __decorate([
            $mol_mem
        ], $bog_gamengine_input_screen.prototype, "coarse", null);
        $$.$bog_gamengine_input_screen = $bog_gamengine_input_screen;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_gamengine_input_screen, {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: $mol_gap.block,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            pointerEvents: 'none',
            userSelect: 'none',
            Stick: {
                pointerEvents: 'auto',
                touchAction: 'none',
                width: '9rem',
                height: '9rem',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                background: {
                    color: $mol_theme.card,
                },
            },
            Knob: {
                pointerEvents: 'none',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: {
                    color: $mol_theme.line,
                },
            },
            Buttons: {
                pointerEvents: 'auto',
                gap: $mol_gap.space,
            },
            Button: {
                touchAction: 'none',
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                background: {
                    color: $mol_theme.card,
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_input extends $mol_object2 {
        key(next) {
            return next ?? null;
        }
        pad(next) {
            return next ?? null;
        }
        screen(next) {
            return next ?? null;
        }
        poll() {
            this.pad()?.poll();
        }
        action(name) {
            return (this.key()?.action(name) ?? false)
                || (this.pad()?.action(name) ?? false)
                || (this.screen()?.action(name) ?? false);
        }
        axis(neg, pos) {
            const key = this.key()?.axis(neg, pos) ?? 0;
            if (key !== 0)
                return key;
            const pad = this.pad()?.axis(neg, pos) ?? 0;
            if (pad !== 0)
                return pad;
            return this.screen()?.axis(neg, pos) ?? 0;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_input.prototype, "key", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_input.prototype, "pad", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_input.prototype, "screen", null);
    $.$bog_gamengine_input = $bog_gamengine_input;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_clock extends $mol_object2 {
        frames = 0;
        now_last = NaN;
        dt_raw = 0;
        time_total = 0;
        time_frame = 0;
        tick_at = 0;
        frame() {
            this.tick_at = performance.now();
            const now = this.$.$mol_state_time.now(0);
            this.dt_raw = isNaN(this.now_last) ? 0 : Math.min((now - this.now_last) / 1000, 0.1);
            this.now_last = now;
            return ++this.frames;
        }
        dt() {
            this.frame();
            if (this.paused())
                return 0;
            return this.dt_raw * this.speed();
        }
        time(next) {
            const frame = this.frame();
            const dt = this.dt();
            if (next !== undefined) {
                this.time_frame = frame;
                this.time_total = next;
                return next;
            }
            if (frame !== this.time_frame) {
                this.time_frame = frame;
                this.time_total += dt;
            }
            return this.time_total;
        }
        paused(next = false) {
            return next;
        }
        speed(next = 1) {
            return next;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock.prototype, "frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock.prototype, "dt", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock.prototype, "time", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock.prototype, "paused", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock.prototype, "speed", null);
    $.$bog_gamengine_clock = $bog_gamengine_clock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_mat4 extends Float32Array {
        static identity() {
            return new $mol_3d_mat4([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ]);
        }
        static translation([x, y, z]) {
            return new $mol_3d_mat4([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                x, y, z, 1,
            ]);
        }
        static scaling([x, y, z]) {
            return new $mol_3d_mat4([
                x, 0, 0, 0,
                0, y, 0, 0,
                0, 0, z, 0,
                0, 0, 0, 1,
            ]);
        }
        static rotation([x, y, z], angle) {
            var length = Math.hypot(x, y, z);
            x /= length;
            y /= length;
            z /= length;
            const xx = x ** 2;
            const yy = y ** 2;
            const zz = z ** 2;
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            const mc = 1 - c;
            return new $mol_3d_mat4([
                xx + (1 - xx) * c,
                x * y * mc + z * s,
                x * z * mc - y * s,
                0,
                x * y * mc - z * s,
                yy + (1 - yy) * c,
                y * z * mc + x * s,
                0,
                x * z * mc + y * s,
                y * z * mc - x * s,
                zz + (1 - zz) * c,
                0,
                0, 0, 0, 1,
            ]);
        }
        static orthographic(left, right, bottom, top, near, far) {
            const rpl = right + left;
            const tpb = top + bottom;
            const npf = near + far;
            const rml = right - left;
            const tmb = top - bottom;
            const nmf = near - far;
            return new $mol_3d_mat4([
                2 / rml, 0, 0, 0,
                0, 2 / tmb, 0, 0,
                0, 0, 2 / nmf, 0,
                -rpl / rml, -tpb / tmb, npf / nmf, 1,
            ]);
        }
        static perspective(fov, aspect, near, far) {
            var f = Math.tan(Math.PI / 2 - fov / 2);
            var irange = 1.0 / (near - far);
            return new $mol_3d_mat4([
                f / aspect, 0, 0, 0,
                0, f, 0, 0,
                0, 0, (near + far) * irange, -1,
                0, 0, near * far * irange * 2, 0,
            ]);
        }
        static multiply(head, ...tail) {
            if (tail.length === 0)
                return new $mol_3d_mat4(head);
            const foot = tail.length > 1 ? this.multiply(...tail) : tail[0];
            return new $mol_3d_mat4([
                foot[0] * head[0] + foot[1] * head[4] + foot[2] * head[8] + foot[3] * head[12],
                foot[0] * head[1] + foot[1] * head[5] + foot[2] * head[9] + foot[3] * head[13],
                foot[0] * head[2] + foot[1] * head[6] + foot[2] * head[10] + foot[3] * head[14],
                foot[0] * head[3] + foot[1] * head[7] + foot[2] * head[11] + foot[3] * head[15],
                foot[4] * head[0] + foot[5] * head[4] + foot[6] * head[8] + foot[7] * head[12],
                foot[4] * head[1] + foot[5] * head[5] + foot[6] * head[9] + foot[7] * head[13],
                foot[4] * head[2] + foot[5] * head[6] + foot[6] * head[10] + foot[7] * head[14],
                foot[4] * head[3] + foot[5] * head[7] + foot[6] * head[11] + foot[7] * head[15],
                foot[8] * head[0] + foot[9] * head[4] + foot[10] * head[8] + foot[11] * head[12],
                foot[8] * head[1] + foot[9] * head[5] + foot[10] * head[9] + foot[11] * head[13],
                foot[8] * head[2] + foot[9] * head[6] + foot[10] * head[10] + foot[11] * head[14],
                foot[8] * head[3] + foot[9] * head[7] + foot[10] * head[11] + foot[11] * head[15],
                foot[12] * head[0] + foot[13] * head[4] + foot[14] * head[8] + foot[15] * head[12],
                foot[12] * head[1] + foot[13] * head[5] + foot[14] * head[9] + foot[15] * head[13],
                foot[12] * head[2] + foot[13] * head[6] + foot[14] * head[10] + foot[15] * head[14],
                foot[12] * head[3] + foot[13] * head[7] + foot[14] * head[11] + foot[15] * head[15],
            ]);
        }
        inversed() {
            const p_0 = this[10] * this[15], p_1 = this[14] * this[11], p_2 = this[6] * this[15], p_3 = this[14] * this[7];
            const p_4 = this[6] * this[11], p_5 = this[10] * this[7], p_6 = this[2] * this[15], p_7 = this[14] * this[3];
            const p_8 = this[2] * this[11], p_9 = this[10] * this[3], p10 = this[2] * this[7], p11 = this[6] * this[3];
            const p12 = this[8] * this[13], p13 = this[12] * this[9], p14 = this[4] * this[13], p15 = this[12] * this[5];
            const p16 = this[4] * this[9], p17 = this[8] * this[5], p18 = this[0] * this[13], p19 = this[12] * this[1];
            const p20 = this[0] * this[9], p21 = this[8] * this[1], p22 = this[0] * this[5], p23 = this[4] * this[1];
            const t0 = p_0 * this[5] + p_3 * this[9] + p_4 * this[13] - p_1 * this[5] - p_2 * this[9] - p_5 * this[13];
            const t1 = p_1 * this[1] + p_6 * this[9] + p_9 * this[13] - p_0 * this[1] - p_7 * this[9] - p_8 * this[13];
            const t2 = p_2 * this[1] + p_7 * this[5] + p10 * this[13] - p_3 * this[1] - p_6 * this[5] - p11 * this[13];
            const t3 = p_5 * this[1] + p_8 * this[5] + p11 * this[9] - p_4 * this[1] - p_9 * this[5] - p10 * this[9];
            const d = 1.0 / (this[0] * t0 + this[4] * t1 + this[8] * t2 + this[12] * t3);
            return new $mol_3d_mat4([
                d * t0, d * t1, d * t2, d * t3,
                d * (p_1 * this[4] + p_2 * this[8] + p_5 * this[12] - p_0 * this[4] - p_3 * this[8] - p_4 * this[12]),
                d * (p_0 * this[0] + p_7 * this[8] + p_8 * this[12] - p_1 * this[0] - p_6 * this[8] - p_9 * this[12]),
                d * (p_3 * this[0] + p_6 * this[4] + p11 * this[12] - p_2 * this[0] - p_7 * this[4] - p10 * this[12]),
                d * (p_4 * this[0] + p_9 * this[4] + p10 * this[8] - p_5 * this[0] - p_8 * this[4] - p11 * this[8]),
                d * (p12 * this[7] + p15 * this[11] + p16 * this[15] - p13 * this[7] - p14 * this[11] - p17 * this[15]),
                d * (p13 * this[3] + p18 * this[11] + p21 * this[15] - p12 * this[3] - p19 * this[11] - p20 * this[15]),
                d * (p14 * this[3] + p19 * this[7] + p22 * this[15] - p15 * this[3] - p18 * this[7] - p23 * this[15]),
                d * (p17 * this[3] + p20 * this[7] + p23 * this[11] - p16 * this[3] - p21 * this[7] - p22 * this[11]),
                d * (p14 * this[10] + p17 * this[14] + p13 * this[6] - p16 * this[14] - p12 * this[6] - p15 * this[10]),
                d * (p20 * this[14] + p12 * this[2] + p19 * this[10] - p18 * this[10] - p21 * this[14] - p13 * this[2]),
                d * (p18 * this[6] + p23 * this[14] + p15 * this[2] - p22 * this[14] - p14 * this[2] - p19 * this[6]),
                d * (p22 * this[10] + p16 * this[2] + p21 * this[6] - p20 * this[6] - p23 * this[10] - p17 * this[2]),
            ]);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_3d_mat4.prototype, "inversed", null);
    __decorate([
        $mol_memo.method
    ], $mol_3d_mat4, "identity", null);
    $.$mol_3d_mat4 = $mol_3d_mat4;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_3d_glsl_both += "// vector of scales by transformation matrix\nvec4 mol_3d_mat4_scales( in mat4 trans ) {\n\treturn vec4(\n\t\tlength( trans[0] ),\n\t\tlength( trans[1] ),\n\t\tlength( trans[2] ),\n\t\tlength( trans[3] )\n\t);\n}\n";
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_node_vec(next) {
        return next instanceof Float32Array ? next : new Float32Array(next);
    }
    $.$bog_gamengine_node_vec = $bog_gamengine_node_vec;
    class $bog_gamengine_node extends $mol_object2 {
        name(next = '') {
            return next;
        }
        title() {
            const name = this.name();
            if (name)
                return name;
            const cls = this.constructor;
            return cls.$.$mol_func_name(cls).replace(/^\$bog_gamengine_/, '');
        }
        props() {
            return [
                { name: 'pos', kind: 'vec3', get: () => this.pos(), set: next => this.pos(next) },
                { name: 'rot', kind: 'euler', get: () => this.rot(), set: next => this.rot(next) },
                { name: 'scale', kind: 'vec3', get: () => this.scale(), set: next => this.scale(next) },
                { name: 'tint', kind: 'vec4', get: () => this.tint(), set: next => this.tint(next) },
            ];
        }
        pos(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0, 0]);
        }
        rot(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0, 0]);
        }
        scale(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1]);
        }
        tint(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1, 1]);
        }
        billboard(next = false) {
            return next;
        }
        shader(next) {
            return next ?? null;
        }
        parent(next) {
            return next ?? null;
        }
        kids(next) {
            if (!next)
                return [];
            for (let i = 0; i < next.length; ++i) {
                if (!next[i].parent())
                    next[i].parent(this);
            }
            return next;
        }
        root() {
            let node = this;
            for (let parent = node.parent(); parent; parent = node.parent())
                node = parent;
            return node;
        }
        is_scene() {
            return false;
        }
        is_brain() {
            return false;
        }
        scene() {
            const root = this.root();
            return root.is_scene() ? root : null;
        }
        input() {
            return this.scene()?.input() ?? null;
        }
        clock() {
            return this.scene()?.clock() ?? null;
        }
        cam_yaw() {
            const cam = this.scene()?.cam() ?? null;
            if (!cam)
                return this.rot()[1];
            const world = cam.world();
            return Math.atan2(world[8], world[10]);
        }
        trans() {
            const rot = this.rot();
            const yaw = this.billboard() ? this.cam_yaw() : rot[1];
            return $mol_3d_mat4.multiply($mol_3d_mat4.translation(this.pos()), $mol_3d_mat4.rotation([0, 0, 1], rot[2]), $mol_3d_mat4.rotation([0, 1, 0], yaw), $mol_3d_mat4.rotation([1, 0, 0], rot[0]), $mol_3d_mat4.scaling(this.scale()));
        }
        world() {
            const parent = this.parent();
            return parent ? $mol_3d_mat4.multiply(parent.world(), this.trans()) : this.trans();
        }
        step(dt) { }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "name", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "pos", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "rot", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "scale", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "tint", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "billboard", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "shader", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "parent", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "kids", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "trans", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "world", null);
    $.$bog_gamengine_node = $bog_gamengine_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_light extends $bog_gamengine_node {
        kind(next = 'sun') {
            return next;
        }
        color(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1]);
        }
        power(next = 1) {
            return next;
        }
        range(next = 10) {
            return next;
        }
        angle(next = Math.PI / 6) {
            return next;
        }
        props() {
            return [
                ...super.props(),
                { name: 'kind', kind: 'text', get: () => this.kind(), set: next => this.kind(next) },
                { name: 'color', kind: 'vec3', get: () => this.color(), set: next => this.color(next) },
                { name: 'power', kind: 'number', get: () => this.power(), set: next => this.power(next) },
                { name: 'range', kind: 'number', get: () => this.range(), set: next => this.range(next) },
                { name: 'angle', kind: 'number', get: () => this.angle(), set: next => this.angle(next) },
            ];
        }
        dir() {
            const dir = new Float32Array(3);
            return $bog_gamengine_light_dir(this.world(), dir, 0);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "kind", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "color", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "power", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "range", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "angle", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "dir", null);
    $.$bog_gamengine_light = $bog_gamengine_light;
    function $bog_gamengine_light_dir(world, out, offset) {
        const x = -world[8];
        const y = -world[9];
        const z = -world[10];
        const len = Math.hypot(x, y, z) || 1;
        out[offset] = x / len;
        out[offset + 1] = y / len;
        out[offset + 2] = z / len;
        return out;
    }
    $.$bog_gamengine_light_dir = $bog_gamengine_light_dir;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_sprite extends $bog_gamengine_shader {
        face() {
            return {
                glob: { proj: 'mat4', view: 'mat4', atlas: 'sampler2DArray' },
                input: { vertex: 'vec3', uv: 'vec2', inst_trans: 'mat4', inst_tint: 'vec4', inst_layer: 'float', inst_uv: 'vec4' },
                pipe: { pipe_uv: 'vec2', pipe_layer: 'float', pipe_tint: 'vec4' },
                output: { color: 'vec4' },
            };
        }
        vert() {
            return `
				void main() {
					gl_Position = proj * view * inst_trans * vec4( vertex, 1.0 );
					pipe_uv = uv * inst_uv.zw + inst_uv.xy;
					pipe_layer = inst_layer;
					pipe_tint = inst_tint;
				}
			`;
        }
        frag() {
            return `
				void main() {
					color = texture( atlas, vec3( pipe_uv, pipe_layer ) ) * pipe_tint;
				}
			`;
        }
    }
    $.$bog_gamengine_shader_sprite = $bog_gamengine_shader_sprite;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_solid extends $bog_gamengine_shader {
        face() {
            return {
                glob: {
                    proj: 'mat4',
                    view: 'mat4',
                    atlas: 'sampler2DArray',
                    light_count: 'int',
                    light_pos: 'vec4[8]',
                    light_dir: 'vec4[8]',
                    light_color: 'vec4[8]',
                    ambient: 'vec3',
                    cam_pos: 'vec3',
                    fog: 'vec2',
                    fog_color: 'vec3',
                    wireframe: 'float',
                    shadow_mat: 'mat4',
                    shadow_map: 'sampler2DShadow',
                    shadow_light: 'int',
                },
                input: {
                    vertex: 'vec3',
                    uv: 'vec2',
                    normal: 'vec3',
                    inst_trans: 'mat4',
                    inst_tint: 'vec4',
                    inst_layer: 'float',
                    inst_uv: 'vec4',
                    inst_material: 'vec4',
                    inst_normal_layer: 'float',
                },
                pipe: {
                    pipe_uv: 'vec2',
                    pipe_layer: 'float',
                    pipe_tint: 'vec4',
                    pipe_normal: 'vec3',
                    pipe_pos: 'vec3',
                    pipe_material: 'vec4',
                    pipe_normal_layer: 'float',
                },
                output: { color: 'vec4' },
            };
        }
        depth() {
            return true;
        }
        vert() {
            return `
				void main() {
					vec4 world = inst_trans * vec4( vertex, 1.0 );
					gl_Position = proj * view * world;
					if( wireframe > 0.5 ) gl_Position.z -= 0.001;
					pipe_pos = world.xyz;
					pipe_normal = normalize( mat3( inst_trans ) * normal );
					pipe_uv = uv * inst_uv.zw + inst_uv.xy;
					pipe_layer = inst_layer;
					pipe_tint = inst_tint;
					pipe_material = inst_material;
					pipe_normal_layer = inst_normal_layer;
				}
			`;
        }
        frag() {
            return `
				vec3 perturb( vec3 normal, vec3 bump, vec3 pos, vec2 uv ) {
					vec3 dpx = dFdx( pos );
					vec3 dpy = dFdy( pos );
					vec2 dux = dFdx( uv );
					vec2 duy = dFdy( uv );
					vec3 px = cross( dpy, normal );
					vec3 py = cross( normal, dpx );
					vec3 tangent = px * dux.x + py * duy.x;
					vec3 bitangent = px * dux.y + py * duy.y;
					float scale = inversesqrt( max( dot( tangent, tangent ), dot( bitangent, bitangent ) ) );
					return normalize( mat3( tangent * scale, bitangent * scale, normal ) * bump );
				}
				float shade( vec3 pos, vec3 normal, vec3 light ) {
					float slope = 1.0 - max( dot( normal, light ), 0.0 );
					vec4 clip = shadow_mat * vec4( pos + normal * ( 0.03 + 0.09 * slope ), 1.0 );
					if( any( greaterThan( abs( clip.xyz ), vec3( 1.0 ) ) ) ) return 1.0;
					vec3 coord = clip.xyz * 0.5 + 0.5;
					coord.z -= 0.0015;
					vec2 texel = 1.0 / vec2( textureSize( shadow_map, 0 ) );
					float sum = 0.0;
					for( int y = -1; y <= 1; ++ y ) {
						for( int x = -1; x <= 1; ++ x ) {
							sum += texture( shadow_map, coord + vec3( vec2( x, y ) * texel, 0.0 ) );
						}
					}
					return sum / 9.0;
				}
				void main() {
					if( wireframe > 0.5 ) {
						color = vec4( 1.0 );
						return;
					}
					vec4 base = texture( atlas, vec3( pipe_uv, pipe_layer ) ) * pipe_tint;
					vec3 normal = normalize( pipe_normal );
					if( pipe_normal_layer >= 0.0 ) {
						vec3 bump = texture( atlas, vec3( pipe_uv, pipe_normal_layer ) ).xyz * 2.0 - 1.0;
						normal = perturb( normal, bump, pipe_pos, pipe_uv );
					}
					vec3 eye = normalize( cam_pos - pipe_pos );
					float metallic = pipe_material.x;
					float roughness = max( pipe_material.y, 0.05 );
					vec3 albedo = base.rgb;
					vec3 f0 = mix( vec3( 0.04 ), albedo, metallic );
					vec3 diffuse = albedo * ( 1.0 - metallic );
					vec3 sum = albedo * ( ambient + pipe_material.z );
					float lit = 1.0;
					if( shadow_light >= 0 ) lit = shade( pipe_pos, normal, - normalize( light_dir[ shadow_light ].xyz ) );
					for( int i = 0; i < 8; ++ i ) {
						if( i < light_count ) {
							vec3 way = light_pos[ i ].xyz - pipe_pos;
							float dist = length( way );
							vec3 aim = normalize( light_dir[ i ].xyz );
							vec3 light = - aim;
							float atten = i == shadow_light ? lit : 1.0;
							if( light_pos[ i ].w > 0.5 ) {
								light = way / max( dist, 0.0001 );
								atten = bog_gamengine_pbr_window( dist, light_color[ i ].w );
								if( light_dir[ i ].w > -0.5 ) atten *= bog_gamengine_pbr_cone( dot( - light, aim ), light_dir[ i ].w );
							}
							float ndl = max( dot( normal, light ), 0.0 );
							if( ndl > 0.0 && atten > 0.0 ) {
								sum += bog_gamengine_pbr_brdf( normal, eye, light, diffuse, f0, roughness ) * light_color[ i ].rgb * ( atten * ndl );
							}
						}
					}
					float haze = fog.y > fog.x ? clamp( ( length( cam_pos - pipe_pos ) - fog.x ) / ( fog.y - fog.x ), 0.0, 1.0 ) : 0.0;
					color = vec4( mix( sum, fog_color * base.a, haze ), base.a );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_solid = $bog_gamengine_shader_solid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_3d_glsl_both += "float bog_gamengine_pbr_ggx( float ndh, float alpha ) {\n\tfloat a2 = alpha * alpha;\n\tfloat d = ndh * ndh * ( a2 - 1.0 ) + 1.0;\n\treturn a2 / max( d * d, 0.0000001 );\n}\n\nfloat bog_gamengine_pbr_smith( float ndl, float ndv, float alpha ) {\n\tfloat a2 = alpha * alpha;\n\tfloat shadowv = ndl * sqrt( ndv * ndv * ( 1.0 - a2 ) + a2 );\n\tfloat shadowl = ndv * sqrt( ndl * ndl * ( 1.0 - a2 ) + a2 );\n\treturn 0.5 / max( shadowv + shadowl, 0.0001 );\n}\n\nvec3 bog_gamengine_pbr_fresnel( vec3 f0, float vdh ) {\n\tfloat fade = pow( 1.0 - vdh, 5.0 );\n\treturn f0 + ( 1.0 - f0 ) * fade;\n}\n\nvec3 bog_gamengine_pbr_brdf( vec3 normal, vec3 eye, vec3 light, vec3 diffuse, vec3 f0, float roughness ) {\n\tvec3 mid = normalize( eye + light );\n\tfloat ndl = max( dot( normal, light ), 0.001 );\n\tfloat ndv = max( dot( normal, eye ), 0.001 );\n\tfloat ndh = max( dot( normal, mid ), 0.0 );\n\tfloat vdh = max( dot( eye, mid ), 0.0 );\n\tfloat alpha = roughness * roughness;\n\tvec3 fresnel = bog_gamengine_pbr_fresnel( f0, vdh );\n\tvec3 spec = fresnel * bog_gamengine_pbr_ggx( ndh, alpha ) * bog_gamengine_pbr_smith( ndl, ndv, alpha );\n\treturn ( 1.0 - fresnel ) * diffuse + spec;\n}\n\nfloat bog_gamengine_pbr_window( float dist, float range ) {\n\tfloat ratio = dist / max( range, 0.0001 );\n\tfloat fade = clamp( 1.0 - ratio * ratio * ratio * ratio, 0.0, 1.0 );\n\treturn fade * fade / max( dist * dist, 0.01 );\n}\n\nfloat bog_gamengine_pbr_cone( float cosine, float edge ) {\n\treturn smoothstep( edge, mix( edge, 1.0, 0.2 ), cosine );\n}\n";
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_solid_plain extends $bog_gamengine_shader {
        face() {
            return {
                glob: {
                    proj: 'mat4',
                    view: 'mat4',
                    light_count: 'int',
                    light_pos: 'vec4[8]',
                    light_dir: 'vec4[8]',
                    light_color: 'vec4[8]',
                    ambient: 'vec3',
                    cam_pos: 'vec3',
                    fog: 'vec2',
                    fog_color: 'vec3',
                    wireframe: 'float',
                },
                input: {
                    vertex: 'vec3',
                    normal: 'vec3',
                    inst_trans: 'mat4',
                    inst_tint: 'vec4',
                    inst_material: 'vec4',
                },
                pipe: {
                    pipe_tint: 'vec4',
                    pipe_normal: 'vec3',
                    pipe_pos: 'vec3',
                    pipe_material: 'vec4',
                },
                output: { color: 'vec4' },
            };
        }
        depth() {
            return true;
        }
        vert() {
            return `
				void main() {
					vec4 world = inst_trans * vec4( vertex, 1.0 );
					gl_Position = proj * view * world;
					if( wireframe > 0.5 ) gl_Position.z -= 0.001;
					pipe_pos = world.xyz;
					pipe_normal = normalize( mat3( inst_trans ) * normal );
					pipe_tint = inst_tint;
					pipe_material = inst_material;
				}
			`;
        }
        frag() {
            return `
				void main() {
					if( wireframe > 0.5 ) {
						color = vec4( 1.0 );
						return;
					}
					vec3 normal = normalize( pipe_normal );
					vec3 eye = normalize( cam_pos - pipe_pos );
					float metallic = pipe_material.x;
					float roughness = max( pipe_material.y, 0.05 );
					vec3 albedo = pipe_tint.rgb;
					vec3 f0 = mix( vec3( 0.04 ), albedo, metallic );
					vec3 diffuse = albedo * ( 1.0 - metallic );
					vec3 sum = albedo * ( ambient + pipe_material.z );
					for( int i = 0; i < 8; ++ i ) {
						if( i < light_count ) {
							vec3 way = light_pos[ i ].xyz - pipe_pos;
							float dist = length( way );
							vec3 aim = normalize( light_dir[ i ].xyz );
							vec3 light = - aim;
							float atten = 1.0;
							if( light_pos[ i ].w > 0.5 ) {
								light = way / max( dist, 0.0001 );
								atten = bog_gamengine_pbr_window( dist, light_color[ i ].w );
								if( light_dir[ i ].w > -0.5 ) atten *= bog_gamengine_pbr_cone( dot( - light, aim ), light_dir[ i ].w );
							}
							float ndl = max( dot( normal, light ), 0.0 );
							if( ndl > 0.0 && atten > 0.0 ) {
								sum += bog_gamengine_pbr_brdf( normal, eye, light, diffuse, f0, roughness ) * light_color[ i ].rgb * ( atten * ndl );
							}
						}
					}
					float haze = fog.y > fog.x ? clamp( ( length( cam_pos - pipe_pos ) - fog.x ) / ( fog.y - fog.x ), 0.0, 1.0 ) : 0.0;
					color = vec4( mix( sum, fog_color * pipe_tint.a, haze ), pipe_tint.a );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_solid_plain = $bog_gamengine_shader_solid_plain;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_shape extends $mol_object {
        geometry() {
            return new Float32Array;
        }
        size() {
            return this.geometry().length / 3;
        }
        skin() {
            return new Float32Array(this.size() * 2);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape.prototype, "geometry", null);
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape.prototype, "skin", null);
    $.$mol_3d_shape = $mol_3d_shape;
    class $mol_3d_shape_triangle extends $mol_3d_shape {
        geometry() {
            return new Float32Array([
                -1, -1, 0,
                +1, -1, 0,
                +0, +1, 0,
            ]);
        }
        skin() {
            return new Float32Array([
                0.0, 1,
                1.0, 1,
                0.5, 0,
            ]);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape_triangle.prototype, "geometry", null);
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape_triangle.prototype, "skin", null);
    $.$mol_3d_shape_triangle = $mol_3d_shape_triangle;
    class $mol_3d_shape_square extends $mol_3d_shape {
        geometry() {
            return new Float32Array([
                -1, -1, 0,
                +1, -1, 0,
                -1, +1, 0,
                +1, +1, 0,
            ]);
        }
        skin() {
            return new Float32Array([
                0, 1,
                1, 1,
                0, 0,
                1, 0,
            ]);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape_square.prototype, "geometry", null);
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape_square.prototype, "skin", null);
    $.$mol_3d_shape_square = $mol_3d_shape_square;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shape extends $mol_3d_shape {
        normals() {
            const size = this.size();
            const normals = new Float32Array(size * 3);
            for (let i = 0; i < size; ++i)
                normals[i * 3 + 2] = 1;
            return normals;
        }
        radius() {
            const geometry = this.geometry();
            let max = 0;
            for (let i = 0; i < geometry.length; i += 3) {
                const len = geometry[i] * geometry[i] + geometry[i + 1] * geometry[i + 1] + geometry[i + 2] * geometry[i + 2];
                if (len > max)
                    max = len;
            }
            return Math.sqrt(max);
        }
        count() {
            return this.size();
        }
        mode() {
            return 'strip';
        }
    }
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape.prototype, "normals", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape.prototype, "radius", null);
    $.$bog_gamengine_shape = $bog_gamengine_shape;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shape_quad extends $bog_gamengine_shape {
        geometry() {
            return new Float32Array([
                -0.5, -0.5, 0,
                +0.5, -0.5, 0,
                -0.5, +0.5, 0,
                +0.5, +0.5, 0,
            ]);
        }
        skin() {
            return new Float32Array([
                0, 1,
                1, 1,
                0, 0,
                1, 0,
            ]);
        }
    }
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_quad.prototype, "geometry", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_quad.prototype, "skin", null);
    $.$bog_gamengine_shape_quad = $bog_gamengine_shape_quad;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_flat extends $bog_gamengine_shader {
        face() {
            return {
                glob: { proj: 'mat4', view: 'mat4' },
                input: { vertex: 'vec3', inst_trans: 'mat4', inst_tint: 'vec4' },
                pipe: { pipe_tint: 'vec4' },
                output: { color: 'vec4' },
            };
        }
        vert() {
            return `
				void main() {
					gl_Position = proj * view * inst_trans * vec4( vertex, 1.0 );
					pipe_tint = inst_tint;
				}
			`;
        }
        frag() {
            return `
				void main() {
					color = pipe_tint;
				}
			`;
        }
    }
    $.$bog_gamengine_shader_flat = $bog_gamengine_shader_flat;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_image extends $mol_object {
        uri() {
            return 'about:blank';
        }
        load() {
            return new Promise((done, fail) => {
                const image = new Image;
                image.src = this.uri();
                image.onload = () => done(image);
                image.onerror = event => fail(event);
            });
        }
        data() {
            $mol_wire_solid();
            try {
                return $mol_wire_sync(this).load();
            }
            catch (error) {
                $mol_fail_log(error);
                return new ImageData(new Uint8ClampedArray(512 * 512 * 4), 512, 512);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_3d_image.prototype, "data", null);
    $.$mol_3d_image = $mol_3d_image;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Starts subtasks concurrently instead of serial. */
    function $mol_wire_race(...tasks) {
        const results = tasks.map(task => {
            try {
                return task();
            }
            catch (error) {
                return error;
            }
        });
        const promises = results.filter(res => $mol_promise_like(res));
        if (promises.length)
            $mol_fail(Promise.race(promises));
        const error = results.find(res => res instanceof Error);
        if (error)
            $mol_fail(error);
        return results;
    }
    $.$mol_wire_race = $mol_wire_race;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_atlas_image extends $mol_3d_image {
        data() {
            $mol_wire_solid();
            return $mol_wire_sync(this).load();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas_image.prototype, "data", null);
    $.$bog_gamengine_atlas_image = $bog_gamengine_atlas_image;
    function $bog_gamengine_atlas_blank(image) {
        return ArrayBuffer.isView(image.data);
    }
    $.$bog_gamengine_atlas_blank = $bog_gamengine_atlas_blank;
    class $bog_gamengine_atlas extends $mol_object2 {
        uris(next = []) {
            return next;
        }
        size(next = 64) {
            return next;
        }
        sources(next = []) {
            return next;
        }
        origins() {
            const uris = this.uris();
            const sources = this.sources();
            const origins = [];
            for (let i = 0; i < uris.length; ++i) {
                origins.push({ name: uris[i].replace(/^.*\//, '').replace(/\.[^.]*$/, ''), from: uris[i] });
            }
            for (let i = 0; i < sources.length; ++i) {
                origins.push({ name: sources[i].name, from: sources[i].name });
            }
            return origins;
        }
        names() {
            const origins = this.origins();
            const names = new Map();
            for (let i = 0; i < origins.length; ++i) {
                const name = origins[i].name;
                const known = names.get(name);
                if (known !== undefined)
                    $mol_fail(new Error(`Atlas layer name ${name} is used twice: ${origins[known].from} and ${origins[i].from}`));
                names.set(name, i);
            }
            return names;
        }
        layer(name) {
            const index = this.names().get(name);
            if (index === undefined)
                return $mol_fail(new Error(`Atlas has no layer ${name}, known: ${[...this.names().keys()].join(', ')}`));
            return index;
        }
        static image(uri) {
            $mol_wire_solid();
            return this.$.$bog_gamengine_atlas_image.make({ uri: () => uri });
        }
        image(uri) {
            return this.constructor.image(uri);
        }
        images() {
            const uris = this.uris();
            const size = this.size();
            const origins = this.origins();
            const loaded = $mol_wire_race(...uris.map(uri => () => this.image(uri).data()));
            const images = [...loaded, ...this.sources().map(source => source.image)];
            for (let i = 0; i < images.length; ++i) {
                if ($bog_gamengine_atlas_blank(images[i]))
                    continue;
                const box = images[i];
                const width = box.width;
                const height = box.height;
                if (width === size && height === size)
                    continue;
                $mol_fail(new Error(`Atlas image ${origins[i].from} is ${width}×${height}, expected ${size}×${size}`));
            }
            return images;
        }
        ready() {
            try {
                const images = this.images();
                for (let i = 0; i < images.length; ++i)
                    if ($bog_gamengine_atlas_blank(images[i]))
                        return false;
                return true;
            }
            catch (error) {
                if ($mol_promise_like(error))
                    return false;
                return $mol_fail_hidden(error);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "uris", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "sources", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "origins", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "names", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "images", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "ready", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_atlas, "image", null);
    $.$bog_gamengine_atlas = $bog_gamengine_atlas;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_cam_frustum_sphere(frustum, x, y, z, radius) {
        for (let side = 0; side < 6; ++side) {
            const at = side * 4;
            if (frustum[at] * x + frustum[at + 1] * y + frustum[at + 2] * z + frustum[at + 3] < -radius)
                return false;
        }
        return true;
    }
    $.$bog_gamengine_cam_frustum_sphere = $bog_gamengine_cam_frustum_sphere;
    function $bog_gamengine_cam_frustum_aabb(frustum, aabb, at) {
        for (let side = 0; side < 6; ++side) {
            const p = side * 4;
            const a = frustum[p];
            const b = frustum[p + 1];
            const c = frustum[p + 2];
            const x = a > 0 ? aabb[at + 3] : aabb[at];
            const y = b > 0 ? aabb[at + 4] : aabb[at + 1];
            const z = c > 0 ? aabb[at + 5] : aabb[at + 2];
            if (a * x + b * y + c * z + frustum[p + 3] < 0)
                return false;
        }
        return true;
    }
    $.$bog_gamengine_cam_frustum_aabb = $bog_gamengine_cam_frustum_aabb;
    class $bog_gamengine_cam extends $bog_gamengine_node {
        aspect(next) {
            return next ?? this.scene()?.aspect() ?? 1;
        }
        view() {
            return this.world().inversed();
        }
        proj(aspect) {
            throw new Error('not implemented');
        }
        clip = new Float32Array(16);
        frustum(aspect, out) {
            const proj = this.proj(aspect);
            const view = this.view();
            const clip = this.clip;
            for (let col = 0; col < 4; ++col) {
                for (let row = 0; row < 4; ++row) {
                    clip[col * 4 + row] =
                        proj[row] * view[col * 4] +
                            proj[4 + row] * view[col * 4 + 1] +
                            proj[8 + row] * view[col * 4 + 2] +
                            proj[12 + row] * view[col * 4 + 3];
                }
            }
            for (let side = 0; side < 6; ++side) {
                const row = side >> 1;
                const sign = side & 1 ? -1 : 1;
                const a = clip[3] + sign * clip[row];
                const b = clip[7] + sign * clip[4 + row];
                const c = clip[11] + sign * clip[8 + row];
                const d = clip[15] + sign * clip[12 + row];
                const len = Math.sqrt(a * a + b * b + c * c) || 1;
                out[side * 4] = a / len;
                out[side * 4 + 1] = b / len;
                out[side * 4 + 2] = c / len;
                out[side * 4 + 3] = d / len;
            }
            return out;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam.prototype, "aspect", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam.prototype, "view", null);
    $.$bog_gamengine_cam = $bog_gamengine_cam;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_batch_scale_max(world) {
        const x = world[0] * world[0] + world[1] * world[1] + world[2] * world[2];
        const y = world[4] * world[4] + world[5] * world[5] + world[6] * world[6];
        const z = world[8] * world[8] + world[9] * world[9] + world[10] * world[10];
        return Math.sqrt(Math.max(x, y, z));
    }
    $.$bog_gamengine_batch_scale_max = $bog_gamengine_batch_scale_max;
    class $bog_gamengine_batch extends $mol_object2 {
        shader(next) {
            return next ?? new $bog_gamengine_shader_flat;
        }
        shape(next) {
            return next ?? new $bog_gamengine_shape_quad;
        }
        atlas(next) {
            return next ?? null;
        }
        nodes(next) {
            return next ?? [];
        }
        source(next) {
            return next ?? null;
        }
        skip(next = 0) {
            return next;
        }
        instances(next = 0) {
            return next;
        }
        cull(next = true) {
            return next;
        }
        near(next = 0) {
            return next;
        }
        far(next = Infinity) {
            return next;
        }
        cap = 0;
        count = 0;
        version = 0;
        trans = new Float32Array(0);
        tint = new Float32Array(0);
        layer = new Float32Array(0);
        uv = new Float32Array(0);
        material = new Float32Array(0);
        normal_layer = new Float32Array(0);
        grow(need) {
            if (need <= this.cap)
                return;
            let cap = Math.max(this.cap, 16);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.trans = new Float32Array(cap * 16);
            this.tint = new Float32Array(cap * 4);
            this.layer = new Float32Array(cap);
            this.uv = new Float32Array(cap * 4);
            this.material = new Float32Array(cap * 4);
            this.normal_layer = new Float32Array(cap);
        }
        fill_plain(count) {
            this.grow(count);
            const trans = this.trans;
            const tint = this.tint;
            const layer = this.layer;
            const uv = this.uv;
            const material = this.material;
            const normal_layer = this.normal_layer;
            for (let i = 0; i < count; ++i) {
                const at = i * 16;
                for (let k = 0; k < 16; ++k)
                    trans[at + k] = 0;
                trans[at] = 1;
                trans[at + 5] = 1;
                trans[at + 10] = 1;
                trans[at + 15] = 1;
                for (let k = 0; k < 4; ++k)
                    tint[i * 4 + k] = 1;
                layer[i] = 0;
                uv[i * 4] = 0;
                uv[i * 4 + 1] = 0;
                uv[i * 4 + 2] = 1;
                uv[i * 4 + 3] = 1;
                material[i * 4] = 0;
                material[i * 4 + 1] = 0.6;
                material[i * 4 + 2] = 0;
                material[i * 4 + 3] = 0;
                normal_layer[i] = -1;
            }
            this.count = count;
            ++this.version;
            return count;
        }
        fill(frustum = null, eye = null) {
            const source = this.source();
            if (source)
                return this.fill_source(source, frustum);
            const instances = this.instances();
            if (instances > 0)
                return this.fill_plain(instances);
            const nodes = this.nodes();
            const cull = frustum && this.cull() ? frustum : null;
            const near = this.near();
            const far = this.far();
            const ranged = eye && (near > 0 || far < Infinity) ? eye : null;
            this.grow(nodes.length);
            const trans = this.trans;
            const tint = this.tint;
            const layer = this.layer;
            const uv = this.uv;
            const material = this.material;
            const normal_layer = this.normal_layer;
            let count = 0;
            for (let i = 0; i < nodes.length; ++i) {
                const node = nodes[i];
                const world = node.world();
                if (ranged) {
                    const dx = world[12] - ranged[0];
                    const dy = world[13] - ranged[1];
                    const dz = world[14] - ranged[2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (dist < near || dist >= far)
                        continue;
                }
                if (cull && typeof node.radius === 'function') {
                    const radius = node.radius() * $bog_gamengine_batch_scale_max(world);
                    if (!$bog_gamengine_cam_frustum_sphere(cull, world[12], world[13], world[14], radius))
                        continue;
                }
                trans.set(world, count * 16);
                if (typeof node.tint === 'function') {
                    tint.set(node.tint(), count * 4);
                }
                else {
                    tint[count * 4] = 1;
                    tint[count * 4 + 1] = 1;
                    tint[count * 4 + 2] = 1;
                    tint[count * 4 + 3] = 1;
                }
                layer[count] = typeof node.layer === 'function' ? node.layer() : 0;
                if (typeof node.uv === 'function') {
                    uv.set(node.uv(), count * 4);
                }
                else {
                    uv[count * 4] = 0;
                    uv[count * 4 + 1] = 0;
                    uv[count * 4 + 2] = 1;
                    uv[count * 4 + 3] = 1;
                }
                if (typeof node.material === 'function') {
                    material.set(node.material(), count * 4);
                }
                else {
                    material[count * 4] = 0;
                    material[count * 4 + 1] = 0.6;
                    material[count * 4 + 2] = 0;
                    material[count * 4 + 3] = 0;
                }
                normal_layer[count] = typeof node.normal_layer === 'function' ? node.normal_layer() : -1;
                ++count;
            }
            this.count = count;
            ++this.version;
            return count;
        }
        fill_source(source, frustum = null) {
            const skip = this.skip();
            const total = Math.max(0, source.count - skip);
            const cap = this.cap;
            this.grow(total);
            if (this.cap !== cap) {
                this.tint.fill(1);
                this.layer.fill(0);
                this.normal_layer.fill(-1);
                const uv = this.uv;
                const material = this.material;
                for (let i = 0; i < this.cap; ++i) {
                    uv[i * 4] = 0;
                    uv[i * 4 + 1] = 0;
                    uv[i * 4 + 2] = 1;
                    uv[i * 4 + 3] = 1;
                    material[i * 4] = 0;
                    material[i * 4 + 1] = 0.6;
                    material[i * 4 + 2] = 0;
                    material[i * 4 + 3] = 0;
                }
            }
            const aabb = source.aabb;
            const cull = frustum && aabb && this.cull() ? frustum : null;
            const tint = source.tint ?? null;
            const layer = source.layer ?? null;
            const uv = source.uv ?? null;
            let count = total;
            if (cull && aabb) {
                const trans = this.trans;
                const from = source.trans;
                count = 0;
                for (let i = skip; i < source.count; ++i) {
                    if (!$bog_gamengine_cam_frustum_aabb(cull, aabb, i * 6))
                        continue;
                    const src = i * 16;
                    const dst = count * 16;
                    for (let k = 0; k < 16; ++k)
                        trans[dst + k] = from[src + k];
                    if (tint)
                        for (let k = 0; k < 4; ++k)
                            this.tint[count * 4 + k] = tint[i * 4 + k];
                    if (layer)
                        this.layer[count] = layer[i];
                    if (uv)
                        for (let k = 0; k < 4; ++k)
                            this.uv[count * 4 + k] = uv[i * 4 + k];
                    ++count;
                }
            }
            else {
                this.trans.set(source.trans.subarray(skip * 16, (skip + total) * 16));
                if (tint)
                    this.tint.set(tint.subarray(skip * 4, (skip + total) * 4));
                if (layer)
                    this.layer.set(layer.subarray(skip, skip + total));
                if (uv)
                    this.uv.set(uv.subarray(skip * 4, (skip + total) * 4));
            }
            this.count = count;
            ++this.version;
            return count;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "shader", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "shape", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "nodes", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "source", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "skip", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "instances", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "cull", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "near", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "far", null);
    $.$bog_gamengine_batch = $bog_gamengine_batch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const group_ids = new WeakMap();
    let group_id_last = 0;
    function $bog_gamengine_batch_group_id(item) {
        if (!item)
            return '0';
        let id = group_ids.get(item);
        if (!id)
            group_ids.set(item, id = String(++group_id_last));
        return id;
    }
    $.$bog_gamengine_batch_group_id = $bog_gamengine_batch_group_id;
    function $bog_gamengine_batch_group(nodes, shader, shape) {
        const parts = new Map();
        for (const node of nodes) {
            const node_shader = shader(node);
            const node_shape = shape(node);
            const atlas = node.atlas();
            const key = $bog_gamengine_batch_group_id(node_shader)
                + ' ' + $bog_gamengine_batch_group_id(node_shape)
                + ' ' + $bog_gamengine_batch_group_id(atlas);
            const part = parts.get(key);
            if (part)
                part.nodes.push(node);
            else
                parts.set(key, { key, shader: node_shader, shape: node_shape, atlas, nodes: [node] });
        }
        return [...parts.values()];
    }
    $.$bog_gamengine_batch_group = $bog_gamengine_batch_group;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys_body extends $bog_gamengine_node {
        static side_down = 1;
        static side_up = 2;
        static side_left = 4;
        static side_right = 8;
        touched = 0;
        on_ground() {
            return (this.touched & $bog_gamengine_phys_body.side_down) !== 0;
        }
        on_ceil() {
            return (this.touched & $bog_gamengine_phys_body.side_up) !== 0;
        }
        on_wall() {
            const body = $bog_gamengine_phys_body;
            return (this.touched & (body.side_left | body.side_right)) !== 0;
        }
        vel(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0, 0]);
        }
        size(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        kind(next) {
            return next ?? 'aabb';
        }
        still(next) {
            return next ?? false;
        }
        ghost(next) {
            return next ?? false;
        }
        props() {
            return [
                ...super.props(),
                { name: 'vel', kind: 'vec3', get: () => this.vel(), set: next => this.vel(next) },
                { name: 'size', kind: 'vec2', get: () => this.size(), set: next => this.size(next) },
                { name: 'kind', kind: 'text', get: () => this.kind(), set: next => this.kind(next) },
                { name: 'still', kind: 'flag', get: () => this.still(), set: next => this.still(next) },
                { name: 'ghost', kind: 'flag', get: () => this.ghost(), set: next => this.ghost(next) },
            ];
        }
        hit(other, normal) { }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_body.prototype, "vel", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_body.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_body.prototype, "kind", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_body.prototype, "still", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_body.prototype, "ghost", null);
    $.$bog_gamengine_phys_body = $bog_gamengine_phys_body;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys_tile extends $mol_object2 {
        map(next) {
            return next ?? '';
        }
        solid(next) {
            return next ?? '#';
        }
        rows() {
            return this.map().split('\n').map(row => [...row]);
        }
        width() {
            const rows = this.rows();
            let width = 0;
            for (let i = 0; i < rows.length; ++i)
                width = Math.max(width, rows[i].length);
            return width;
        }
        height() {
            return this.rows().length;
        }
        cell(x, y) {
            const rows = this.rows();
            if (y < 0 || y >= rows.length)
                return true;
            const row = rows[y];
            if (x < 0 || x >= row.length)
                return true;
            return this.solid().includes(row[x]);
        }
        char(x, y) {
            const rows = this.rows();
            if (y < 0 || y >= rows.length)
                return '';
            const row = rows[y];
            if (x < 0 || x >= row.length)
                return '';
            return row[x];
        }
        spots(char) {
            const rows = this.rows();
            const spots = [];
            for (let y = 0; y < rows.length; ++y) {
                const row = rows[y];
                for (let x = 0; x < row.length; ++x) {
                    if (row[x] === char)
                        spots.push([x, y]);
                }
            }
            return spots;
        }
        chars() {
            const rows = this.rows();
            const chars = new Set();
            for (let y = 0; y < rows.length; ++y) {
                const row = rows[y];
                for (let x = 0; x < row.length; ++x)
                    chars.add(row[x]);
            }
            return chars;
        }
        cell_pos(x, y, out) {
            out[0] = x + 0.5;
            out[1] = -y - 0.5;
            out[2] = 0;
            return out;
        }
        cell_at(wx, wy, out) {
            out[0] = Math.floor(wx);
            out[1] = Math.floor(-wy);
            return out;
        }
        at = new Int32Array(2);
        solid_at(wx, wy) {
            const at = this.cell_at(wx, wy, this.at);
            return this.cell(at[0], at[1]);
        }
        ahead(wx, wy, dx, dy, dist) {
            const at = this.cell_at(wx + dx * dist, wy + dy * dist, this.at);
            return this.char(at[0], at[1]);
        }
        edge(wx, wy, dx, dy) {
            const at = this.cell_at(wx + dx, wy + dy, this.at);
            if (this.cell(at[0], at[1]))
                return false;
            return !this.cell(at[0], at[1] + 1);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "map", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "solid", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "rows", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "width", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "height", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_phys_tile.prototype, "spots", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "chars", null);
    $.$bog_gamengine_phys_tile = $bog_gamengine_phys_tile;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys extends $mol_object2 {
        static stat_window = 30;
        bodies(next) {
            return next ?? [];
        }
        tile(next) {
            return next ?? null;
        }
        gravity(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0]);
        }
        pull() {
            this.bodies();
            this.tile();
            this.gravity();
        }
        eps = 1e-4;
        normal = new Float32Array(2);
        times = new Float32Array($bog_gamengine_phys.stat_window);
        samples = 0;
        step(dt) {
            const window = $bog_gamengine_phys.stat_window;
            const start = performance.now();
            this.step_world(dt);
            this.times[this.samples % window] = performance.now() - start;
            ++this.samples;
        }
        step_ms() {
            const size = Math.min(this.samples, $bog_gamengine_phys.stat_window);
            let sum = 0;
            for (let i = 0; i < size; ++i)
                sum += this.times[i];
            return size ? sum / size : 0;
        }
        step_world(dt) {
            const bodies = this.bodies();
            const tile = this.tile();
            const gravity = this.gravity();
            const gx = gravity[0] * dt;
            const gy = gravity[1] * dt;
            for (let i = 0; i < bodies.length; ++i) {
                const body = bodies[i];
                body.touched = 0;
                if (body.still())
                    continue;
                const ghost = body.ghost();
                if (!ghost && (gx !== 0 || gy !== 0))
                    this.fall(body, gx, gy);
                this.move(body, ghost ? null : tile, dt);
            }
            for (let i = 0; i < bodies.length; ++i) {
                for (let j = i + 1; j < bodies.length; ++j)
                    this.touch(bodies[i], bodies[j]);
            }
        }
        fall(body, gx, gy) {
            const vel = body.vel();
            const next = new Float32Array(3);
            next[0] = vel[0] + gx;
            next[1] = vel[1] + gy;
            next[2] = vel[2];
            body.vel(next);
        }
        move(body, tile, dt) {
            const pos = body.pos();
            const vel = body.vel();
            const size = body.size();
            const hw = size[0] / 2;
            const hh = body.kind() === 'circle' ? hw : size[1] / 2;
            const eps = this.eps;
            const side = $bog_gamengine_phys_body;
            let x = pos[0] + vel[0] * dt;
            let y = pos[1];
            let vx = vel[0];
            let vy = vel[1];
            let hit = false;
            let nx = 0;
            let ny = 0;
            if (tile) {
                const ry0 = Math.floor(-(y + hh) + eps);
                const ry1 = Math.floor(-(y - hh) - eps);
                if (vx >= 0) {
                    const cx = Math.floor(x + hw);
                    if (this.col_solid(tile, cx, ry0, ry1)) {
                        body.touched |= side.side_right;
                        const at = cx - hw;
                        if (at !== x || vx !== 0) {
                            x = at;
                            vx = 0;
                            nx = -1;
                            hit = true;
                        }
                    }
                }
                if (vx <= 0) {
                    const cx = Math.floor(x - hw);
                    if (this.col_solid(tile, cx, ry0, ry1)) {
                        body.touched |= side.side_left;
                        const at = cx + 1 + hw;
                        if (at !== x || vx !== 0) {
                            x = at;
                            vx = 0;
                            nx = 1;
                            hit = true;
                        }
                    }
                }
            }
            y = pos[1] + vy * dt;
            if (tile) {
                const cx0 = Math.floor(x - hw + eps);
                const cx1 = Math.floor(x + hw - eps);
                if (vy >= 0) {
                    const cy = Math.floor(-(y + hh));
                    if (this.row_solid(tile, cy, cx0, cx1)) {
                        body.touched |= side.side_up;
                        const at = -cy - 1 - hh;
                        if (at !== y || vy !== 0) {
                            y = at;
                            vy = 0;
                            ny = -1;
                            hit = true;
                        }
                    }
                }
                if (vy <= 0) {
                    const cy = Math.floor(-(y - hh));
                    if (this.row_solid(tile, cy, cx0, cx1)) {
                        body.touched |= side.side_down;
                        const at = -cy + hh;
                        if (at !== y || vy !== 0) {
                            y = at;
                            vy = 0;
                            ny = 1;
                            hit = true;
                        }
                    }
                }
            }
            const next = new Float32Array(3);
            next[0] = x;
            next[1] = y;
            next[2] = pos[2];
            body.pos(next);
            const back = body.pos();
            if (back[0] !== next[0] || back[1] !== next[1]) {
                $mol_fail(new Error(`${body.title()}: pos is read-only, declare it as \`pos? <=>\``));
            }
            if (!hit)
                return;
            const next_vel = new Float32Array(3);
            next_vel[0] = vx;
            next_vel[1] = vy;
            next_vel[2] = vel[2];
            body.vel(next_vel);
            const normal = this.normal;
            const len = Math.sqrt(nx * nx + ny * ny);
            normal[0] = len === 0 ? 0 : nx / len;
            normal[1] = len === 0 ? 0 : ny / len;
            body.hit(null, normal);
        }
        col_solid(tile, cx, cy0, cy1) {
            for (let cy = cy0; cy <= cy1; ++cy)
                if (tile.cell(cx, cy))
                    return true;
            return false;
        }
        row_solid(tile, cy, cx0, cx1) {
            for (let cx = cx0; cx <= cx1; ++cx)
                if (tile.cell(cx, cy))
                    return true;
            return false;
        }
        touch(a, b) {
            const a_still = a.still();
            const b_still = b.still();
            if (a_still && b_still)
                return;
            const ap = a.pos();
            const bp = b.pos();
            const as = a.size();
            const bs = b.size();
            const dx = bp[0] - ap[0];
            const dy = bp[1] - ap[1];
            let px = 0;
            let py = 0;
            if (a.kind() === 'circle' && b.kind() === 'circle') {
                const r = (as[0] + bs[0]) / 2;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d >= r)
                    return;
                if (d === 0) {
                    px = r;
                }
                else {
                    px = (r - d) * dx / d;
                    py = (r - d) * dy / d;
                }
            }
            else {
                const ahw = as[0] / 2;
                const ahh = a.kind() === 'circle' ? ahw : as[1] / 2;
                const bhw = bs[0] / 2;
                const bhh = b.kind() === 'circle' ? bhw : bs[1] / 2;
                const ox = ahw + bhw - Math.abs(dx);
                const oy = ahh + bhh - Math.abs(dy);
                if (ox <= 0 || oy <= 0)
                    return;
                if (ox <= oy)
                    px = dx < 0 ? -ox : ox;
                else
                    py = dy < 0 ? -oy : oy;
            }
            if (!a.ghost() && !b.ghost())
                this.push(a, b, px, py);
            const normal = this.normal;
            const len = Math.sqrt(px * px + py * py);
            normal[0] = len === 0 ? 0 : -px / len;
            normal[1] = len === 0 ? 0 : -py / len;
            a.hit(b, normal);
            normal[0] = -normal[0];
            normal[1] = -normal[1];
            b.hit(a, normal);
        }
        push(a, b, px, py) {
            if (a.still()) {
                this.shift(b, px, py, true);
            }
            else if (b.still()) {
                this.shift(a, -px, -py, true);
            }
            else {
                this.shift(a, -px / 2, -py / 2, false);
                this.shift(b, px / 2, py / 2, false);
            }
        }
        shift(body, sx, sy, stop) {
            const side = $bog_gamengine_phys_body;
            if (sx > 0)
                body.touched |= side.side_left;
            else if (sx < 0)
                body.touched |= side.side_right;
            if (sy > 0)
                body.touched |= side.side_down;
            else if (sy < 0)
                body.touched |= side.side_up;
            const pos = body.pos();
            const next = new Float32Array(3);
            next[0] = pos[0] + sx;
            next[1] = pos[1] + sy;
            next[2] = pos[2];
            body.pos(next);
            if (!stop)
                return;
            const vel = body.vel();
            const len = Math.sqrt(sx * sx + sy * sy);
            if (len === 0)
                return;
            const nx = sx / len;
            const ny = sy / len;
            const into = vel[0] * nx + vel[1] * ny;
            if (into >= 0)
                return;
            const next_vel = new Float32Array(3);
            next_vel[0] = vel[0] - into * nx;
            next_vel[1] = vel[1] - into * ny;
            next_vel[2] = vel[2];
            body.vel(next_vel);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys.prototype, "bodies", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys.prototype, "tile", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys.prototype, "gravity", null);
    $.$bog_gamengine_phys = $bog_gamengine_phys;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3_broad extends $mol_object2 {
        static shape_plane = 3;
        static flag_sleep = 1;
        static flag_kinematic = 4;
        pairs = new Uint32Array(0);
        pair_count = 0;
        order = new Uint32Array(0);
        order_len = 0;
        find(world) {
            this.pair_count = 0;
            this.order_sync(world.count);
            this.order_sort(world.aabb);
            this.sweep(world);
            this.planes(world);
            return this.pair_count;
        }
        order_sync(count) {
            if (this.order.length < count) {
                let len = Math.max(this.order.length, 16);
                while (len < count)
                    len *= 2;
                const next = new Uint32Array(len);
                next.set(this.order.subarray(0, this.order_len));
                this.order = next;
            }
            const order = this.order;
            let len = this.order_len;
            if (count < len) {
                let w = 0;
                for (let r = 0; r < len; ++r) {
                    if (order[r] < count)
                        order[w++] = order[r];
                }
                len = w;
            }
            while (len < count) {
                order[len] = len;
                ++len;
            }
            this.order_len = len;
        }
        order_sort(aabb) {
            const order = this.order;
            const len = this.order_len;
            for (let a = 1; a < len; ++a) {
                const i = order[a];
                const key = aabb[i * 6];
                let b = a - 1;
                while (b >= 0 && aabb[order[b] * 6] > key) {
                    order[b + 1] = order[b];
                    --b;
                }
                order[b + 1] = i;
            }
        }
        sweep(world) {
            const order = this.order;
            const len = this.order_len;
            const aabb = world.aabb, inv_mass = world.inv_mass, flags = world.flags, shape = world.shape;
            const plane = $bog_gamengine_phys3_broad.shape_plane;
            const sleep = $bog_gamengine_phys3_broad.flag_sleep;
            const kind = $bog_gamengine_phys3_broad.flag_kinematic;
            for (let a = 0; a < len; ++a) {
                const i = order[a];
                if (shape[i] === plane)
                    continue;
                const i6 = i * 6;
                const max_x = aabb[i6 + 3];
                const min_y = aabb[i6 + 1], max_y = aabb[i6 + 4];
                const min_z = aabb[i6 + 2], max_z = aabb[i6 + 5];
                const active_i = (inv_mass[i] > 0 || (flags[i] & kind) !== 0) && !(flags[i] & sleep);
                for (let b = a + 1; b < len; ++b) {
                    const j = order[b];
                    const j6 = j * 6;
                    if (aabb[j6] > max_x)
                        break;
                    if (shape[j] === plane)
                        continue;
                    if (!active_i && !((inv_mass[j] > 0 || (flags[j] & kind) !== 0) && !(flags[j] & sleep)))
                        continue;
                    if (aabb[j6 + 1] > max_y || aabb[j6 + 4] < min_y)
                        continue;
                    if (aabb[j6 + 2] > max_z || aabb[j6 + 5] < min_z)
                        continue;
                    this.push(i, j);
                }
            }
        }
        planes(world) {
            const count = world.count;
            const inv_mass = world.inv_mass, flags = world.flags, shape = world.shape;
            const plane = $bog_gamengine_phys3_broad.shape_plane;
            const sleep = $bog_gamengine_phys3_broad.flag_sleep;
            for (let i = 0; i < count; ++i) {
                if (shape[i] !== plane || inv_mass[i] > 0)
                    continue;
                for (let j = 0; j < count; ++j) {
                    if (!(inv_mass[j] > 0) || flags[j] & sleep)
                        continue;
                    this.push(i, j);
                }
            }
        }
        push(i, j) {
            const at = this.pair_count * 2;
            if (at + 2 > this.pairs.length) {
                const next = new Uint32Array(Math.max(64, this.pairs.length * 2));
                next.set(this.pairs);
                this.pairs = next;
            }
            const pairs = this.pairs;
            if (i < j) {
                pairs[at] = i;
                pairs[at + 1] = j;
            }
            else {
                pairs[at] = j;
                pairs[at + 1] = i;
            }
            ++this.pair_count;
        }
    }
    $.$bog_gamengine_phys3_broad = $bog_gamengine_phys3_broad;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const vert_cap = 128;
    const face_cap = 256;
    class $bog_gamengine_phys3_narrow extends $mol_object2 {
        contact_cap = 0;
        contact_count = 0;
        contact_a = new Uint32Array(0);
        contact_b = new Uint32Array(0);
        contact_point = new Float32Array(0);
        contact_normal = new Float32Array(0);
        contact_depth = new Float32Array(0);
        world = {};
        pair_a = 0;
        pair_b = 0;
        flip = false;
        pa = new Float32Array(3);
        pb = new Float32Array(3);
        qa = new Float32Array(4);
        qb = new Float32Array(4);
        ua = new Float32Array(9);
        ub = new Float32Array(9);
        pn = new Float32Array(3);
        axis = new Float32Array(3);
        dir = new Float32Array(3);
        tmp = new Float32Array(3);
        sup = new Float32Array(3);
        sup_local = new Float32Array(3);
        cand_count = 0;
        cand_depth = new Float32Array(4);
        cand_point = new Float32Array(12);
        poly_count = 0;
        poly = new Float32Array(48);
        poly_next = new Float32Array(48);
        si = new Int32Array(4);
        sn = 0;
        ev_count = 0;
        ev = new Float32Array(vert_cap * 3);
        eva = new Float32Array(vert_cap * 3);
        evb = new Float32Array(vert_cap * 3);
        ef_count = 0;
        ef = new Int32Array(face_cap * 3);
        efn = new Float32Array(face_cap * 3);
        efd = new Float32Array(face_cap);
        eh_count = 0;
        eh = new Int32Array(face_cap * 6);
        ec = new Float32Array(3);
        grow(need) {
            if (need <= this.contact_cap)
                return;
            let cap = Math.max(this.contact_cap, 64);
            while (cap < need)
                cap *= 2;
            this.contact_cap = cap;
            const a = new Uint32Array(cap);
            a.set(this.contact_a);
            this.contact_a = a;
            const b = new Uint32Array(cap);
            b.set(this.contact_b);
            this.contact_b = b;
            const point = new Float32Array(cap * 3);
            point.set(this.contact_point);
            this.contact_point = point;
            const normal = new Float32Array(cap * 3);
            normal.set(this.contact_normal);
            this.contact_normal = normal;
            const depth = new Float32Array(cap);
            depth.set(this.contact_depth);
            this.contact_depth = depth;
        }
        collide(world, pairs, pair_count) {
            this.world = world;
            this.contact_count = 0;
            const shape = world.shape;
            const sphere = $bog_gamengine_phys3.shape_sphere;
            const box = $bog_gamengine_phys3.shape_box;
            const capsule = $bog_gamengine_phys3.shape_capsule;
            const plane = $bog_gamengine_phys3.shape_plane;
            const hull = $bog_gamengine_phys3.shape_hull;
            for (let p = 0; p < pair_count; ++p) {
                let a = pairs[p * 2], b = pairs[p * 2 + 1];
                let sa = shape[a], sb = shape[b];
                this.flip = sa > sb;
                if (this.flip) {
                    const t = a;
                    a = b;
                    b = t;
                    const s = sa;
                    sa = sb;
                    sb = s;
                }
                this.pair_a = a;
                this.pair_b = b;
                this.load(a, this.pa, this.qa);
                this.load(b, this.pb, this.qb);
                if (sa === sphere) {
                    if (sb === sphere)
                        this.sphere_sphere();
                    else if (sb === box)
                        this.sphere_box();
                    else if (sb === capsule)
                        this.sphere_capsule();
                    else if (sb === plane)
                        this.sphere_plane();
                    else
                        this.gjk_epa();
                }
                else if (sa === box) {
                    if (sb === box)
                        this.box_box();
                    else if (sb === plane)
                        this.box_plane();
                    else
                        this.gjk_epa();
                }
                else if (sa === capsule) {
                    if (sb === capsule)
                        this.capsule_capsule();
                    else if (sb === plane)
                        this.capsule_plane();
                    else
                        this.gjk_epa();
                }
                else if (sa === plane) {
                    if (sb === hull)
                        this.plane_hull();
                }
                else
                    this.gjk_epa();
            }
            return this.contact_count;
        }
        load(i, c, q) {
            const world = this.world;
            c[0] = world.pos[i * 3];
            c[1] = world.pos[i * 3 + 1];
            c[2] = world.pos[i * 3 + 2];
            q[0] = world.rot[i * 4];
            q[1] = world.rot[i * 4 + 1];
            q[2] = world.rot[i * 4 + 2];
            q[3] = world.rot[i * 4 + 3];
        }
        emit(px, py, pz, nx, ny, nz, depth) {
            const k = this.contact_count;
            this.grow(k + 1);
            this.contact_count = k + 1;
            if (this.flip) {
                this.contact_a[k] = this.pair_b;
                this.contact_b[k] = this.pair_a;
                nx = -nx;
                ny = -ny;
                nz = -nz;
            }
            else {
                this.contact_a[k] = this.pair_a;
                this.contact_b[k] = this.pair_b;
            }
            this.contact_point[k * 3] = px;
            this.contact_point[k * 3 + 1] = py;
            this.contact_point[k * 3 + 2] = pz;
            this.contact_normal[k * 3] = nx;
            this.contact_normal[k * 3 + 1] = ny;
            this.contact_normal[k * 3 + 2] = nz;
            this.contact_depth[k] = depth;
        }
        cand_push(px, py, pz, depth) {
            let k = this.cand_count;
            const cand_depth = this.cand_depth;
            if (k < 4) {
                this.cand_count = k + 1;
            }
            else {
                k = 0;
                for (let m = 1; m < 4; ++m)
                    if (cand_depth[m] < cand_depth[k])
                        k = m;
                if (depth <= cand_depth[k])
                    return;
            }
            cand_depth[k] = depth;
            this.cand_point[k * 3] = px;
            this.cand_point[k * 3 + 1] = py;
            this.cand_point[k * 3 + 2] = pz;
        }
        cand_flush(nx, ny, nz) {
            const point = this.cand_point, depth = this.cand_depth;
            for (let k = 0; k < this.cand_count; ++k) {
                this.emit(point[k * 3], point[k * 3 + 1], point[k * 3 + 2], nx, ny, nz, depth[k]);
            }
            this.cand_count = 0;
        }
        rot_apply(out, q, vx, vy, vz) {
            const qx = q[0], qy = q[1], qz = q[2], qw = q[3];
            const tx = 2 * (qy * vz - qz * vy);
            const ty = 2 * (qz * vx - qx * vz);
            const tz = 2 * (qx * vy - qy * vx);
            out[0] = vx + qw * tx + qy * tz - qz * ty;
            out[1] = vy + qw * ty + qz * tx - qx * tz;
            out[2] = vz + qw * tz + qx * ty - qy * tx;
            return out;
        }
        rot_unapply(out, q, vx, vy, vz) {
            const qx = -q[0], qy = -q[1], qz = -q[2], qw = q[3];
            const tx = 2 * (qy * vz - qz * vy);
            const ty = 2 * (qz * vx - qx * vz);
            const tz = 2 * (qx * vy - qy * vx);
            out[0] = vx + qw * tx + qy * tz - qz * ty;
            out[1] = vy + qw * ty + qz * tx - qx * tz;
            out[2] = vz + qw * tz + qx * ty - qy * tx;
            return out;
        }
        axes(out, q) {
            const x = q[0], y = q[1], z = q[2], w = q[3];
            const xx = x * x, yy = y * y, zz = z * z;
            const xy = x * y, xz = x * z, yz = y * z;
            const wx = w * x, wy = w * y, wz = w * z;
            out[0] = 1 - 2 * (yy + zz);
            out[1] = 2 * (xy + wz);
            out[2] = 2 * (xz - wy);
            out[3] = 2 * (xy - wz);
            out[4] = 1 - 2 * (xx + zz);
            out[5] = 2 * (yz + wx);
            out[6] = 2 * (xz + wy);
            out[7] = 2 * (yz - wx);
            out[8] = 1 - 2 * (xx + yy);
            return out;
        }
        plane_normal(i, q, out) {
            const size = this.world.size;
            this.rot_apply(out, q, size[i * 3], size[i * 3 + 1], size[i * 3 + 2]);
            const len = Math.sqrt(out[0] * out[0] + out[1] * out[1] + out[2] * out[2]);
            const k = len > 0 ? 1 / len : 0;
            out[0] *= k;
            out[1] *= k;
            out[2] *= k;
            return out;
        }
        sphere_sphere() {
            const size = this.world.size;
            const pa = this.pa, pb = this.pb;
            const ra = size[this.pair_a * 3], rb = size[this.pair_b * 3];
            this.sphere_pair(pa[0], pa[1], pa[2], ra, pb[0], pb[1], pb[2], rb);
        }
        sphere_pair(ax, ay, az, ra, bx, by, bz, rb) {
            const dx = bx - ax, dy = by - ay, dz = bz - az;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const depth = ra + rb - dist;
            if (depth < 0)
                return;
            let nx = 0, ny = 1, nz = 0;
            if (dist > 0) {
                nx = dx / dist;
                ny = dy / dist;
                nz = dz / dist;
            }
            const k = ra - depth / 2;
            this.emit(ax + nx * k, ay + ny * k, az + nz * k, nx, ny, nz, depth);
        }
        sphere_plane() {
            const size = this.world.size;
            const pa = this.pa, pb = this.pb;
            const n = this.plane_normal(this.pair_b, this.qb, this.pn);
            const r = size[this.pair_a * 3];
            this.sphere_plane_point(pa[0], pa[1], pa[2], r, pb, n);
        }
        sphere_plane_point(cx, cy, cz, r, p, n) {
            const d = (cx - p[0]) * n[0] + (cy - p[1]) * n[1] + (cz - p[2]) * n[2];
            const depth = r - d;
            if (depth < 0)
                return;
            const k = (d + r) / 2;
            this.emit(cx - n[0] * k, cy - n[1] * k, cz - n[2] * k, -n[0], -n[1], -n[2], depth);
        }
        box_plane() {
            const size = this.world.size;
            const a = this.pair_a;
            const pa = this.pa, pb = this.pb, u = this.axes(this.ua, this.qa);
            const n = this.plane_normal(this.pair_b, this.qb, this.pn);
            const h0 = size[a * 3], h1 = size[a * 3 + 1], h2 = size[a * 3 + 2];
            for (let s = 0; s < 8; ++s) {
                const s0 = s & 1 ? h0 : -h0;
                const s1 = s & 2 ? h1 : -h1;
                const s2 = s & 4 ? h2 : -h2;
                const vx = pa[0] + s0 * u[0] + s1 * u[3] + s2 * u[6];
                const vy = pa[1] + s0 * u[1] + s1 * u[4] + s2 * u[7];
                const vz = pa[2] + s0 * u[2] + s1 * u[5] + s2 * u[8];
                const d = (vx - pb[0]) * n[0] + (vy - pb[1]) * n[1] + (vz - pb[2]) * n[2];
                if (d > 0)
                    continue;
                this.cand_push(vx - n[0] * d / 2, vy - n[1] * d / 2, vz - n[2] * d / 2, -d);
            }
            this.cand_flush(-n[0], -n[1], -n[2]);
        }
        capsule_plane() {
            const size = this.world.size;
            const a = this.pair_a;
            const pa = this.pa, pb = this.pb;
            const n = this.plane_normal(this.pair_b, this.qb, this.pn);
            const r = size[a * 3], h = size[a * 3 + 1];
            const axis = this.rot_apply(this.axis, this.qa, 0, h, 0);
            this.sphere_plane_point(pa[0] + axis[0], pa[1] + axis[1], pa[2] + axis[2], r, pb, n);
            this.sphere_plane_point(pa[0] - axis[0], pa[1] - axis[1], pa[2] - axis[2], r, pb, n);
        }
        plane_hull() {
            const world = this.world;
            const b = this.pair_b;
            const pa = this.pa, pb = this.pb, qb = this.qb, v = this.tmp;
            const n = this.plane_normal(this.pair_a, this.qa, this.pn);
            const hull = world.hull, off = world.hull_off[b], count = world.hull_count[b];
            for (let k = 0; k < count; ++k) {
                this.rot_apply(v, qb, hull[off + k * 3], hull[off + k * 3 + 1], hull[off + k * 3 + 2]);
                const vx = pb[0] + v[0], vy = pb[1] + v[1], vz = pb[2] + v[2];
                const d = (vx - pa[0]) * n[0] + (vy - pa[1]) * n[1] + (vz - pa[2]) * n[2];
                if (d > 0)
                    continue;
                this.cand_push(vx - n[0] * d / 2, vy - n[1] * d / 2, vz - n[2] * d / 2, -d);
            }
            this.cand_flush(n[0], n[1], n[2]);
        }
        sphere_box() {
            const size = this.world.size;
            const a = this.pair_a, b = this.pair_b;
            const pa = this.pa, pb = this.pb, qb = this.qb;
            const l = this.rot_unapply(this.tmp, qb, pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]);
            const hx = size[b * 3], hy = size[b * 3 + 1], hz = size[b * 3 + 2];
            const r = size[a * 3];
            let cx = l[0] < -hx ? -hx : l[0] > hx ? hx : l[0];
            let cy = l[1] < -hy ? -hy : l[1] > hy ? hy : l[1];
            let cz = l[2] < -hz ? -hz : l[2] > hz ? hz : l[2];
            let dx = l[0] - cx, dy = l[1] - cy, dz = l[2] - cz;
            const dist2 = dx * dx + dy * dy + dz * dz;
            if (dist2 > r * r)
                return;
            let depth = 0;
            if (dist2 > 1e-12) {
                const dist = Math.sqrt(dist2);
                dx /= dist;
                dy /= dist;
                dz /= dist;
                depth = r - dist;
            }
            else {
                const gx = hx - Math.abs(l[0]), gy = hy - Math.abs(l[1]), gz = hz - Math.abs(l[2]);
                dx = 0;
                dy = 0;
                dz = 0;
                if (gx <= gy && gx <= gz) {
                    dx = l[0] < 0 ? -1 : 1;
                    cx = dx * hx;
                    depth = r + gx;
                }
                else if (gy <= gz) {
                    dy = l[1] < 0 ? -1 : 1;
                    cy = dy * hy;
                    depth = r + gy;
                }
                else {
                    dz = l[2] < 0 ? -1 : 1;
                    cz = dz * hz;
                    depth = r + gz;
                }
            }
            const n = this.rot_apply(this.pn, qb, dx, dy, dz);
            const s = this.rot_apply(this.sup, qb, cx, cy, cz);
            this.emit(pb[0] + s[0] - n[0] * depth / 2, pb[1] + s[1] - n[1] * depth / 2, pb[2] + s[2] - n[2] * depth / 2, -n[0], -n[1], -n[2], depth);
        }
        sphere_capsule() {
            const size = this.world.size;
            const a = this.pair_a, b = this.pair_b;
            const pa = this.pa, pb = this.pb;
            const ra = size[a * 3], rb = size[b * 3], h = size[b * 3 + 1];
            const axis = this.rot_apply(this.axis, this.qb, 0, 1, 0);
            let t = (pa[0] - pb[0]) * axis[0] + (pa[1] - pb[1]) * axis[1] + (pa[2] - pb[2]) * axis[2];
            t = t < -h ? -h : t > h ? h : t;
            this.sphere_pair(pa[0], pa[1], pa[2], ra, pb[0] + axis[0] * t, pb[1] + axis[1] * t, pb[2] + axis[2] * t, rb);
        }
        capsule_capsule() {
            const size = this.world.size;
            const a = this.pair_a, b = this.pair_b;
            const pa = this.pa, pb = this.pb;
            const ra = size[a * 3], ha = size[a * 3 + 1];
            const rb = size[b * 3], hb = size[b * 3 + 1];
            const d1 = this.rot_apply(this.axis, this.qa, 0, 2 * ha, 0);
            const d2 = this.rot_apply(this.tmp, this.qb, 0, 2 * hb, 0);
            const p1x = pa[0] - d1[0] / 2, p1y = pa[1] - d1[1] / 2, p1z = pa[2] - d1[2] / 2;
            const p2x = pb[0] - d2[0] / 2, p2y = pb[1] - d2[1] / 2, p2z = pb[2] - d2[2] / 2;
            const rx = p1x - p2x, ry = p1y - p2y, rz = p1z - p2z;
            const aa = d1[0] * d1[0] + d1[1] * d1[1] + d1[2] * d1[2];
            const ee = d2[0] * d2[0] + d2[1] * d2[1] + d2[2] * d2[2];
            const f = d2[0] * rx + d2[1] * ry + d2[2] * rz;
            let s = 0, t = 0;
            const eps = 1e-12;
            if (aa <= eps && ee <= eps) {
            }
            else if (aa <= eps) {
                t = f / ee;
                t = t < 0 ? 0 : t > 1 ? 1 : t;
            }
            else {
                const c = d1[0] * rx + d1[1] * ry + d1[2] * rz;
                if (ee <= eps) {
                    s = -c / aa;
                    s = s < 0 ? 0 : s > 1 ? 1 : s;
                }
                else {
                    const bb = d1[0] * d2[0] + d1[1] * d2[1] + d1[2] * d2[2];
                    const denom = aa * ee - bb * bb;
                    if (denom !== 0) {
                        s = (bb * f - c * ee) / denom;
                        s = s < 0 ? 0 : s > 1 ? 1 : s;
                    }
                    t = (bb * s + f) / ee;
                    if (t < 0) {
                        t = 0;
                        s = -c / aa;
                        s = s < 0 ? 0 : s > 1 ? 1 : s;
                    }
                    else if (t > 1) {
                        t = 1;
                        s = (bb - c) / aa;
                        s = s < 0 ? 0 : s > 1 ? 1 : s;
                    }
                }
            }
            this.sphere_pair(p1x + d1[0] * s, p1y + d1[1] * s, p1z + d1[2] * s, ra, p2x + d2[0] * t, p2y + d2[1] * t, p2z + d2[2] * t, rb);
        }
        box_box() {
            const size = this.world.size;
            const a = this.pair_a, b = this.pair_b;
            const pa = this.pa, pb = this.pb;
            const ua = this.axes(this.ua, this.qa), ub = this.axes(this.ub, this.qb);
            const ha0 = size[a * 3], ha1 = size[a * 3 + 1], ha2 = size[a * 3 + 2];
            const hb0 = size[b * 3], hb1 = size[b * 3 + 1], hb2 = size[b * 3 + 2];
            const dx = pb[0] - pa[0], dy = pb[1] - pa[1], dz = pb[2] - pa[2];
            const dir = this.dir;
            let best = Infinity, best_over = 0, best_axis = -1;
            for (let k = 0; k < 15; ++k) {
                let lx = 0, ly = 0, lz = 0;
                if (k < 3) {
                    lx = ua[k * 3];
                    ly = ua[k * 3 + 1];
                    lz = ua[k * 3 + 2];
                }
                else if (k < 6) {
                    lx = ub[(k - 3) * 3];
                    ly = ub[(k - 3) * 3 + 1];
                    lz = ub[(k - 3) * 3 + 2];
                }
                else {
                    const i = ((k - 6) / 3 | 0) * 3, j = ((k - 6) % 3) * 3;
                    const ax = ua[i], ay = ua[i + 1], az = ua[i + 2];
                    const bx = ub[j], by = ub[j + 1], bz = ub[j + 2];
                    lx = ay * bz - az * by;
                    ly = az * bx - ax * bz;
                    lz = ax * by - ay * bx;
                    const len2 = lx * lx + ly * ly + lz * lz;
                    if (len2 < 1e-8)
                        continue;
                    const inv = 1 / Math.sqrt(len2);
                    lx *= inv;
                    ly *= inv;
                    lz *= inv;
                }
                const ra = ha0 * Math.abs(ua[0] * lx + ua[1] * ly + ua[2] * lz)
                    + ha1 * Math.abs(ua[3] * lx + ua[4] * ly + ua[5] * lz)
                    + ha2 * Math.abs(ua[6] * lx + ua[7] * ly + ua[8] * lz);
                const rb = hb0 * Math.abs(ub[0] * lx + ub[1] * ly + ub[2] * lz)
                    + hb1 * Math.abs(ub[3] * lx + ub[4] * ly + ub[5] * lz)
                    + hb2 * Math.abs(ub[6] * lx + ub[7] * ly + ub[8] * lz);
                const dist = dx * lx + dy * ly + dz * lz;
                const over = ra + rb - Math.abs(dist);
                if (over < 0)
                    return;
                const score = k < 6 ? over : over * 1.05 + 1e-5;
                if (score < best) {
                    best = score;
                    best_over = over;
                    best_axis = k;
                    if (dist < 0) {
                        dir[0] = -lx;
                        dir[1] = -ly;
                        dir[2] = -lz;
                    }
                    else {
                        dir[0] = lx;
                        dir[1] = ly;
                        dir[2] = lz;
                    }
                }
            }
            if (best_axis < 0)
                return;
            if (best_axis < 6)
                this.box_box_face(best_axis);
            else
                this.box_box_edge(best_axis, best_over);
        }
        box_box_face(axis) {
            const size = this.world.size;
            const ref_a = axis < 3;
            const ref = ref_a ? this.pair_a : this.pair_b, inc = ref_a ? this.pair_b : this.pair_a;
            const cr = ref_a ? this.pa : this.pb, ci = ref_a ? this.pb : this.pa;
            const ur = ref_a ? this.ua : this.ub, ui = ref_a ? this.ub : this.ua;
            const dir = this.dir;
            const nx = ref_a ? dir[0] : -dir[0];
            const ny = ref_a ? dir[1] : -dir[1];
            const nz = ref_a ? dir[2] : -dir[2];
            const ri = axis % 3;
            let j = 0, jd = -1;
            for (let k = 0; k < 3; ++k) {
                const d = Math.abs(ui[k * 3] * nx + ui[k * 3 + 1] * ny + ui[k * 3 + 2] * nz);
                if (d > jd) {
                    jd = d;
                    j = k;
                }
            }
            const js = ui[j * 3] * nx + ui[j * 3 + 1] * ny + ui[j * 3 + 2] * nz > 0 ? -1 : 1;
            const k1 = (j + 1) % 3, k2 = (j + 2) % 3;
            const hj = size[inc * 3 + j] * js, h1 = size[inc * 3 + k1], h2 = size[inc * 3 + k2];
            const fx = ci[0] + ui[j * 3] * hj, fy = ci[1] + ui[j * 3 + 1] * hj, fz = ci[2] + ui[j * 3 + 2] * hj;
            const e1x = ui[k1 * 3] * h1, e1y = ui[k1 * 3 + 1] * h1, e1z = ui[k1 * 3 + 2] * h1;
            const e2x = ui[k2 * 3] * h2, e2y = ui[k2 * 3 + 1] * h2, e2z = ui[k2 * 3 + 2] * h2;
            const poly = this.poly;
            poly[0] = fx + e1x + e2x;
            poly[1] = fy + e1y + e2y;
            poly[2] = fz + e1z + e2z;
            poly[3] = fx - e1x + e2x;
            poly[4] = fy - e1y + e2y;
            poly[5] = fz - e1z + e2z;
            poly[6] = fx - e1x - e2x;
            poly[7] = fy - e1y - e2y;
            poly[8] = fz - e1z - e2z;
            poly[9] = fx + e1x - e2x;
            poly[10] = fy + e1y - e2y;
            poly[11] = fz + e1z - e2z;
            this.poly_count = 4;
            for (let m = 0; m < 3; ++m) {
                if (m === ri)
                    continue;
                const mx = ur[m * 3], my = ur[m * 3 + 1], mz = ur[m * 3 + 2];
                const cd = mx * cr[0] + my * cr[1] + mz * cr[2];
                const h = size[ref * 3 + m];
                this.clip(mx, my, mz, cd + h);
                this.clip(-mx, -my, -mz, -cd + h);
            }
            const hr = size[ref * 3 + ri];
            const cn = nx * cr[0] + ny * cr[1] + nz * cr[2] + hr;
            const out = this.poly;
            for (let k = 0; k < this.poly_count; ++k) {
                const vx = out[k * 3], vy = out[k * 3 + 1], vz = out[k * 3 + 2];
                const sep = nx * vx + ny * vy + nz * vz - cn;
                if (sep > 0)
                    continue;
                this.cand_push(vx - nx * sep / 2, vy - ny * sep / 2, vz - nz * sep / 2, -sep);
            }
            this.cand_flush(dir[0], dir[1], dir[2]);
        }
        clip(nx, ny, nz, off) {
            const src = this.poly, dst = this.poly_next, n = this.poly_count;
            let m = 0;
            for (let i = 0; i < n; ++i) {
                const j = (i + 1) % n;
                const ix = src[i * 3], iy = src[i * 3 + 1], iz = src[i * 3 + 2];
                const jx = src[j * 3], jy = src[j * 3 + 1], jz = src[j * 3 + 2];
                const fi = off - (nx * ix + ny * iy + nz * iz);
                const fj = off - (nx * jx + ny * jy + nz * jz);
                if (fi >= 0) {
                    dst[m * 3] = ix;
                    dst[m * 3 + 1] = iy;
                    dst[m * 3 + 2] = iz;
                    ++m;
                }
                if ((fi >= 0) !== (fj >= 0)) {
                    const t = fi / (fi - fj);
                    dst[m * 3] = ix + (jx - ix) * t;
                    dst[m * 3 + 1] = iy + (jy - iy) * t;
                    dst[m * 3 + 2] = iz + (jz - iz) * t;
                    ++m;
                }
            }
            this.poly_count = m;
            this.poly = dst;
            this.poly_next = src;
        }
        box_box_edge(axis, over) {
            const size = this.world.size;
            const a = this.pair_a, b = this.pair_b;
            const pa = this.pa, pb = this.pb, ua = this.ua, ub = this.ub, dir = this.dir;
            const i = (axis - 6) / 3 | 0, j = (axis - 6) % 3;
            let p1x = pa[0], p1y = pa[1], p1z = pa[2];
            let p2x = pb[0], p2y = pb[1], p2z = pb[2];
            for (let k = 0; k < 3; ++k) {
                if (k !== i) {
                    const d = ua[k * 3] * dir[0] + ua[k * 3 + 1] * dir[1] + ua[k * 3 + 2] * dir[2];
                    const h = d > 0 ? size[a * 3 + k] : -size[a * 3 + k];
                    p1x += ua[k * 3] * h;
                    p1y += ua[k * 3 + 1] * h;
                    p1z += ua[k * 3 + 2] * h;
                }
                if (k !== j) {
                    const d = ub[k * 3] * dir[0] + ub[k * 3 + 1] * dir[1] + ub[k * 3 + 2] * dir[2];
                    const h = d > 0 ? -size[b * 3 + k] : size[b * 3 + k];
                    p2x += ub[k * 3] * h;
                    p2y += ub[k * 3 + 1] * h;
                    p2z += ub[k * 3 + 2] * h;
                }
            }
            const e1x = ua[i * 3], e1y = ua[i * 3 + 1], e1z = ua[i * 3 + 2];
            const e2x = ub[j * 3], e2y = ub[j * 3 + 1], e2z = ub[j * 3 + 2];
            const rx = p1x - p2x, ry = p1y - p2y, rz = p1z - p2z;
            const bb = e1x * e2x + e1y * e2y + e1z * e2z;
            const c = e1x * rx + e1y * ry + e1z * rz;
            const f = e2x * rx + e2y * ry + e2z * rz;
            const den = 1 - bb * bb;
            let s = (bb * f - c) / den;
            let t = (f - bb * c) / den;
            const ha = size[a * 3 + i], hb = size[b * 3 + j];
            s = s < -ha ? -ha : s > ha ? ha : s;
            t = t < -hb ? -hb : t > hb ? hb : t;
            this.emit((p1x + e1x * s + p2x + e2x * t) / 2, (p1y + e1y * s + p2y + e2y * t) / 2, (p1z + e1z * s + p2z + e2z * t) / 2, dir[0], dir[1], dir[2], over);
        }
        support(i, c, q, dx, dy, dz, out) {
            const world = this.world, size = world.size, s = i * 3;
            const shape = world.shape[i];
            if (shape === $bog_gamengine_phys3.shape_sphere) {
                const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const k = len > 0 ? size[s] / len : 0;
                out[0] = c[0] + dx * k;
                out[1] = c[1] + dy * k;
                out[2] = c[2] + dz * k;
                return out;
            }
            const l = this.rot_unapply(this.sup_local, q, dx, dy, dz);
            if (shape === $bog_gamengine_phys3.shape_box) {
                this.rot_apply(out, q, l[0] >= 0 ? size[s] : -size[s], l[1] >= 0 ? size[s + 1] : -size[s + 1], l[2] >= 0 ? size[s + 2] : -size[s + 2]);
            }
            else if (shape === $bog_gamengine_phys3.shape_capsule) {
                this.rot_apply(out, q, 0, l[1] >= 0 ? size[s + 1] : -size[s + 1], 0);
                const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const k = len > 0 ? size[s] / len : 0;
                out[0] += dx * k;
                out[1] += dy * k;
                out[2] += dz * k;
            }
            else if (shape === $bog_gamengine_phys3.shape_hull) {
                const hull = world.hull, off = world.hull_off[i], count = world.hull_count[i];
                let best = -Infinity, bx = 0, by = 0, bz = 0;
                for (let k = 0; k < count; ++k) {
                    const vx = hull[off + k * 3], vy = hull[off + k * 3 + 1], vz = hull[off + k * 3 + 2];
                    const d = vx * l[0] + vy * l[1] + vz * l[2];
                    if (d > best) {
                        best = d;
                        bx = vx;
                        by = vy;
                        bz = vz;
                    }
                }
                this.rot_apply(out, q, bx, by, bz);
            }
            else {
                out[0] = 0;
                out[1] = 0;
                out[2] = 0;
            }
            out[0] += c[0];
            out[1] += c[1];
            out[2] += c[2];
            return out;
        }
        mink(dx, dy, dz) {
            const k = this.ev_count;
            if (k >= vert_cap)
                return -1;
            const s = this.sup, eva = this.eva, evb = this.evb, ev = this.ev;
            this.support(this.pair_a, this.pa, this.qa, dx, dy, dz, s);
            eva[k * 3] = s[0];
            eva[k * 3 + 1] = s[1];
            eva[k * 3 + 2] = s[2];
            this.support(this.pair_b, this.pb, this.qb, -dx, -dy, -dz, s);
            evb[k * 3] = s[0];
            evb[k * 3 + 1] = s[1];
            evb[k * 3 + 2] = s[2];
            ev[k * 3] = eva[k * 3] - s[0];
            ev[k * 3 + 1] = eva[k * 3 + 1] - s[1];
            ev[k * 3 + 2] = eva[k * 3 + 2] - s[2];
            this.ev_count = k + 1;
            return k;
        }
        gjk_epa() {
            if (!this.gjk())
                return;
            this.epa();
        }
        gjk() {
            this.ev_count = 0;
            const dir = this.dir, si = this.si, ev = this.ev;
            const pa = this.pa, pb = this.pb;
            dir[0] = pb[0] - pa[0];
            dir[1] = pb[1] - pa[1];
            dir[2] = pb[2] - pa[2];
            if (dir[0] * dir[0] + dir[1] * dir[1] + dir[2] * dir[2] < 1e-12)
                dir[0] = 1;
            let k = this.mink(dir[0], dir[1], dir[2]);
            si[0] = k;
            this.sn = 1;
            dir[0] = -ev[k * 3];
            dir[1] = -ev[k * 3 + 1];
            dir[2] = -ev[k * 3 + 2];
            for (let iter = 0; iter < 32; ++iter) {
                if (dir[0] * dir[0] + dir[1] * dir[1] + dir[2] * dir[2] < 1e-12)
                    return true;
                k = this.mink(dir[0], dir[1], dir[2]);
                if (k < 0)
                    return false;
                if (ev[k * 3] * dir[0] + ev[k * 3 + 1] * dir[1] + ev[k * 3 + 2] * dir[2] <= 0)
                    return false;
                si[this.sn++] = k;
                if (this.simplex())
                    return true;
            }
            return false;
        }
        simplex() {
            if (this.sn === 2)
                return this.simplex_line();
            if (this.sn === 3)
                return this.simplex_triangle();
            return this.simplex_tetra();
        }
        simplex_line() {
            const ev = this.ev, si = this.si, dir = this.dir;
            const a = si[1] * 3, b = si[0] * 3;
            const ax = ev[a], ay = ev[a + 1], az = ev[a + 2];
            const abx = ev[b] - ax, aby = ev[b + 1] - ay, abz = ev[b + 2] - az;
            const aox = -ax, aoy = -ay, aoz = -az;
            if (abx * aox + aby * aoy + abz * aoz > 0) {
                const tx = aby * aoz - abz * aoy, ty = abz * aox - abx * aoz, tz = abx * aoy - aby * aox;
                dir[0] = ty * abz - tz * aby;
                dir[1] = tz * abx - tx * abz;
                dir[2] = tx * aby - ty * abx;
            }
            else {
                si[0] = si[1];
                this.sn = 1;
                dir[0] = aox;
                dir[1] = aoy;
                dir[2] = aoz;
            }
            return false;
        }
        simplex_triangle() {
            const ev = this.ev, si = this.si, dir = this.dir;
            const a = si[2] * 3, b = si[1] * 3, c = si[0] * 3;
            const ax = ev[a], ay = ev[a + 1], az = ev[a + 2];
            const abx = ev[b] - ax, aby = ev[b + 1] - ay, abz = ev[b + 2] - az;
            const acx = ev[c] - ax, acy = ev[c + 1] - ay, acz = ev[c + 2] - az;
            const aox = -ax, aoy = -ay, aoz = -az;
            const nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx;
            const tx = ny * acz - nz * acy, ty = nz * acx - nx * acz, tz = nx * acy - ny * acx;
            if (tx * aox + ty * aoy + tz * aoz > 0) {
                if (acx * aox + acy * aoy + acz * aoz > 0) {
                    si[1] = si[2];
                    this.sn = 2;
                    const px = acy * aoz - acz * aoy, py = acz * aox - acx * aoz, pz = acx * aoy - acy * aox;
                    dir[0] = py * acz - pz * acy;
                    dir[1] = pz * acx - px * acz;
                    dir[2] = px * acy - py * acx;
                    return false;
                }
                si[0] = si[1];
                si[1] = si[2];
                this.sn = 2;
                return this.simplex_line();
            }
            const sx = aby * nz - abz * ny, sy = abz * nx - abx * nz, sz = abx * ny - aby * nx;
            if (sx * aox + sy * aoy + sz * aoz > 0) {
                si[0] = si[1];
                si[1] = si[2];
                this.sn = 2;
                return this.simplex_line();
            }
            if (nx * aox + ny * aoy + nz * aoz > 0) {
                dir[0] = nx;
                dir[1] = ny;
                dir[2] = nz;
            }
            else {
                const t = si[0];
                si[0] = si[1];
                si[1] = t;
                dir[0] = -nx;
                dir[1] = -ny;
                dir[2] = -nz;
            }
            return false;
        }
        simplex_tetra() {
            const ev = this.ev, si = this.si;
            const a = si[3] * 3, b = si[2] * 3, c = si[1] * 3, d = si[0] * 3;
            const ax = ev[a], ay = ev[a + 1], az = ev[a + 2];
            const abx = ev[b] - ax, aby = ev[b + 1] - ay, abz = ev[b + 2] - az;
            const acx = ev[c] - ax, acy = ev[c + 1] - ay, acz = ev[c + 2] - az;
            const adx = ev[d] - ax, ady = ev[d + 1] - ay, adz = ev[d + 2] - az;
            const aox = -ax, aoy = -ay, aoz = -az;
            let nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx;
            if (nx * adx + ny * ady + nz * adz > 0) {
                nx = -nx;
                ny = -ny;
                nz = -nz;
            }
            if (nx * aox + ny * aoy + nz * aoz > 0) {
                si[0] = si[1];
                si[1] = si[2];
                si[2] = si[3];
                this.sn = 3;
                return this.simplex_triangle();
            }
            nx = acy * adz - acz * ady;
            ny = acz * adx - acx * adz;
            nz = acx * ady - acy * adx;
            if (nx * abx + ny * aby + nz * abz > 0) {
                nx = -nx;
                ny = -ny;
                nz = -nz;
            }
            if (nx * aox + ny * aoy + nz * aoz > 0) {
                si[2] = si[3];
                this.sn = 3;
                return this.simplex_triangle();
            }
            nx = ady * abz - adz * aby;
            ny = adz * abx - adx * abz;
            nz = adx * aby - ady * abx;
            if (nx * acx + ny * acy + nz * acz > 0) {
                nx = -nx;
                ny = -ny;
                nz = -nz;
            }
            if (nx * aox + ny * aoy + nz * aoz > 0) {
                const t = si[0];
                si[0] = si[2];
                si[1] = t;
                si[2] = si[3];
                this.sn = 3;
                return this.simplex_triangle();
            }
            return true;
        }
        simplex_fill() {
            const ev = this.ev, si = this.si;
            if (this.sn === 1) {
                const a = si[0] * 3;
                for (let s = 0; s < 6 && this.sn < 2; ++s) {
                    const sign = s & 1 ? -1 : 1;
                    const k = this.mink(s < 2 ? sign : 0, s >= 2 && s < 4 ? sign : 0, s >= 4 ? sign : 0);
                    if (k < 0)
                        return false;
                    const dx = ev[k * 3] - ev[a], dy = ev[k * 3 + 1] - ev[a + 1], dz = ev[k * 3 + 2] - ev[a + 2];
                    if (dx * dx + dy * dy + dz * dz > 1e-10) {
                        si[1] = k;
                        this.sn = 2;
                    }
                }
                if (this.sn < 2)
                    return false;
            }
            if (this.sn === 2) {
                const a = si[0] * 3, b = si[1] * 3;
                const abx = ev[b] - ev[a], aby = ev[b + 1] - ev[a + 1], abz = ev[b + 2] - ev[a + 2];
                const mx = Math.abs(abx), my = Math.abs(aby), mz = Math.abs(abz);
                const ex = mx <= my && mx <= mz ? 1 : 0, ey = ex === 0 && my <= mz ? 1 : 0, ez = ex === 0 && ey === 0 ? 1 : 0;
                const px = aby * ez - abz * ey, py = abz * ex - abx * ez, pz = abx * ey - aby * ex;
                for (let s = 0; s < 2 && this.sn < 3; ++s) {
                    const sign = s ? -1 : 1;
                    const k = this.mink(px * sign, py * sign, pz * sign);
                    if (k < 0)
                        return false;
                    const vx = ev[k * 3] - ev[a], vy = ev[k * 3 + 1] - ev[a + 1], vz = ev[k * 3 + 2] - ev[a + 2];
                    const cx = aby * vz - abz * vy, cy = abz * vx - abx * vz, cz = abx * vy - aby * vx;
                    if (cx * cx + cy * cy + cz * cz > 1e-10 * (abx * abx + aby * aby + abz * abz)) {
                        si[2] = k;
                        this.sn = 3;
                    }
                }
                if (this.sn < 3)
                    return false;
            }
            if (this.sn === 3) {
                const a = si[0] * 3, b = si[1] * 3, c = si[2] * 3;
                const abx = ev[b] - ev[a], aby = ev[b + 1] - ev[a + 1], abz = ev[b + 2] - ev[a + 2];
                const acx = ev[c] - ev[a], acy = ev[c + 1] - ev[a + 1], acz = ev[c + 2] - ev[a + 2];
                const nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx;
                const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
                if (len < 1e-12)
                    return false;
                for (let s = 0; s < 2 && this.sn < 4; ++s) {
                    const sign = s ? -1 : 1;
                    const k = this.mink(nx * sign, ny * sign, nz * sign);
                    if (k < 0)
                        return false;
                    const d = ((ev[k * 3] - ev[a]) * nx + (ev[k * 3 + 1] - ev[a + 1]) * ny + (ev[k * 3 + 2] - ev[a + 2]) * nz) / len;
                    if (Math.abs(d) > 1e-6) {
                        si[3] = k;
                        this.sn = 4;
                    }
                }
                if (this.sn < 4)
                    return false;
            }
            return true;
        }
        face_add(i0, i1, i2) {
            const k = this.ef_count;
            if (k >= face_cap)
                return;
            const ev = this.ev, ec = this.ec;
            const ax = ev[i0 * 3], ay = ev[i0 * 3 + 1], az = ev[i0 * 3 + 2];
            const e1x = ev[i1 * 3] - ax, e1y = ev[i1 * 3 + 1] - ay, e1z = ev[i1 * 3 + 2] - az;
            const e2x = ev[i2 * 3] - ax, e2y = ev[i2 * 3 + 1] - ay, e2z = ev[i2 * 3 + 2] - az;
            let nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
            const len2 = nx * nx + ny * ny + nz * nz;
            if (len2 < 1e-14)
                return;
            const inv = 1 / Math.sqrt(len2);
            nx *= inv;
            ny *= inv;
            nz *= inv;
            if (nx * (ax - ec[0]) + ny * (ay - ec[1]) + nz * (az - ec[2]) < 0) {
                nx = -nx;
                ny = -ny;
                nz = -nz;
                const t = i1;
                i1 = i2;
                i2 = t;
            }
            this.ef[k * 3] = i0;
            this.ef[k * 3 + 1] = i1;
            this.ef[k * 3 + 2] = i2;
            this.efn[k * 3] = nx;
            this.efn[k * 3 + 1] = ny;
            this.efn[k * 3 + 2] = nz;
            this.efd[k] = nx * ax + ny * ay + nz * az;
            this.ef_count = k + 1;
        }
        face_remove(i) {
            const last = --this.ef_count;
            const ef = this.ef, efn = this.efn;
            ef[i * 3] = ef[last * 3];
            ef[i * 3 + 1] = ef[last * 3 + 1];
            ef[i * 3 + 2] = ef[last * 3 + 2];
            efn[i * 3] = efn[last * 3];
            efn[i * 3 + 1] = efn[last * 3 + 1];
            efn[i * 3 + 2] = efn[last * 3 + 2];
            this.efd[i] = this.efd[last];
        }
        horizon_edge(a, b) {
            const eh = this.eh;
            for (let i = 0; i < this.eh_count; ++i) {
                if (eh[i * 2] !== b || eh[i * 2 + 1] !== a)
                    continue;
                const last = --this.eh_count;
                eh[i * 2] = eh[last * 2];
                eh[i * 2 + 1] = eh[last * 2 + 1];
                return;
            }
            const k = this.eh_count;
            if (k * 2 + 1 >= eh.length)
                return;
            eh[k * 2] = a;
            eh[k * 2 + 1] = b;
            this.eh_count = k + 1;
        }
        epa() {
            if (this.sn < 4 && !this.simplex_fill())
                return;
            const si = this.si, ev = this.ev, ec = this.ec, efn = this.efn, efd = this.efd, ef = this.ef, eh = this.eh;
            ec[0] = (ev[si[0] * 3] + ev[si[1] * 3] + ev[si[2] * 3] + ev[si[3] * 3]) / 4;
            ec[1] = (ev[si[0] * 3 + 1] + ev[si[1] * 3 + 1] + ev[si[2] * 3 + 1] + ev[si[3] * 3 + 1]) / 4;
            ec[2] = (ev[si[0] * 3 + 2] + ev[si[1] * 3 + 2] + ev[si[2] * 3 + 2] + ev[si[3] * 3 + 2]) / 4;
            this.ef_count = 0;
            this.face_add(si[0], si[1], si[2]);
            this.face_add(si[0], si[2], si[3]);
            this.face_add(si[0], si[3], si[1]);
            this.face_add(si[1], si[3], si[2]);
            if (this.ef_count < 4)
                return;
            for (let iter = 0; iter < 64; ++iter) {
                let f = 0;
                for (let i = 1; i < this.ef_count; ++i)
                    if (efd[i] < efd[f])
                        f = i;
                if (this.ev_count >= vert_cap || this.ef_count >= face_cap - 16)
                    break;
                const nx = efn[f * 3], ny = efn[f * 3 + 1], nz = efn[f * 3 + 2];
                const p = this.mink(nx, ny, nz);
                const px = ev[p * 3], py = ev[p * 3 + 1], pz = ev[p * 3 + 2];
                if (px * nx + py * ny + pz * nz - efd[f] < 1e-4)
                    break;
                this.eh_count = 0;
                for (let i = 0; i < this.ef_count;) {
                    if (efn[i * 3] * px + efn[i * 3 + 1] * py + efn[i * 3 + 2] * pz - efd[i] > 1e-7) {
                        this.horizon_edge(ef[i * 3], ef[i * 3 + 1]);
                        this.horizon_edge(ef[i * 3 + 1], ef[i * 3 + 2]);
                        this.horizon_edge(ef[i * 3 + 2], ef[i * 3]);
                        this.face_remove(i);
                    }
                    else
                        ++i;
                }
                for (let i = 0; i < this.eh_count; ++i)
                    this.face_add(eh[i * 2], eh[i * 2 + 1], p);
                if (this.ef_count < 4)
                    return;
            }
            let f = 0;
            for (let i = 1; i < this.ef_count; ++i)
                if (efd[i] < efd[f])
                    f = i;
            this.epa_emit(f);
        }
        epa_emit(f) {
            const ev = this.ev, eva = this.eva, evb = this.evb, ef = this.ef, efn = this.efn;
            const i0 = ef[f * 3], i1 = ef[f * 3 + 1], i2 = ef[f * 3 + 2];
            const nx = efn[f * 3], ny = efn[f * 3 + 1], nz = efn[f * 3 + 2];
            const dist = this.efd[f];
            const ax = ev[i0 * 3], ay = ev[i0 * 3 + 1], az = ev[i0 * 3 + 2];
            const e0x = ev[i1 * 3] - ax, e0y = ev[i1 * 3 + 1] - ay, e0z = ev[i1 * 3 + 2] - az;
            const e1x = ev[i2 * 3] - ax, e1y = ev[i2 * 3 + 1] - ay, e1z = ev[i2 * 3 + 2] - az;
            const e2x = nx * dist - ax, e2y = ny * dist - ay, e2z = nz * dist - az;
            const d00 = e0x * e0x + e0y * e0y + e0z * e0z;
            const d01 = e0x * e1x + e0y * e1y + e0z * e1z;
            const d11 = e1x * e1x + e1y * e1y + e1z * e1z;
            const d20 = e2x * e0x + e2y * e0y + e2z * e0z;
            const d21 = e2x * e1x + e2y * e1y + e2z * e1z;
            const den = d00 * d11 - d01 * d01;
            let u = 1, v = 0, w = 0;
            if (Math.abs(den) > 1e-20) {
                v = (d11 * d20 - d01 * d21) / den;
                w = (d00 * d21 - d01 * d20) / den;
                v = v < 0 ? 0 : v > 1 ? 1 : v;
                w = w < 0 ? 0 : w > 1 - v ? 1 - v : w;
                u = 1 - v - w;
            }
            const wax = u * eva[i0 * 3] + v * eva[i1 * 3] + w * eva[i2 * 3];
            const way = u * eva[i0 * 3 + 1] + v * eva[i1 * 3 + 1] + w * eva[i2 * 3 + 1];
            const waz = u * eva[i0 * 3 + 2] + v * eva[i1 * 3 + 2] + w * eva[i2 * 3 + 2];
            const wbx = u * evb[i0 * 3] + v * evb[i1 * 3] + w * evb[i2 * 3];
            const wby = u * evb[i0 * 3 + 1] + v * evb[i1 * 3 + 1] + w * evb[i2 * 3 + 1];
            const wbz = u * evb[i0 * 3 + 2] + v * evb[i1 * 3 + 2] + w * evb[i2 * 3 + 2];
            this.emit((wax + wbx) / 2, (way + wby) / 2, (waz + wbz) / 2, nx, ny, nz, dist < 0 ? 0 : dist);
        }
    }
    $.$bog_gamengine_phys3_narrow = $bog_gamengine_phys3_narrow;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3_solve extends $mol_object2 {
        static beta = 0.2;
        static slop = 0.005;
        static bounce_speed = 1;
        static warm_dist = 0.05;
        static flag_sleep = 1;
        static flag_ghost = 2;
        world = {};
        cap = 0;
        count = 0;
        body_a = new Uint32Array(0);
        body_b = new Uint32Array(0);
        point = new Float32Array(0);
        normal = new Float32Array(0);
        ra = new Float32Array(0);
        rb = new Float32Array(0);
        t1 = new Float32Array(0);
        t2 = new Float32Array(0);
        an_a = new Float32Array(0);
        an_b = new Float32Array(0);
        at1_a = new Float32Array(0);
        at1_b = new Float32Array(0);
        at2_a = new Float32Array(0);
        at2_b = new Float32Array(0);
        mass_n = new Float32Array(0);
        mass_t1 = new Float32Array(0);
        mass_t2 = new Float32Array(0);
        bias = new Float32Array(0);
        pn = new Float32Array(0);
        pt1 = new Float32Array(0);
        pt2 = new Float32Array(0);
        pt = new Float32Array(0);
        live = new Uint8Array(0);
        prev_count = 0;
        prev_a = new Uint32Array(0);
        prev_b = new Uint32Array(0);
        prev_point = new Float32Array(0);
        prev_pn = new Float32Array(0);
        prev_pt = new Float32Array(0);
        hash_cap = 0;
        hash_head = new Int32Array(0);
        hash_next = new Int32Array(0);
        tmp = new Float32Array(3);
        grow(need) {
            if (need <= this.cap)
                return;
            let cap = Math.max(this.cap, 64);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.body_a = this.grow_u32(this.body_a, cap);
            this.body_b = this.grow_u32(this.body_b, cap);
            this.point = this.grow_f32(this.point, cap * 3);
            this.ra = this.grow_f32(this.ra, cap * 3);
            this.rb = this.grow_f32(this.rb, cap * 3);
            this.t1 = this.grow_f32(this.t1, cap * 3);
            this.t2 = this.grow_f32(this.t2, cap * 3);
            this.an_a = this.grow_f32(this.an_a, cap * 3);
            this.an_b = this.grow_f32(this.an_b, cap * 3);
            this.at1_a = this.grow_f32(this.at1_a, cap * 3);
            this.at1_b = this.grow_f32(this.at1_b, cap * 3);
            this.at2_a = this.grow_f32(this.at2_a, cap * 3);
            this.at2_b = this.grow_f32(this.at2_b, cap * 3);
            this.mass_n = this.grow_f32(this.mass_n, cap);
            this.mass_t1 = this.grow_f32(this.mass_t1, cap);
            this.mass_t2 = this.grow_f32(this.mass_t2, cap);
            this.bias = this.grow_f32(this.bias, cap);
            this.pn = this.grow_f32(this.pn, cap);
            this.pt1 = this.grow_f32(this.pt1, cap);
            this.pt2 = this.grow_f32(this.pt2, cap);
            this.pt = this.grow_f32(this.pt, cap * 3);
            const live = new Uint8Array(cap);
            live.set(this.live);
            this.live = live;
            this.prev_a = this.grow_u32(this.prev_a, cap);
            this.prev_b = this.grow_u32(this.prev_b, cap);
            this.prev_point = this.grow_f32(this.prev_point, cap * 3);
            this.prev_pn = this.grow_f32(this.prev_pn, cap);
            this.prev_pt = this.grow_f32(this.prev_pt, cap * 3);
            const next = new Int32Array(cap);
            next.set(this.hash_next);
            this.hash_next = next;
        }
        grow_f32(prev, len) {
            const next = new Float32Array(len);
            next.set(prev);
            return next;
        }
        grow_u32(prev, len) {
            const next = new Uint32Array(len);
            next.set(prev);
            return next;
        }
        solve(world, narrow, dt, joint) {
            this.world = world;
            const count = narrow.contact_count;
            this.grow(count);
            this.count = count;
            this.normal = narrow.contact_normal;
            this.hash_build();
            this.prepare(narrow, dt);
            const iterations = world.iterations();
            const friction = world.friction();
            for (let it = 0; it < iterations; ++it) {
                this.iterate(friction);
                joint?.iterate();
            }
            this.remember();
            return count;
        }
        hash_of(a, b) {
            return (Math.imul(a, 73856093) ^ Math.imul(b, 19349663)) & (this.hash_cap - 1);
        }
        hash_build() {
            const need = this.prev_count * 2;
            if (this.hash_cap < need) {
                let cap = Math.max(this.hash_cap, 64);
                while (cap < need)
                    cap *= 2;
                this.hash_cap = cap;
                this.hash_head = new Int32Array(cap);
            }
            const head = this.hash_head, next = this.hash_next;
            head.fill(-1, 0, this.hash_cap);
            if (this.hash_cap === 0)
                return;
            const prev_a = this.prev_a, prev_b = this.prev_b;
            for (let j = 0; j < this.prev_count; ++j) {
                const h = this.hash_of(prev_a[j], prev_b[j]);
                next[j] = head[h];
                head[h] = j;
            }
        }
        prev_find(a, b, px, py, pz) {
            if (this.hash_cap === 0)
                return -1;
            const prev_a = this.prev_a, prev_b = this.prev_b, prev_point = this.prev_point, next = this.hash_next;
            let best = -1;
            let best_dist = $bog_gamengine_phys3_solve.warm_dist * $bog_gamengine_phys3_solve.warm_dist;
            for (let j = this.hash_head[this.hash_of(a, b)]; j >= 0; j = next[j]) {
                if (prev_a[j] !== a || prev_b[j] !== b)
                    continue;
                const dx = prev_point[j * 3] - px, dy = prev_point[j * 3 + 1] - py, dz = prev_point[j * 3 + 2] - pz;
                const dist = dx * dx + dy * dy + dz * dz;
                if (dist >= best_dist)
                    continue;
                best_dist = dist;
                best = j;
            }
            return best;
        }
        inertia_apply(i, vx, vy, vz, out, off) {
            const rot = this.world.rot, inv = this.world.inv_inertia;
            const qx = rot[i * 4], qy = rot[i * 4 + 1], qz = rot[i * 4 + 2], qw = rot[i * 4 + 3];
            let tx = 2 * (qz * vy - qy * vz);
            let ty = 2 * (qx * vz - qz * vx);
            let tz = 2 * (qy * vx - qx * vy);
            const lx = (vx + qw * tx + qz * ty - qy * tz) * inv[i * 3];
            const ly = (vy + qw * ty + qx * tz - qz * tx) * inv[i * 3 + 1];
            const lz = (vz + qw * tz + qy * tx - qx * ty) * inv[i * 3 + 2];
            tx = 2 * (qy * lz - qz * ly);
            ty = 2 * (qz * lx - qx * lz);
            tz = 2 * (qx * ly - qy * lx);
            out[off] = lx + qw * tx + qy * tz - qz * ty;
            out[off + 1] = ly + qw * ty + qz * tx - qx * tz;
            out[off + 2] = lz + qw * tz + qx * ty - qy * tx;
        }
        axis_mass(k, a, b, ax, ay, az, out_a, out_b) {
            const ra = this.ra, rb = this.rb, world = this.world;
            const k3 = k * 3;
            const rax = ra[k3], ray = ra[k3 + 1], raz = ra[k3 + 2];
            const rbx = rb[k3], rby = rb[k3 + 1], rbz = rb[k3 + 2];
            const cax = ray * az - raz * ay, cay = raz * ax - rax * az, caz = rax * ay - ray * ax;
            const cbx = rby * az - rbz * ay, cby = rbz * ax - rbx * az, cbz = rbx * ay - rby * ax;
            this.inertia_apply(a, cax, cay, caz, out_a, k3);
            this.inertia_apply(b, cbx, cby, cbz, out_b, k3);
            const sum = world.inv_mass[a] + world.inv_mass[b]
                + cax * out_a[k3] + cay * out_a[k3 + 1] + caz * out_a[k3 + 2]
                + cbx * out_b[k3] + cby * out_b[k3 + 1] + cbz * out_b[k3 + 2];
            return sum > 0 ? 1 / sum : 0;
        }
        wake(i) {
            this.world.flags[i] &= ~$bog_gamengine_phys3_solve.flag_sleep;
            this.world.sleep_timer[i] = 0;
        }
        prepare(narrow, dt) {
            const world = this.world;
            const pos = world.pos, inv_mass = world.inv_mass, flags = world.flags;
            const ca = narrow.contact_a, cb = narrow.contact_b, cp = narrow.contact_point, cn = narrow.contact_normal, cd = narrow.contact_depth;
            const body_a = this.body_a, body_b = this.body_b, point = this.point, live = this.live;
            const ra = this.ra, rb = this.rb, t1 = this.t1, t2 = this.t2, tmp = this.tmp;
            const pn = this.pn, pt1 = this.pt1, pt2 = this.pt2, bias = this.bias;
            const prev_pn = this.prev_pn, prev_pt = this.prev_pt;
            const sleep = $bog_gamengine_phys3_solve.flag_sleep, ghost = $bog_gamengine_phys3_solve.flag_ghost;
            const restitution = world.restitution();
            const bounce_speed = $bog_gamengine_phys3_solve.bounce_speed;
            const beta_dt = $bog_gamengine_phys3_solve.beta / dt;
            const slop = $bog_gamengine_phys3_solve.slop;
            for (let k = 0; k < this.count; ++k) {
                const k3 = k * 3;
                const a = ca[k], b = cb[k];
                body_a[k] = a;
                body_b[k] = b;
                const px = cp[k3], py = cp[k3 + 1], pz = cp[k3 + 2];
                point[k3] = px;
                point[k3 + 1] = py;
                point[k3 + 2] = pz;
                live[k] = 0;
                pn[k] = 0;
                pt1[k] = 0;
                pt2[k] = 0;
                const fa = flags[a], fb = flags[b];
                if ((fa | fb) & ghost)
                    continue;
                const ima = inv_mass[a], imb = inv_mass[b];
                if (ima === 0 && imb === 0)
                    continue;
                const sa = fa & sleep, sb = fb & sleep;
                if (sa && sb)
                    continue;
                if (sa)
                    this.wake(a);
                if (sb)
                    this.wake(b);
                live[k] = 1;
                ra[k3] = px - pos[a * 3];
                ra[k3 + 1] = py - pos[a * 3 + 1];
                ra[k3 + 2] = pz - pos[a * 3 + 2];
                rb[k3] = px - pos[b * 3];
                rb[k3 + 1] = py - pos[b * 3 + 1];
                rb[k3 + 2] = pz - pos[b * 3 + 2];
                const nx = cn[k3], ny = cn[k3 + 1], nz = cn[k3 + 2];
                this.mass_n[k] = this.axis_mass(k, a, b, nx, ny, nz, this.an_a, this.an_b);
                let ux = 0, uy = 0, uz = 0;
                if (Math.abs(nx) >= 0.57735) {
                    ux = ny;
                    uy = -nx;
                }
                else {
                    uy = nz;
                    uz = -ny;
                }
                const ul = 1 / Math.sqrt(ux * ux + uy * uy + uz * uz);
                ux *= ul;
                uy *= ul;
                uz *= ul;
                t1[k3] = ux;
                t1[k3 + 1] = uy;
                t1[k3 + 2] = uz;
                const vx = ny * uz - nz * uy, vy = nz * ux - nx * uz, vz = nx * uy - ny * ux;
                t2[k3] = vx;
                t2[k3 + 1] = vy;
                t2[k3 + 2] = vz;
                this.mass_t1[k] = this.axis_mass(k, a, b, ux, uy, uz, this.at1_a, this.at1_b);
                this.mass_t2[k] = this.axis_mass(k, a, b, vx, vy, vz, this.at2_a, this.at2_b);
                this.rel_vel(k, a, b);
                const vn = tmp[0] * nx + tmp[1] * ny + tmp[2] * nz;
                const bounce = vn < -bounce_speed ? -restitution * vn : 0;
                let baum = beta_dt * (cd[k] - slop);
                if (baum < 0)
                    baum = 0;
                bias[k] = bounce > baum ? bounce : baum;
                const j = this.prev_find(a, b, px, py, pz);
                if (j < 0)
                    continue;
                const ln = prev_pn[j];
                const ptx = prev_pt[j * 3], pty = prev_pt[j * 3 + 1], ptz = prev_pt[j * 3 + 2];
                const l1 = ptx * ux + pty * uy + ptz * uz;
                const l2 = ptx * vx + pty * vy + ptz * vz;
                pn[k] = ln;
                pt1[k] = l1;
                pt2[k] = l2;
                this.apply(k, a, b, cn, this.an_a, this.an_b, ln);
                this.apply(k, a, b, t1, this.at1_a, this.at1_b, l1);
                this.apply(k, a, b, t2, this.at2_a, this.at2_b, l2);
            }
        }
        rel_vel(k, a, b) {
            const vel = this.world.vel, ang = this.world.ang, ra = this.ra, rb = this.rb, out = this.tmp;
            const a3 = a * 3, b3 = b * 3, k3 = k * 3;
            const wax = ang[a3], way = ang[a3 + 1], waz = ang[a3 + 2];
            const wbx = ang[b3], wby = ang[b3 + 1], wbz = ang[b3 + 2];
            const rax = ra[k3], ray = ra[k3 + 1], raz = ra[k3 + 2];
            const rbx = rb[k3], rby = rb[k3 + 1], rbz = rb[k3 + 2];
            out[0] = vel[b3] + (wby * rbz - wbz * rby) - vel[a3] - (way * raz - waz * ray);
            out[1] = vel[b3 + 1] + (wbz * rbx - wbx * rbz) - vel[a3 + 1] - (waz * rax - wax * raz);
            out[2] = vel[b3 + 2] + (wbx * rby - wby * rbx) - vel[a3 + 2] - (wax * ray - way * rax);
            return out;
        }
        apply(k, a, b, axis, ang_a, ang_b, lambda) {
            if (lambda === 0)
                return;
            const vel = this.world.vel, ang = this.world.ang, inv_mass = this.world.inv_mass;
            const a3 = a * 3, b3 = b * 3, k3 = k * 3;
            const ima = inv_mass[a] * lambda, imb = inv_mass[b] * lambda;
            vel[a3] -= axis[k3] * ima;
            vel[a3 + 1] -= axis[k3 + 1] * ima;
            vel[a3 + 2] -= axis[k3 + 2] * ima;
            ang[a3] -= ang_a[k3] * lambda;
            ang[a3 + 1] -= ang_a[k3 + 1] * lambda;
            ang[a3 + 2] -= ang_a[k3 + 2] * lambda;
            vel[b3] += axis[k3] * imb;
            vel[b3 + 1] += axis[k3 + 1] * imb;
            vel[b3 + 2] += axis[k3 + 2] * imb;
            ang[b3] += ang_b[k3] * lambda;
            ang[b3 + 1] += ang_b[k3 + 1] * lambda;
            ang[b3 + 2] += ang_b[k3 + 2] * lambda;
        }
        iterate(friction) {
            const body_a = this.body_a, body_b = this.body_b, live = this.live, tmp = this.tmp;
            const normal = this.normal, t1 = this.t1, t2 = this.t2;
            const mass_n = this.mass_n, mass_t1 = this.mass_t1, mass_t2 = this.mass_t2, bias = this.bias;
            const pn = this.pn, pt1 = this.pt1, pt2 = this.pt2;
            for (let k = 0; k < this.count; ++k) {
                if (!live[k])
                    continue;
                const k3 = k * 3;
                const a = body_a[k], b = body_b[k];
                const max = friction * pn[k];
                this.rel_vel(k, a, b);
                const vt1 = tmp[0] * t1[k3] + tmp[1] * t1[k3 + 1] + tmp[2] * t1[k3 + 2];
                const old1 = pt1[k];
                let new1 = old1 - mass_t1[k] * vt1;
                new1 = new1 < -max ? -max : new1 > max ? max : new1;
                pt1[k] = new1;
                this.apply(k, a, b, t1, this.at1_a, this.at1_b, new1 - old1);
                this.rel_vel(k, a, b);
                const vt2 = tmp[0] * t2[k3] + tmp[1] * t2[k3 + 1] + tmp[2] * t2[k3 + 2];
                const old2 = pt2[k];
                let new2 = old2 - mass_t2[k] * vt2;
                new2 = new2 < -max ? -max : new2 > max ? max : new2;
                pt2[k] = new2;
                this.apply(k, a, b, t2, this.at2_a, this.at2_b, new2 - old2);
                this.rel_vel(k, a, b);
                const vn = tmp[0] * normal[k3] + tmp[1] * normal[k3 + 1] + tmp[2] * normal[k3 + 2];
                const old = pn[k];
                let next = old + mass_n[k] * (bias[k] - vn);
                if (next < 0)
                    next = 0;
                pn[k] = next;
                this.apply(k, a, b, normal, this.an_a, this.an_b, next - old);
            }
        }
        remember() {
            const pt = this.pt, pt1 = this.pt1, pt2 = this.pt2, t1 = this.t1, t2 = this.t2;
            for (let k = 0; k < this.count; ++k) {
                const k3 = k * 3;
                pt[k3] = t1[k3] * pt1[k] + t2[k3] * pt2[k];
                pt[k3 + 1] = t1[k3 + 1] * pt1[k] + t2[k3 + 1] * pt2[k];
                pt[k3 + 2] = t1[k3 + 2] * pt1[k] + t2[k3 + 2] * pt2[k];
            }
            const a = this.body_a;
            this.body_a = this.prev_a;
            this.prev_a = a;
            const b = this.body_b;
            this.body_b = this.prev_b;
            this.prev_b = b;
            const point = this.point;
            this.point = this.prev_point;
            this.prev_point = point;
            const pn = this.pn;
            this.pn = this.prev_pn;
            this.prev_pn = pn;
            this.pt = this.prev_pt;
            this.prev_pt = pt;
            this.prev_count = this.count;
        }
    }
    $.$bog_gamengine_phys3_solve = $bog_gamengine_phys3_solve;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_vec_add(out, a, b) {
        for (let i = 0; i < a.length; ++i)
            out[i] = a[i] + b[i];
        return out;
    }
    $.$bog_gamengine_vec_add = $bog_gamengine_vec_add;
    function $bog_gamengine_vec_sub(out, a, b) {
        for (let i = 0; i < a.length; ++i)
            out[i] = a[i] - b[i];
        return out;
    }
    $.$bog_gamengine_vec_sub = $bog_gamengine_vec_sub;
    function $bog_gamengine_vec_scale(out, a, k) {
        for (let i = 0; i < a.length; ++i)
            out[i] = a[i] * k;
        return out;
    }
    $.$bog_gamengine_vec_scale = $bog_gamengine_vec_scale;
    function $bog_gamengine_vec_len(a) {
        let sum = 0;
        for (let i = 0; i < a.length; ++i)
            sum += a[i] * a[i];
        return Math.sqrt(sum);
    }
    $.$bog_gamengine_vec_len = $bog_gamengine_vec_len;
    function $bog_gamengine_vec_norm(out, a) {
        const len = $bog_gamengine_vec_len(a);
        const k = len === 0 ? 0 : 1 / len;
        for (let i = 0; i < a.length; ++i)
            out[i] = a[i] * k;
        return out;
    }
    $.$bog_gamengine_vec_norm = $bog_gamengine_vec_norm;
    function $bog_gamengine_vec_dot(a, b) {
        let sum = 0;
        for (let i = 0; i < a.length; ++i)
            sum += a[i] * b[i];
        return sum;
    }
    $.$bog_gamengine_vec_dot = $bog_gamengine_vec_dot;
    function $bog_gamengine_vec_cross(out, a, b) {
        const ax = a[0], ay = a[1], az = a[2];
        const bx = b[0], by = b[1], bz = b[2];
        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
    }
    $.$bog_gamengine_vec_cross = $bog_gamengine_vec_cross;
    function $bog_gamengine_vec_lerp(out, a, b, t) {
        for (let i = 0; i < a.length; ++i)
            out[i] = a[i] + (b[i] - a[i]) * t;
        return out;
    }
    $.$bog_gamengine_vec_lerp = $bog_gamengine_vec_lerp;
    function $bog_gamengine_vec_mat4_apply(out, m, v) {
        const x = v[0], y = v[1], z = v[2], w = v[3];
        out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return out;
    }
    $.$bog_gamengine_vec_mat4_apply = $bog_gamengine_vec_mat4_apply;
    function $bog_gamengine_vec_quat_identity(out) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
    }
    $.$bog_gamengine_vec_quat_identity = $bog_gamengine_vec_quat_identity;
    function $bog_gamengine_vec_quat_mul(out, a, b) {
        const ax = a[0], ay = a[1], az = a[2], aw = a[3];
        const bx = b[0], by = b[1], bz = b[2], bw = b[3];
        out[0] = aw * bx + ax * bw + ay * bz - az * by;
        out[1] = aw * by - ax * bz + ay * bw + az * bx;
        out[2] = aw * bz + ax * by - ay * bx + az * bw;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
    }
    $.$bog_gamengine_vec_quat_mul = $bog_gamengine_vec_quat_mul;
    function $bog_gamengine_vec_quat_from_axis(out, axis, angle) {
        const len = Math.hypot(axis[0], axis[1], axis[2]);
        const k = len === 0 ? 0 : Math.sin(angle / 2) / len;
        out[0] = axis[0] * k;
        out[1] = axis[1] * k;
        out[2] = axis[2] * k;
        out[3] = Math.cos(angle / 2);
        return out;
    }
    $.$bog_gamengine_vec_quat_from_axis = $bog_gamengine_vec_quat_from_axis;
    function $bog_gamengine_vec_quat_from_euler(out, x, y, z) {
        const cx = Math.cos(x / 2), sx = Math.sin(x / 2);
        const cy = Math.cos(y / 2), sy = Math.sin(y / 2);
        const cz = Math.cos(z / 2), sz = Math.sin(z / 2);
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        return out;
    }
    $.$bog_gamengine_vec_quat_from_euler = $bog_gamengine_vec_quat_from_euler;
    function $bog_gamengine_vec_quat_normalize(out, q) {
        const len = Math.hypot(q[0], q[1], q[2], q[3]);
        if (len === 0)
            return $bog_gamengine_vec_quat_identity(out);
        const k = 1 / len;
        out[0] = q[0] * k;
        out[1] = q[1] * k;
        out[2] = q[2] * k;
        out[3] = q[3] * k;
        return out;
    }
    $.$bog_gamengine_vec_quat_normalize = $bog_gamengine_vec_quat_normalize;
    function $bog_gamengine_vec_quat_rotate(out, q, v) {
        const qx = q[0], qy = q[1], qz = q[2], qw = q[3];
        const vx = v[0], vy = v[1], vz = v[2];
        const tx = 2 * (qy * vz - qz * vy);
        const ty = 2 * (qz * vx - qx * vz);
        const tz = 2 * (qx * vy - qy * vx);
        out[0] = vx + qw * tx + qy * tz - qz * ty;
        out[1] = vy + qw * ty + qz * tx - qx * tz;
        out[2] = vz + qw * tz + qx * ty - qy * tx;
        return out;
    }
    $.$bog_gamengine_vec_quat_rotate = $bog_gamengine_vec_quat_rotate;
    function $bog_gamengine_vec_quat_integrate(out, q, ang, dt) {
        const qx = q[0], qy = q[1], qz = q[2], qw = q[3];
        const wx = ang[0] * dt / 2, wy = ang[1] * dt / 2, wz = ang[2] * dt / 2;
        out[0] = qx + wx * qw + wy * qz - wz * qy;
        out[1] = qy - wx * qz + wy * qw + wz * qx;
        out[2] = qz + wx * qy - wy * qx + wz * qw;
        out[3] = qw - wx * qx - wy * qy - wz * qz;
        return $bog_gamengine_vec_quat_normalize(out, out);
    }
    $.$bog_gamengine_vec_quat_integrate = $bog_gamengine_vec_quat_integrate;
    function $bog_gamengine_vec_quat_to_mat4(out, q, pos, scale) {
        const x = q[0], y = q[1], z = q[2], w = q[3];
        const xx = x * x, yy = y * y, zz = z * z;
        const xy = x * y, xz = x * z, yz = y * z;
        const wx = w * x, wy = w * y, wz = w * z;
        const sx = scale[0], sy = scale[1], sz = scale[2];
        out[0] = (1 - 2 * (yy + zz)) * sx;
        out[1] = 2 * (xy + wz) * sx;
        out[2] = 2 * (xz - wy) * sx;
        out[3] = 0;
        out[4] = 2 * (xy - wz) * sy;
        out[5] = (1 - 2 * (xx + zz)) * sy;
        out[6] = 2 * (yz + wx) * sy;
        out[7] = 0;
        out[8] = 2 * (xz + wy) * sz;
        out[9] = 2 * (yz - wx) * sz;
        out[10] = (1 - 2 * (xx + yy)) * sz;
        out[11] = 0;
        out[12] = pos[0];
        out[13] = pos[1];
        out[14] = pos[2];
        out[15] = 1;
        return out;
    }
    $.$bog_gamengine_vec_quat_to_mat4 = $bog_gamengine_vec_quat_to_mat4;
    function $bog_gamengine_vec_quat_to_euler(out, q) {
        const x = q[0], y = q[1], z = q[2], w = q[3];
        const sy = 2 * (w * y - x * z);
        out[1] = sy >= 1 ? Math.PI / 2 : sy <= -1 ? -Math.PI / 2 : Math.asin(sy);
        out[0] = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
        out[2] = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));
        return out;
    }
    $.$bog_gamengine_vec_quat_to_euler = $bog_gamengine_vec_quat_to_euler;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3_joint extends $mol_object2 {
        static type_point = 0;
        static type_hinge = 1;
        static type_slider = 2;
        static type_spring = 3;
        static beta = 0.2;
        static flag_sleep = 1;
        static sleep_speed = 0.05;
        world = {};
        cap = 0;
        count = 0;
        type = new Uint8Array(0);
        a = new Uint32Array(0);
        b = new Uint32Array(0);
        anchor_a = new Float32Array(0);
        anchor_b = new Float32Array(0);
        axis_a = new Float32Array(0);
        axis_b = new Float32Array(0);
        ref_a = new Float32Array(0);
        ref_b = new Float32Array(0);
        rel = new Float32Array(0);
        param = new Float32Array(0);
        imp_lin = new Float32Array(0);
        imp_ang = new Float32Array(0);
        lim = new Int8Array(0);
        live = new Uint8Array(0);
        ima = new Float32Array(0);
        imb = new Float32Array(0);
        ra = new Float32Array(0);
        rb = new Float32Array(0);
        iwa = new Float32Array(0);
        iwb = new Float32Array(0);
        axis = new Float32Array(0);
        u = new Float32Array(0);
        v = new Float32Array(0);
        kin = new Float32Array(0);
        mass_u = new Float32Array(0);
        mass_v = new Float32Array(0);
        mass_lim = new Float32Array(0);
        bias_lin = new Float32Array(0);
        bias_ang = new Float32Array(0);
        lim_target = new Float32Array(0);
        tmp = new Float32Array(3);
        tmp2 = new Float32Array(3);
        tmp3 = new Float32Array(3);
        mat = new Float32Array(9);
        q1 = new Float32Array(4);
        q2 = new Float32Array(4);
        q3 = new Float32Array(4);
        grow(need) {
            if (need <= this.cap)
                return;
            let cap = Math.max(this.cap, 16);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.type = this.grow_u8(this.type, cap);
            this.a = this.grow_u32(this.a, cap);
            this.b = this.grow_u32(this.b, cap);
            this.anchor_a = this.grow_f32(this.anchor_a, cap * 3);
            this.anchor_b = this.grow_f32(this.anchor_b, cap * 3);
            this.axis_a = this.grow_f32(this.axis_a, cap * 3);
            this.axis_b = this.grow_f32(this.axis_b, cap * 3);
            this.ref_a = this.grow_f32(this.ref_a, cap * 3);
            this.ref_b = this.grow_f32(this.ref_b, cap * 3);
            this.rel = this.grow_f32(this.rel, cap * 4);
            this.param = this.grow_f32(this.param, cap * 4);
            this.imp_lin = this.grow_f32(this.imp_lin, cap * 3);
            this.imp_ang = this.grow_f32(this.imp_ang, cap * 3);
            const lim = new Int8Array(cap);
            lim.set(this.lim);
            this.lim = lim;
            this.live = this.grow_u8(this.live, cap);
            this.ima = this.grow_f32(this.ima, cap);
            this.imb = this.grow_f32(this.imb, cap);
            this.ra = this.grow_f32(this.ra, cap * 3);
            this.rb = this.grow_f32(this.rb, cap * 3);
            this.iwa = this.grow_f32(this.iwa, cap * 9);
            this.iwb = this.grow_f32(this.iwb, cap * 9);
            this.axis = this.grow_f32(this.axis, cap * 3);
            this.u = this.grow_f32(this.u, cap * 3);
            this.v = this.grow_f32(this.v, cap * 3);
            this.kin = this.grow_f32(this.kin, cap * 9);
            this.mass_u = this.grow_f32(this.mass_u, cap);
            this.mass_v = this.grow_f32(this.mass_v, cap);
            this.mass_lim = this.grow_f32(this.mass_lim, cap);
            this.bias_lin = this.grow_f32(this.bias_lin, cap * 3);
            this.bias_ang = this.grow_f32(this.bias_ang, cap * 3);
            this.lim_target = this.grow_f32(this.lim_target, cap);
        }
        grow_f32(prev, len) {
            const next = new Float32Array(len);
            next.set(prev);
            return next;
        }
        grow_u32(prev, len) {
            const next = new Uint32Array(len);
            next.set(prev);
            return next;
        }
        grow_u8(prev, len) {
            const next = new Uint8Array(len);
            next.set(prev);
            return next;
        }
        add(type, a, b, anchor_a, anchor_b, axis, param) {
            const world = this.world;
            const k = this.count;
            this.grow(k + 1);
            this.count = k + 1;
            const k3 = k * 3, k4 = k * 4;
            this.type[k] = type;
            this.a[k] = a;
            this.b[k] = b;
            this.anchor_a.set(anchor_a, k3);
            this.anchor_b.set(anchor_b, k3);
            this.param.fill(0, k4, k4 + 4);
            if (param)
                this.param.set(param, k4);
            this.imp_lin.fill(0, k3, k3 + 3);
            this.imp_ang.fill(0, k3, k3 + 3);
            this.lim[k] = 0;
            const tmp = this.tmp, tmp2 = this.tmp2;
            tmp[0] = axis ? axis[0] : 0;
            tmp[1] = axis ? axis[1] : 1;
            tmp[2] = axis ? axis[2] : 0;
            $bog_gamengine_vec_norm(tmp, tmp);
            this.axis_a.set(tmp, k3);
            const qa = world.rot.subarray(a * 4, a * 4 + 4), qb = world.rot.subarray(b * 4, b * 4 + 4);
            $bog_gamengine_vec_quat_rotate(tmp2, qa, tmp);
            this.rotate_inv(tmp, qb, tmp2);
            this.axis_b.set(tmp, k3);
            this.perp(tmp2[0], tmp2[1], tmp2[2], tmp);
            this.rotate_inv(tmp2, qa, tmp);
            this.ref_a.set(tmp2, k3);
            this.rotate_inv(tmp2, qb, tmp);
            this.ref_b.set(tmp2, k3);
            const q1 = this.q1, q2 = this.q2;
            q1[0] = -qa[0];
            q1[1] = -qa[1];
            q1[2] = -qa[2];
            q1[3] = qa[3];
            $bog_gamengine_vec_quat_mul(q2, q1, qb);
            this.rel.set(q2, k4);
            return k;
        }
        remove(index) {
            const last = this.count - 1;
            if (index !== last) {
                this.type[index] = this.type[last];
                this.a[index] = this.a[last];
                this.b[index] = this.b[last];
                this.anchor_a.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.anchor_b.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.axis_a.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.axis_b.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.ref_a.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.ref_b.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.rel.copyWithin(index * 4, last * 4, last * 4 + 4);
                this.param.copyWithin(index * 4, last * 4, last * 4 + 4);
                this.imp_lin.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.imp_ang.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.lim[index] = this.lim[last];
            }
            this.count = last;
            return last;
        }
        body_remove(index, last) {
            for (let k = this.count - 1; k >= 0; --k) {
                if (this.a[k] === index || this.b[k] === index)
                    this.remove(k);
            }
            if (index === last)
                return;
            for (let k = 0; k < this.count; ++k) {
                if (this.a[k] === last)
                    this.a[k] = index;
                if (this.b[k] === last)
                    this.b[k] = index;
            }
        }
        rotate_inv(out, q, v) {
            const q3 = this.q3;
            q3[0] = -q[0];
            q3[1] = -q[1];
            q3[2] = -q[2];
            q3[3] = q[3];
            return $bog_gamengine_vec_quat_rotate(out, q3, v);
        }
        perp(nx, ny, nz, out) {
            let ux = 0, uy = 0, uz = 0;
            if (Math.abs(nx) >= 0.57735) {
                ux = ny;
                uy = -nx;
            }
            else {
                uy = nz;
                uz = -ny;
            }
            const ul = 1 / Math.sqrt(ux * ux + uy * uy + uz * uz);
            out[0] = ux * ul;
            out[1] = uy * ul;
            out[2] = uz * ul;
            return out;
        }
        inertia_world(i, out, off) {
            const rot = this.world.rot, inv = this.world.inv_inertia;
            const x = rot[i * 4], y = rot[i * 4 + 1], z = rot[i * 4 + 2], w = rot[i * 4 + 3];
            const d0 = inv[i * 3], d1 = inv[i * 3 + 1], d2 = inv[i * 3 + 2];
            const xx = x * x, yy = y * y, zz = z * z;
            const xy = x * y, xz = x * z, yz = y * z;
            const wx = w * x, wy = w * y, wz = w * z;
            const r00 = 1 - 2 * (yy + zz), r01 = 2 * (xy - wz), r02 = 2 * (xz + wy);
            const r10 = 2 * (xy + wz), r11 = 1 - 2 * (xx + zz), r12 = 2 * (yz - wx);
            const r20 = 2 * (xz - wy), r21 = 2 * (yz + wx), r22 = 1 - 2 * (xx + yy);
            out[off] = r00 * r00 * d0 + r01 * r01 * d1 + r02 * r02 * d2;
            out[off + 1] = r00 * r10 * d0 + r01 * r11 * d1 + r02 * r12 * d2;
            out[off + 2] = r00 * r20 * d0 + r01 * r21 * d1 + r02 * r22 * d2;
            out[off + 3] = out[off + 1];
            out[off + 4] = r10 * r10 * d0 + r11 * r11 * d1 + r12 * r12 * d2;
            out[off + 5] = r10 * r20 * d0 + r11 * r21 * d1 + r12 * r22 * d2;
            out[off + 6] = out[off + 2];
            out[off + 7] = out[off + 5];
            out[off + 8] = r20 * r20 * d0 + r21 * r21 * d1 + r22 * r22 * d2;
        }
        invert3(src, soff, dst, doff) {
            const m00 = src[soff], m01 = src[soff + 1], m02 = src[soff + 2];
            const m10 = src[soff + 3], m11 = src[soff + 4], m12 = src[soff + 5];
            const m20 = src[soff + 6], m21 = src[soff + 7], m22 = src[soff + 8];
            const c00 = m11 * m22 - m12 * m21;
            const c01 = m12 * m20 - m10 * m22;
            const c02 = m10 * m21 - m11 * m20;
            const det = m00 * c00 + m01 * c01 + m02 * c02;
            if (!(det > 1e-12)) {
                dst.fill(0, doff, doff + 9);
                return;
            }
            const inv = 1 / det;
            dst[doff] = c00 * inv;
            dst[doff + 1] = (m02 * m21 - m01 * m22) * inv;
            dst[doff + 2] = (m01 * m12 - m02 * m11) * inv;
            dst[doff + 3] = c01 * inv;
            dst[doff + 4] = (m00 * m22 - m02 * m20) * inv;
            dst[doff + 5] = (m02 * m10 - m00 * m12) * inv;
            dst[doff + 6] = c02 * inv;
            dst[doff + 7] = (m01 * m20 - m00 * m21) * inv;
            dst[doff + 8] = (m00 * m11 - m01 * m10) * inv;
        }
        quad(m, off, x, y, z) {
            return x * (m[off] * x + m[off + 1] * y + m[off + 2] * z)
                + y * (m[off + 3] * x + m[off + 4] * y + m[off + 5] * z)
                + z * (m[off + 6] * x + m[off + 7] * y + m[off + 8] * z);
        }
        mass_lin(k, nx, ny, nz) {
            const k3 = k * 3, k9 = k * 9;
            const ra = this.ra, rb = this.rb;
            const cax = ra[k3 + 1] * nz - ra[k3 + 2] * ny, cay = ra[k3 + 2] * nx - ra[k3] * nz, caz = ra[k3] * ny - ra[k3 + 1] * nx;
            const cbx = rb[k3 + 1] * nz - rb[k3 + 2] * ny, cby = rb[k3 + 2] * nx - rb[k3] * nz, cbz = rb[k3] * ny - rb[k3 + 1] * nx;
            const sum = this.ima[k] + this.imb[k] + this.quad(this.iwa, k9, cax, cay, caz) + this.quad(this.iwb, k9, cbx, cby, cbz);
            return sum > 0 ? 1 / sum : 0;
        }
        mass_ang(k, nx, ny, nz) {
            const k9 = k * 9;
            const sum = this.quad(this.iwa, k9, nx, ny, nz) + this.quad(this.iwb, k9, nx, ny, nz);
            return sum > 0 ? 1 / sum : 0;
        }
        kin_lin(k) {
            const k3 = k * 3, k9 = k * 9;
            const m = this.mat;
            const im = this.ima[k] + this.imb[k];
            m.fill(0);
            m[0] = m[4] = m[8] = im;
            this.kin_skew(this.ra, k3, this.iwa, k9, m);
            this.kin_skew(this.rb, k3, this.iwb, k9, m);
            this.invert3(m, 0, this.kin, k9);
        }
        kin_skew(r, r3, iw, i9, m) {
            const rx = r[r3], ry = r[r3 + 1], rz = r[r3 + 2];
            const s00 = 0, s01 = -rz, s02 = ry;
            const s10 = rz, s11 = 0, s12 = -rx;
            const s20 = -ry, s21 = rx, s22 = 0;
            const i00 = iw[i9], i01 = iw[i9 + 1], i02 = iw[i9 + 2];
            const i10 = iw[i9 + 3], i11 = iw[i9 + 4], i12 = iw[i9 + 5];
            const i20 = iw[i9 + 6], i21 = iw[i9 + 7], i22 = iw[i9 + 8];
            const t00 = s00 * i00 + s01 * i10 + s02 * i20, t01 = s00 * i01 + s01 * i11 + s02 * i21, t02 = s00 * i02 + s01 * i12 + s02 * i22;
            const t10 = s10 * i00 + s11 * i10 + s12 * i20, t11 = s10 * i01 + s11 * i11 + s12 * i21, t12 = s10 * i02 + s11 * i12 + s12 * i22;
            const t20 = s20 * i00 + s21 * i10 + s22 * i20, t21 = s20 * i01 + s21 * i11 + s22 * i21, t22 = s20 * i02 + s21 * i12 + s22 * i22;
            m[0] += t00 * s00 + t01 * s01 + t02 * s02;
            m[1] += t00 * s10 + t01 * s11 + t02 * s12;
            m[2] += t00 * s20 + t01 * s21 + t02 * s22;
            m[3] += t10 * s00 + t11 * s01 + t12 * s02;
            m[4] += t10 * s10 + t11 * s11 + t12 * s12;
            m[5] += t10 * s20 + t11 * s21 + t12 * s22;
            m[6] += t20 * s00 + t21 * s01 + t22 * s02;
            m[7] += t20 * s10 + t21 * s11 + t22 * s12;
            m[8] += t20 * s20 + t21 * s21 + t22 * s22;
        }
        kin_ang(k) {
            const k9 = k * 9;
            const m = this.mat, iwa = this.iwa, iwb = this.iwb;
            for (let i = 0; i < 9; ++i)
                m[i] = iwa[k9 + i] + iwb[k9 + i];
            this.invert3(m, 0, this.kin, k9);
        }
        rel_vel(k) {
            const world = this.world, vel = world.vel, ang = world.ang, ra = this.ra, rb = this.rb, out = this.tmp;
            const a3 = this.a[k] * 3, b3 = this.b[k] * 3, k3 = k * 3;
            const wax = ang[a3], way = ang[a3 + 1], waz = ang[a3 + 2];
            const wbx = ang[b3], wby = ang[b3 + 1], wbz = ang[b3 + 2];
            const rax = ra[k3], ray = ra[k3 + 1], raz = ra[k3 + 2];
            const rbx = rb[k3], rby = rb[k3 + 1], rbz = rb[k3 + 2];
            out[0] = vel[b3] + (wby * rbz - wbz * rby) - vel[a3] - (way * raz - waz * ray);
            out[1] = vel[b3 + 1] + (wbz * rbx - wbx * rbz) - vel[a3 + 1] - (waz * rax - wax * raz);
            out[2] = vel[b3 + 2] + (wbx * rby - wby * rbx) - vel[a3 + 2] - (wax * ray - way * rax);
            return out;
        }
        rel_ang(k) {
            const ang = this.world.ang, out = this.tmp2;
            const a3 = this.a[k] * 3, b3 = this.b[k] * 3;
            out[0] = ang[b3] - ang[a3];
            out[1] = ang[b3 + 1] - ang[a3 + 1];
            out[2] = ang[b3 + 2] - ang[a3 + 2];
            return out;
        }
        apply_lin(k, lx, ly, lz) {
            const world = this.world, vel = world.vel, ang = world.ang;
            const a = this.a[k], b = this.b[k], a3 = a * 3, b3 = b * 3, k3 = k * 3, k9 = k * 9;
            const ima = this.ima[k], imb = this.imb[k], ra = this.ra, rb = this.rb, iwa = this.iwa, iwb = this.iwb;
            if (ima > 0) {
                vel[a3] -= lx * ima;
                vel[a3 + 1] -= ly * ima;
                vel[a3 + 2] -= lz * ima;
                const tx = ra[k3 + 1] * lz - ra[k3 + 2] * ly, ty = ra[k3 + 2] * lx - ra[k3] * lz, tz = ra[k3] * ly - ra[k3 + 1] * lx;
                ang[a3] -= iwa[k9] * tx + iwa[k9 + 1] * ty + iwa[k9 + 2] * tz;
                ang[a3 + 1] -= iwa[k9 + 3] * tx + iwa[k9 + 4] * ty + iwa[k9 + 5] * tz;
                ang[a3 + 2] -= iwa[k9 + 6] * tx + iwa[k9 + 7] * ty + iwa[k9 + 8] * tz;
            }
            if (imb > 0) {
                vel[b3] += lx * imb;
                vel[b3 + 1] += ly * imb;
                vel[b3 + 2] += lz * imb;
                const tx = rb[k3 + 1] * lz - rb[k3 + 2] * ly, ty = rb[k3 + 2] * lx - rb[k3] * lz, tz = rb[k3] * ly - rb[k3 + 1] * lx;
                ang[b3] += iwb[k9] * tx + iwb[k9 + 1] * ty + iwb[k9 + 2] * tz;
                ang[b3 + 1] += iwb[k9 + 3] * tx + iwb[k9 + 4] * ty + iwb[k9 + 5] * tz;
                ang[b3 + 2] += iwb[k9 + 6] * tx + iwb[k9 + 7] * ty + iwb[k9 + 8] * tz;
            }
        }
        apply_ang(k, tx, ty, tz) {
            const ang = this.world.ang;
            const a3 = this.a[k] * 3, b3 = this.b[k] * 3, k9 = k * 9;
            const iwa = this.iwa, iwb = this.iwb;
            if (this.ima[k] > 0) {
                ang[a3] -= iwa[k9] * tx + iwa[k9 + 1] * ty + iwa[k9 + 2] * tz;
                ang[a3 + 1] -= iwa[k9 + 3] * tx + iwa[k9 + 4] * ty + iwa[k9 + 5] * tz;
                ang[a3 + 2] -= iwa[k9 + 6] * tx + iwa[k9 + 7] * ty + iwa[k9 + 8] * tz;
            }
            if (this.imb[k] > 0) {
                ang[b3] += iwb[k9] * tx + iwb[k9 + 1] * ty + iwb[k9 + 2] * tz;
                ang[b3 + 1] += iwb[k9 + 3] * tx + iwb[k9 + 4] * ty + iwb[k9 + 5] * tz;
                ang[b3 + 2] += iwb[k9 + 6] * tx + iwb[k9 + 7] * ty + iwb[k9 + 8] * tz;
            }
        }
        active(i) {
            const world = this.world;
            if (!(world.inv_mass[i] > 0))
                return false;
            if (world.flags[i] & $bog_gamengine_phys3_joint.flag_sleep)
                return false;
            return true;
        }
        moving(i) {
            const vel = this.world.vel, ang = this.world.ang, i3 = i * 3;
            const v2 = vel[i3] * vel[i3] + vel[i3 + 1] * vel[i3 + 1] + vel[i3 + 2] * vel[i3 + 2];
            const w2 = ang[i3] * ang[i3] + ang[i3 + 1] * ang[i3 + 1] + ang[i3 + 2] * ang[i3 + 2];
            const speed2 = $bog_gamengine_phys3_joint.sleep_speed * $bog_gamengine_phys3_joint.sleep_speed;
            return v2 >= speed2 || w2 >= speed2;
        }
        wake(i) {
            this.world.flags[i] &= ~$bog_gamengine_phys3_joint.flag_sleep;
            this.world.sleep_timer[i] = 0;
        }
        prepare(world, dt) {
            this.world = world;
            const count = this.count;
            const pos = world.pos, rot = world.rot, inv_mass = world.inv_mass, flags = world.flags;
            const type = this.type, live = this.live, ima = this.ima, imb = this.imb;
            const ra = this.ra, rb = this.rb, iwa = this.iwa, iwb = this.iwb;
            const axis = this.axis, u = this.u, v = this.v, tmp = this.tmp, tmp2 = this.tmp2, tmp3 = this.tmp3;
            const bias_lin = this.bias_lin, bias_ang = this.bias_ang, imp_lin = this.imp_lin, imp_ang = this.imp_ang;
            const beta_dt = $bog_gamengine_phys3_joint.beta / dt;
            const sleep = $bog_gamengine_phys3_joint.flag_sleep;
            for (let k = 0; k < count; ++k) {
                const k3 = k * 3, k9 = k * 9;
                const a = this.a[k], b = this.b[k];
                let act_a = this.active(a), act_b = this.active(b);
                live[k] = 0;
                if (!act_a && !act_b)
                    continue;
                if (!act_a && inv_mass[a] > 0 && flags[a] & sleep && this.moving(b)) {
                    this.wake(a);
                    act_a = true;
                }
                if (!act_b && inv_mass[b] > 0 && flags[b] & sleep && this.moving(a)) {
                    this.wake(b);
                    act_b = true;
                }
                ima[k] = act_a ? inv_mass[a] : 0;
                imb[k] = act_b ? inv_mass[b] : 0;
                if (act_a)
                    this.inertia_world(a, iwa, k9);
                else
                    iwa.fill(0, k9, k9 + 9);
                if (act_b)
                    this.inertia_world(b, iwb, k9);
                else
                    iwb.fill(0, k9, k9 + 9);
                const qa = rot.subarray(a * 4, a * 4 + 4), qb = rot.subarray(b * 4, b * 4 + 4);
                $bog_gamengine_vec_quat_rotate(tmp, qa, this.anchor_a.subarray(k3, k3 + 3));
                ra.set(tmp, k3);
                $bog_gamengine_vec_quat_rotate(tmp, qb, this.anchor_b.subarray(k3, k3 + 3));
                rb.set(tmp, k3);
                const dx = pos[b * 3] + rb[k3] - pos[a * 3] - ra[k3];
                const dy = pos[b * 3 + 1] + rb[k3 + 1] - pos[a * 3 + 1] - ra[k3 + 1];
                const dz = pos[b * 3 + 2] + rb[k3 + 2] - pos[a * 3 + 2] - ra[k3 + 2];
                const kind = type[k];
                if (kind === $bog_gamengine_phys3_joint.type_spring) {
                    const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (len < 1e-6)
                        continue;
                    const nx = dx / len, ny = dy / len, nz = dz / len;
                    const mass_n = this.mass_lin(k, nx, ny, nz);
                    const rel = this.rel_vel(k);
                    const vn = rel[0] * nx + rel[1] * ny + rel[2] * nz;
                    const rest = this.param[k * 4], stiff = this.param[k * 4 + 1], damp = this.param[k * 4 + 2];
                    const cd = damp * dt;
                    const lambda = -stiff * (len - rest) * dt - vn * (cd < mass_n ? cd : mass_n);
                    this.apply_lin(k, lambda * nx, lambda * ny, lambda * nz);
                    continue;
                }
                live[k] = 1;
                if (kind === $bog_gamengine_phys3_joint.type_point) {
                    bias_lin[k3] = beta_dt * dx;
                    bias_lin[k3 + 1] = beta_dt * dy;
                    bias_lin[k3 + 2] = beta_dt * dz;
                    this.kin_lin(k);
                    this.apply_lin(k, imp_lin[k3], imp_lin[k3 + 1], imp_lin[k3 + 2]);
                    continue;
                }
                $bog_gamengine_vec_quat_rotate(tmp, qa, this.axis_a.subarray(k3, k3 + 3));
                axis.set(tmp, k3);
                const ax = tmp[0], ay = tmp[1], az = tmp[2];
                this.perp(ax, ay, az, tmp2);
                u.set(tmp2, k3);
                const ux = tmp2[0], uy = tmp2[1], uz = tmp2[2];
                const vx = ay * uz - az * uy, vy = az * ux - ax * uz, vz = ax * uy - ay * ux;
                v[k3] = vx;
                v[k3 + 1] = vy;
                v[k3 + 2] = vz;
                const min = this.param[k * 4], max = this.param[k * 4 + 1];
                if (kind === $bog_gamengine_phys3_joint.type_hinge) {
                    bias_lin[k3] = beta_dt * dx;
                    bias_lin[k3 + 1] = beta_dt * dy;
                    bias_lin[k3 + 2] = beta_dt * dz;
                    this.kin_lin(k);
                    $bog_gamengine_vec_quat_rotate(tmp3, qb, this.axis_b.subarray(k3, k3 + 3));
                    const ex = tmp3[1] * az - tmp3[2] * ay, ey = tmp3[2] * ax - tmp3[0] * az, ez = tmp3[0] * ay - tmp3[1] * ax;
                    bias_ang[k3] = -beta_dt * (ex * ux + ey * uy + ez * uz);
                    bias_ang[k3 + 1] = -beta_dt * (ex * vx + ey * vy + ez * vz);
                    this.mass_u[k] = this.mass_ang(k, ux, uy, uz);
                    this.mass_v[k] = this.mass_ang(k, vx, vy, vz);
                    let state = 0;
                    if (min < max) {
                        $bog_gamengine_vec_quat_rotate(tmp2, qa, this.ref_a.subarray(k3, k3 + 3));
                        $bog_gamengine_vec_quat_rotate(tmp3, qb, this.ref_b.subarray(k3, k3 + 3));
                        const cx = tmp2[1] * tmp3[2] - tmp2[2] * tmp3[1], cy = tmp2[2] * tmp3[0] - tmp2[0] * tmp3[2], cz = tmp2[0] * tmp3[1] - tmp2[1] * tmp3[0];
                        const angle = Math.atan2(cx * ax + cy * ay + cz * az, tmp2[0] * tmp3[0] + tmp2[1] * tmp3[1] + tmp2[2] * tmp3[2]);
                        state = angle - min < max - angle ? 1 : -1;
                        const c = state > 0 ? angle - min : max - angle;
                        this.lim_target[k] = -(c > 0 ? c : c * $bog_gamengine_phys3_joint.beta) / dt;
                        this.mass_lim[k] = this.mass_ang(k, ax, ay, az);
                    }
                    if (state !== this.lim[k])
                        imp_ang[k3 + 2] = 0;
                    this.lim[k] = state;
                    this.apply_lin(k, imp_lin[k3], imp_lin[k3 + 1], imp_lin[k3 + 2]);
                    const t1 = imp_ang[k3], t2 = imp_ang[k3 + 1], t3 = imp_ang[k3 + 2] * state;
                    this.apply_ang(k, t1 * ux + t2 * vx + t3 * ax, t1 * uy + t2 * vy + t3 * ay, t1 * uz + t2 * vz + t3 * az);
                    continue;
                }
                ra[k3] += dx;
                ra[k3 + 1] += dy;
                ra[k3 + 2] += dz;
                bias_lin[k3] = beta_dt * (dx * ux + dy * uy + dz * uz);
                bias_lin[k3 + 1] = beta_dt * (dx * vx + dy * vy + dz * vz);
                this.mass_u[k] = this.mass_lin(k, ux, uy, uz);
                this.mass_v[k] = this.mass_lin(k, vx, vy, vz);
                const q1 = this.q1, q2 = this.q2;
                $bog_gamengine_vec_quat_mul(q1, qa, this.rel.subarray(k * 4, k * 4 + 4));
                q2[0] = -qb[0];
                q2[1] = -qb[1];
                q2[2] = -qb[2];
                q2[3] = qb[3];
                $bog_gamengine_vec_quat_mul(q1, q1, q2);
                const sign = q1[3] < 0 ? -2 : 2;
                bias_ang[k3] = -beta_dt * sign * q1[0];
                bias_ang[k3 + 1] = -beta_dt * sign * q1[1];
                bias_ang[k3 + 2] = -beta_dt * sign * q1[2];
                this.kin_ang(k);
                let state = 0;
                if (min < max) {
                    const s = dx * ax + dy * ay + dz * az;
                    state = s - min < max - s ? 1 : -1;
                    const c = state > 0 ? s - min : max - s;
                    this.lim_target[k] = -(c > 0 ? c : c * $bog_gamengine_phys3_joint.beta) / dt;
                    this.mass_lim[k] = this.mass_lin(k, ax, ay, az);
                }
                if (state !== this.lim[k])
                    imp_lin[k3 + 2] = 0;
                this.lim[k] = state;
                const l1 = imp_lin[k3], l2 = imp_lin[k3 + 1], l3 = imp_lin[k3 + 2] * state;
                this.apply_lin(k, l1 * ux + l2 * vx + l3 * ax, l1 * uy + l2 * vy + l3 * ay, l1 * uz + l2 * vz + l3 * az);
                this.apply_ang(k, imp_ang[k3], imp_ang[k3 + 1], imp_ang[k3 + 2]);
            }
        }
        iterate() {
            const count = this.count;
            const type = this.type, live = this.live, kin = this.kin;
            const axis = this.axis, u = this.u, v = this.v;
            const bias_lin = this.bias_lin, bias_ang = this.bias_ang, imp_lin = this.imp_lin, imp_ang = this.imp_ang;
            const mass_u = this.mass_u, mass_v = this.mass_v, mass_lim = this.mass_lim, lim = this.lim, lim_target = this.lim_target;
            for (let k = 0; k < count; ++k) {
                if (!live[k])
                    continue;
                const k3 = k * 3, k9 = k * 9;
                const kind = type[k];
                if (kind !== $bog_gamengine_phys3_joint.type_slider) {
                    const rel = this.rel_vel(k);
                    const rx = -rel[0] - bias_lin[k3], ry = -rel[1] - bias_lin[k3 + 1], rz = -rel[2] - bias_lin[k3 + 2];
                    const lx = kin[k9] * rx + kin[k9 + 1] * ry + kin[k9 + 2] * rz;
                    const ly = kin[k9 + 3] * rx + kin[k9 + 4] * ry + kin[k9 + 5] * rz;
                    const lz = kin[k9 + 6] * rx + kin[k9 + 7] * ry + kin[k9 + 8] * rz;
                    imp_lin[k3] += lx;
                    imp_lin[k3 + 1] += ly;
                    imp_lin[k3 + 2] += lz;
                    this.apply_lin(k, lx, ly, lz);
                    if (kind === $bog_gamengine_phys3_joint.type_point)
                        continue;
                }
                const ax = axis[k3], ay = axis[k3 + 1], az = axis[k3 + 2];
                const ux = u[k3], uy = u[k3 + 1], uz = u[k3 + 2];
                const vx = v[k3], vy = v[k3 + 1], vz = v[k3 + 2];
                const state = lim[k];
                if (kind === $bog_gamengine_phys3_joint.type_hinge) {
                    let w = this.rel_ang(k);
                    const lu = -mass_u[k] * (w[0] * ux + w[1] * uy + w[2] * uz + bias_ang[k3]);
                    imp_ang[k3] += lu;
                    this.apply_ang(k, lu * ux, lu * uy, lu * uz);
                    w = this.rel_ang(k);
                    const lv = -mass_v[k] * (w[0] * vx + w[1] * vy + w[2] * vz + bias_ang[k3 + 1]);
                    imp_ang[k3 + 1] += lv;
                    this.apply_ang(k, lv * vx, lv * vy, lv * vz);
                    if (state === 0)
                        continue;
                    w = this.rel_ang(k);
                    const jv = state * (w[0] * ax + w[1] * ay + w[2] * az);
                    const old = imp_ang[k3 + 2];
                    let next = old + mass_lim[k] * (lim_target[k] - jv);
                    if (next < 0)
                        next = 0;
                    imp_ang[k3 + 2] = next;
                    const dl = (next - old) * state;
                    this.apply_ang(k, dl * ax, dl * ay, dl * az);
                    continue;
                }
                let rel = this.rel_vel(k);
                const lu = -mass_u[k] * (rel[0] * ux + rel[1] * uy + rel[2] * uz + bias_lin[k3]);
                imp_lin[k3] += lu;
                this.apply_lin(k, lu * ux, lu * uy, lu * uz);
                rel = this.rel_vel(k);
                const lv = -mass_v[k] * (rel[0] * vx + rel[1] * vy + rel[2] * vz + bias_lin[k3 + 1]);
                imp_lin[k3 + 1] += lv;
                this.apply_lin(k, lv * vx, lv * vy, lv * vz);
                if (state !== 0) {
                    rel = this.rel_vel(k);
                    const jv = state * (rel[0] * ax + rel[1] * ay + rel[2] * az);
                    const old = imp_lin[k3 + 2];
                    let next = old + mass_lim[k] * (lim_target[k] - jv);
                    if (next < 0)
                        next = 0;
                    imp_lin[k3 + 2] = next;
                    const dl = (next - old) * state;
                    this.apply_lin(k, dl * ax, dl * ay, dl * az);
                }
                const w = this.rel_ang(k);
                const rx = -w[0] - bias_ang[k3], ry = -w[1] - bias_ang[k3 + 1], rz = -w[2] - bias_ang[k3 + 2];
                const tx = kin[k9] * rx + kin[k9 + 1] * ry + kin[k9 + 2] * rz;
                const ty = kin[k9 + 3] * rx + kin[k9 + 4] * ry + kin[k9 + 5] * rz;
                const tz = kin[k9 + 6] * rx + kin[k9 + 7] * ry + kin[k9 + 8] * rz;
                imp_ang[k3] += tx;
                imp_ang[k3 + 1] += ty;
                imp_ang[k3 + 2] += tz;
                this.apply_ang(k, tx, ty, tz);
            }
        }
    }
    $.$bog_gamengine_phys3_joint = $bog_gamengine_phys3_joint;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3 extends $mol_object2 {
        static shape_sphere = 0;
        static shape_box = 1;
        static shape_capsule = 2;
        static shape_plane = 3;
        static shape_hull = 4;
        static flag_sleep = 1;
        static flag_ghost = 2;
        static flag_kinematic = 4;
        static sleep_speed = 0.05;
        static sleep_time = 0.5;
        static stat_window = 30;
        cap = 0;
        count = 0;
        pos = new Float32Array(0);
        rot = new Float32Array(0);
        vel = new Float32Array(0);
        ang = new Float32Array(0);
        mass = new Float32Array(0);
        inv_mass = new Float32Array(0);
        inv_inertia = new Float32Array(0);
        shape = new Uint8Array(0);
        size = new Float32Array(0);
        flags = new Uint8Array(0);
        trans = new Float32Array(0);
        aabb = new Float32Array(0);
        sleep_timer = new Float32Array(0);
        hull_off = new Uint32Array(0);
        hull_count = new Uint32Array(0);
        hull = new Float32Array(0);
        hull_len = 0;
        handle_at = new Int32Array(0);
        index_at = new Int32Array(0);
        handle_seq = 0;
        free = new Int32Array(0);
        free_count = 0;
        pos_view = [];
        rot_view = [];
        ang_view = [];
        trans_view = [];
        tmp_scale = new Float32Array(3);
        tmp_point = new Float32Array(3);
        broad = new $bog_gamengine_phys3_broad;
        narrow = new $bog_gamengine_phys3_narrow;
        solve = new $bog_gamengine_phys3_solve;
        joint = new $bog_gamengine_phys3_joint;
        constructor() {
            super();
            this.joint.world = this;
        }
        gravity(next) {
            return next ?? new Float32Array([0, -9.81, 0]);
        }
        friction(next) {
            return next ?? 0.5;
        }
        restitution(next) {
            return next ?? 0;
        }
        iterations(next) {
            return next ?? 8;
        }
        pull() {
            this.gravity();
            this.friction();
            this.restitution();
            this.iterations();
        }
        grow(need) {
            if (need <= this.cap)
                return;
            let cap = Math.max(this.cap, 16);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.pos = this.grow_f32(this.pos, cap * 3);
            this.rot = this.grow_f32(this.rot, cap * 4);
            this.vel = this.grow_f32(this.vel, cap * 3);
            this.ang = this.grow_f32(this.ang, cap * 3);
            this.mass = this.grow_f32(this.mass, cap);
            this.inv_mass = this.grow_f32(this.inv_mass, cap);
            this.inv_inertia = this.grow_f32(this.inv_inertia, cap * 3);
            this.size = this.grow_f32(this.size, cap * 3);
            this.trans = this.grow_f32(this.trans, cap * 16);
            this.aabb = this.grow_f32(this.aabb, cap * 6);
            this.sleep_timer = this.grow_f32(this.sleep_timer, cap);
            const shape = new Uint8Array(cap);
            shape.set(this.shape);
            this.shape = shape;
            const flags = new Uint8Array(cap);
            flags.set(this.flags);
            this.flags = flags;
            const hull_off = new Uint32Array(cap);
            hull_off.set(this.hull_off);
            this.hull_off = hull_off;
            const hull_count = new Uint32Array(cap);
            hull_count.set(this.hull_count);
            this.hull_count = hull_count;
            const handle_at = new Int32Array(cap);
            handle_at.set(this.handle_at);
            this.handle_at = handle_at;
            this.pos_view = this.views(this.pos, 3);
            this.rot_view = this.views(this.rot, 4);
            this.ang_view = this.views(this.ang, 3);
            this.trans_view = this.views(this.trans, 16);
        }
        views(buf, stride) {
            const list = [];
            for (let i = 0; i < this.cap; ++i)
                list.push(buf.subarray(i * stride, i * stride + stride));
            return list;
        }
        grow_f32(prev, len) {
            const next = new Float32Array(len);
            next.set(prev);
            return next;
        }
        add(shape, size, mass, pos, rot) {
            const i = this.count;
            this.grow(i + 1);
            this.count = i + 1;
            this.shape[i] = shape;
            this.size.set(size, i * 3);
            this.pos.set(pos, i * 3);
            if (rot)
                this.rot.set(rot, i * 4);
            else
                $bog_gamengine_vec_quat_identity(this.rot_view[i]);
            this.vel.fill(0, i * 3, i * 3 + 3);
            this.ang.fill(0, i * 3, i * 3 + 3);
            this.flags[i] = 0;
            this.sleep_timer[i] = 0;
            this.hull_off[i] = 0;
            this.hull_count[i] = 0;
            this.mass_set(i, mass);
            this.trans_write(i);
            this.bounds_of(i);
            return this.handle_new(i);
        }
        handle_grow(need) {
            if (need <= this.index_at.length)
                return;
            let len = Math.max(this.index_at.length, 16);
            while (len < need)
                len *= 2;
            const index_at = new Int32Array(len);
            index_at.set(this.index_at);
            this.index_at = index_at;
            const free = new Int32Array(len);
            free.set(this.free);
            this.free = free;
        }
        handle_new(index) {
            let handle = 0;
            if (this.free_count > 0)
                handle = this.free[--this.free_count];
            else {
                handle = ++this.handle_seq;
                this.handle_grow(handle);
            }
            this.index_at[handle - 1] = index;
            this.handle_at[index] = handle;
            return handle;
        }
        index_of(handle) {
            if (handle < 1 || handle > this.handle_seq)
                return -1;
            return this.index_at[handle - 1];
        }
        handle_of(index) {
            return index >= 0 && index < this.count ? this.handle_at[index] : 0;
        }
        pos_of(handle) {
            const i = this.index_of(handle);
            return i < 0 ? null : this.pos_view[i];
        }
        rot_of(handle) {
            const i = this.index_of(handle);
            return i < 0 ? null : this.rot_view[i];
        }
        mass_of(handle, next) {
            const i = this.index_of(handle);
            if (i < 0)
                return 0;
            if (next !== undefined)
                this.mass_set(i, next);
            return this.mass[i];
        }
        flag_set(i, flag, on) {
            if (on)
                this.flags[i] |= flag;
            else
                this.flags[i] &= ~flag;
        }
        ghost_of(handle, next) {
            const i = this.index_of(handle);
            if (i < 0)
                return false;
            const flag = $bog_gamengine_phys3.flag_ghost;
            if (next !== undefined)
                this.flag_set(i, flag, next);
            return (this.flags[i] & flag) !== 0;
        }
        kinematic_of(handle, next) {
            const i = this.index_of(handle);
            if (i < 0)
                return false;
            const flag = $bog_gamengine_phys3.flag_kinematic;
            if (next !== undefined)
                this.flag_set(i, flag, next);
            return (this.flags[i] & flag) !== 0;
        }
        move(handle, pos, rot) {
            const i = this.index_of(handle);
            if (i < 0)
                return false;
            this.pos.set(pos, i * 3);
            if (rot)
                this.rot.set(rot, i * 4);
            this.flags[i] &= ~$bog_gamengine_phys3.flag_sleep;
            this.sleep_timer[i] = 0;
            this.bounds_of(i);
            this.trans_write(i);
            return true;
        }
        mass_set(i, mass) {
            this.mass[i] = mass;
            this.inv_mass[i] = mass > 0 ? 1 / mass : 0;
            const inertia = this.inv_inertia;
            inertia.fill(0, i * 3, i * 3 + 3);
            if (mass <= 0)
                return;
            const size = this.size;
            const sx = size[i * 3], sy = size[i * 3 + 1], sz = size[i * 3 + 2];
            switch (this.shape[i]) {
                case $bog_gamengine_phys3.shape_sphere: {
                    const k = 2.5 / (mass * sx * sx);
                    inertia[i * 3] = k;
                    inertia[i * 3 + 1] = k;
                    inertia[i * 3 + 2] = k;
                    break;
                }
                case $bog_gamengine_phys3.shape_box: {
                    inertia[i * 3] = 3 / (mass * (sy * sy + sz * sz));
                    inertia[i * 3 + 1] = 3 / (mass * (sx * sx + sz * sz));
                    inertia[i * 3 + 2] = 3 / (mass * (sx * sx + sy * sy));
                    break;
                }
                case $bog_gamengine_phys3.shape_capsule: {
                    const r = sx, h = sy;
                    const vol_cyl = Math.PI * r * r * 2 * h;
                    const vol_sph = Math.PI * r * r * r * 4 / 3;
                    const m_cyl = mass * vol_cyl / (vol_cyl + vol_sph);
                    const m_sph = mass - m_cyl;
                    const side = m_cyl * (h * h / 3 + r * r / 4) + m_sph * (r * r * 2 / 5 + h * h + h * r * 3 / 4);
                    const axis = m_cyl * r * r / 2 + m_sph * r * r * 2 / 5;
                    inertia[i * 3] = 1 / side;
                    inertia[i * 3 + 1] = 1 / axis;
                    inertia[i * 3 + 2] = 1 / side;
                    break;
                }
            }
        }
        remove(handle) {
            const index = this.index_of(handle);
            if (index < 0)
                return false;
            this.drop(index);
            return true;
        }
        drop(index) {
            const last = this.count - 1;
            const handle = this.handle_at[index];
            if (index !== last) {
                this.swap(index, last);
                const moved = this.handle_at[last];
                this.handle_at[index] = moved;
                this.index_at[moved - 1] = index;
            }
            this.handle_at[last] = 0;
            if (handle > 0) {
                this.index_at[handle - 1] = -1;
                this.free[this.free_count++] = handle;
            }
            this.count = last;
            this.joint.body_remove(index, last);
            return last;
        }
        swap(index, last) {
            this.pos.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.rot.copyWithin(index * 4, last * 4, last * 4 + 4);
            this.vel.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.ang.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.mass[index] = this.mass[last];
            this.inv_mass[index] = this.inv_mass[last];
            this.inv_inertia.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.shape[index] = this.shape[last];
            this.size.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.flags[index] = this.flags[last];
            this.trans.copyWithin(index * 16, last * 16, last * 16 + 16);
            this.aabb.copyWithin(index * 6, last * 6, last * 6 + 6);
            this.sleep_timer[index] = this.sleep_timer[last];
            this.hull_off[index] = this.hull_off[last];
            this.hull_count[index] = this.hull_count[last];
        }
        hull_points(index, points) {
            const off = this.hull_len;
            const need = off + points.length;
            if (need > this.hull.length) {
                let len = Math.max(this.hull.length, 64 * 3);
                while (len < need)
                    len *= 2;
                this.hull = this.grow_f32(this.hull, len);
            }
            this.hull.set(points, off);
            this.hull_len = need;
            this.hull_off[index] = off;
            this.hull_count[index] = points.length / 3;
            this.bounds_of(index);
        }
        scale_of(i) {
            const out = this.tmp_scale;
            const size = this.size;
            const sx = size[i * 3], sy = size[i * 3 + 1], sz = size[i * 3 + 2];
            switch (this.shape[i]) {
                case $bog_gamengine_phys3.shape_sphere:
                    out[0] = out[1] = out[2] = sx * 2;
                    break;
                case $bog_gamengine_phys3.shape_box:
                    out[0] = sx * 2;
                    out[1] = sy * 2;
                    out[2] = sz * 2;
                    break;
                case $bog_gamengine_phys3.shape_capsule:
                    out[0] = out[2] = sx * 2;
                    out[1] = (sx + sy) * 2;
                    break;
                default:
                    out[0] = out[1] = out[2] = 1;
            }
            return out;
        }
        trans_write(i) {
            $bog_gamengine_vec_quat_to_mat4(this.trans_view[i], this.rot_view[i], this.pos_view[i], this.scale_of(i));
        }
        timestep = 1 / 60;
        max_steps = 4;
        pending = 0;
        steps_done = 0;
        times = new Float32Array($bog_gamengine_phys3.stat_window);
        samples = 0;
        step(dt) {
            const window = $bog_gamengine_phys3.stat_window;
            const start = performance.now();
            this.step_world(dt);
            this.times[this.samples % window] = performance.now() - start;
            ++this.samples;
        }
        step_ms() {
            const size = Math.min(this.samples, $bog_gamengine_phys3.stat_window);
            let sum = 0;
            for (let i = 0; i < size; ++i)
                sum += this.times[i];
            return size ? sum / size : 0;
        }
        step_world(dt) {
            this.steps_done = 0;
            const timestep = this.timestep;
            let pending = this.pending + dt;
            while (pending >= timestep - 1e-9 && this.steps_done < this.max_steps) {
                this.substep(timestep);
                ++this.steps_done;
                pending -= timestep;
            }
            if (pending < 0)
                pending = 0;
            this.pending = pending < timestep ? pending : timestep;
            const count = this.count;
            const flags = this.flags, rot_view = this.rot_view, pos_view = this.pos_view, trans_view = this.trans_view;
            const sleep = $bog_gamengine_phys3.flag_sleep;
            for (let i = 0; i < count; ++i) {
                if (flags[i] & sleep)
                    continue;
                $bog_gamengine_vec_quat_to_mat4(trans_view[i], rot_view[i], pos_view[i], this.scale_of(i));
            }
        }
        substep(dt) {
            const count = this.count;
            const gravity = this.gravity();
            const gx = gravity[0] * dt, gy = gravity[1] * dt, gz = gravity[2] * dt;
            const pos = this.pos, vel = this.vel, ang = this.ang;
            const inv_mass = this.inv_mass, flags = this.flags, timer = this.sleep_timer;
            const rot_view = this.rot_view, ang_view = this.ang_view;
            const sleep = $bog_gamengine_phys3.flag_sleep;
            const kind = $bog_gamengine_phys3.flag_kinematic;
            for (let i = 0; i < count; ++i) {
                if (flags[i] & (sleep | kind) || !(inv_mass[i] > 0))
                    continue;
                const p = i * 3;
                vel[p] += gx;
                vel[p + 1] += gy;
                vel[p + 2] += gz;
            }
            this.bounds();
            this.broad.find(this);
            this.narrow.collide(this, this.broad.pairs, this.broad.pair_count);
            this.joint.prepare(this, dt);
            this.solve.solve(this, this.narrow, dt, this.joint);
            const speed2 = $bog_gamengine_phys3.sleep_speed * $bog_gamengine_phys3.sleep_speed;
            const sleep_time = $bog_gamengine_phys3.sleep_time;
            const kinematic = $bog_gamengine_phys3.flag_kinematic;
            for (let i = 0; i < count; ++i) {
                if (flags[i] & sleep)
                    continue;
                const p = i * 3;
                if (flags[i] & kinematic) {
                    pos[p] += vel[p] * dt;
                    pos[p + 1] += vel[p + 1] * dt;
                    pos[p + 2] += vel[p + 2] * dt;
                    $bog_gamengine_vec_quat_integrate(rot_view[i], rot_view[i], ang_view[i], dt);
                }
                else if (inv_mass[i] > 0) {
                    const v2 = vel[p] * vel[p] + vel[p + 1] * vel[p + 1] + vel[p + 2] * vel[p + 2];
                    const w2 = ang[p] * ang[p] + ang[p + 1] * ang[p + 1] + ang[p + 2] * ang[p + 2];
                    if (v2 < speed2 && w2 < speed2) {
                        timer[i] += dt;
                        if (timer[i] >= sleep_time) {
                            flags[i] |= sleep;
                            vel.fill(0, p, p + 3);
                            ang.fill(0, p, p + 3);
                            continue;
                        }
                    }
                    else
                        timer[i] = 0;
                    pos[p] += vel[p] * dt;
                    pos[p + 1] += vel[p + 1] * dt;
                    pos[p + 2] += vel[p + 2] * dt;
                    $bog_gamengine_vec_quat_integrate(rot_view[i], rot_view[i], ang_view[i], dt);
                }
            }
        }
        bounds() {
            const count = this.count;
            const flags = this.flags;
            const sleep = $bog_gamengine_phys3.flag_sleep;
            for (let i = 0; i < count; ++i) {
                if (flags[i] & sleep)
                    continue;
                this.bounds_of(i);
            }
        }
        bounds_of(i) {
            const aabb = this.aabb;
            const a = i * 6;
            const pos = this.pos;
            const px = pos[i * 3], py = pos[i * 3 + 1], pz = pos[i * 3 + 2];
            const size = this.size;
            const sx = size[i * 3], sy = size[i * 3 + 1], sz = size[i * 3 + 2];
            switch (this.shape[i]) {
                case $bog_gamengine_phys3.shape_sphere:
                case $bog_gamengine_phys3.shape_capsule: {
                    const r = this.shape[i] === $bog_gamengine_phys3.shape_sphere ? sx : sx + sy;
                    aabb[a] = px - r;
                    aabb[a + 1] = py - r;
                    aabb[a + 2] = pz - r;
                    aabb[a + 3] = px + r;
                    aabb[a + 4] = py + r;
                    aabb[a + 5] = pz + r;
                    break;
                }
                case $bog_gamengine_phys3.shape_box: {
                    const q = this.rot;
                    const x = q[i * 4], y = q[i * 4 + 1], z = q[i * 4 + 2], w = q[i * 4 + 3];
                    const xx = x * x, yy = y * y, zz = z * z;
                    const xy = x * y, xz = x * z, yz = y * z;
                    const wx = w * x, wy = w * y, wz = w * z;
                    const ex = Math.abs(1 - 2 * (yy + zz)) * sx + Math.abs(2 * (xy - wz)) * sy + Math.abs(2 * (xz + wy)) * sz;
                    const ey = Math.abs(2 * (xy + wz)) * sx + Math.abs(1 - 2 * (xx + zz)) * sy + Math.abs(2 * (yz - wx)) * sz;
                    const ez = Math.abs(2 * (xz - wy)) * sx + Math.abs(2 * (yz + wx)) * sy + Math.abs(1 - 2 * (xx + yy)) * sz;
                    aabb[a] = px - ex;
                    aabb[a + 1] = py - ey;
                    aabb[a + 2] = pz - ez;
                    aabb[a + 3] = px + ex;
                    aabb[a + 4] = py + ey;
                    aabb[a + 5] = pz + ez;
                    break;
                }
                case $bog_gamengine_phys3.shape_hull: {
                    const hull = this.hull;
                    const off = this.hull_off[i], end = off + this.hull_count[i] * 3;
                    const rot = this.rot_view[i];
                    const point = this.tmp_point;
                    let min_x = Infinity, min_y = Infinity, min_z = Infinity;
                    let max_x = -Infinity, max_y = -Infinity, max_z = -Infinity;
                    for (let k = off; k < end; k += 3) {
                        point[0] = hull[k];
                        point[1] = hull[k + 1];
                        point[2] = hull[k + 2];
                        $bog_gamengine_vec_quat_rotate(point, rot, point);
                        if (point[0] < min_x)
                            min_x = point[0];
                        if (point[1] < min_y)
                            min_y = point[1];
                        if (point[2] < min_z)
                            min_z = point[2];
                        if (point[0] > max_x)
                            max_x = point[0];
                        if (point[1] > max_y)
                            max_y = point[1];
                        if (point[2] > max_z)
                            max_z = point[2];
                    }
                    if (end === off)
                        min_x = min_y = min_z = max_x = max_y = max_z = 0;
                    aabb[a] = px + min_x;
                    aabb[a + 1] = py + min_y;
                    aabb[a + 2] = pz + min_z;
                    aabb[a + 3] = px + max_x;
                    aabb[a + 4] = py + max_y;
                    aabb[a + 5] = pz + max_z;
                    break;
                }
                default: {
                    aabb[a] = aabb[a + 1] = aabb[a + 2] = -1e9;
                    aabb[a + 3] = aabb[a + 4] = aabb[a + 5] = 1e9;
                }
            }
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3.prototype, "gravity", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3.prototype, "friction", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3.prototype, "restitution", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3.prototype, "iterations", null);
    $.$bog_gamengine_phys3 = $bog_gamengine_phys3;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_scene extends $bog_gamengine_node {
        clock(next) {
            return next ?? new $bog_gamengine_clock;
        }
        is_scene() {
            return true;
        }
        auto_nodes(next) {
            return next ?? [];
        }
        nodes() {
            const list = [];
            const brains = (node) => {
                const kids = node.kids();
                for (let i = 0; i < kids.length; ++i) {
                    const kid = kids[i];
                    if (!kid.parent())
                        kid.parent(node);
                    if (!kid.is_brain())
                        continue;
                    list.push(kid);
                    rest(kid);
                }
            };
            const rest = (node) => {
                const kids = node.kids();
                for (let i = 0; i < kids.length; ++i) {
                    const kid = kids[i];
                    if (!kid.parent())
                        kid.parent(node);
                    if (kid.is_brain())
                        continue;
                    brains(kid);
                    list.push(kid);
                    rest(kid);
                }
            };
            brains(this);
            rest(this);
            const auto = this.auto_nodes();
            for (let i = 0; i < auto.length; ++i) {
                if (!auto[i].parent())
                    auto[i].parent(this);
                brains(auto[i]);
                list.push(auto[i]);
                rest(auto[i]);
            }
            return list;
        }
        lights() {
            const nodes = this.nodes();
            const lights = [];
            for (let i = 0; i < nodes.length && lights.length < 8; ++i) {
                const node = nodes[i];
                if (node instanceof $bog_gamengine_light)
                    lights.push(node);
            }
            return lights;
        }
        Shader_sprite(next) {
            return next ?? new this.$.$bog_gamengine_shader_sprite;
        }
        Shader_solid(next) {
            return next ?? new this.$.$bog_gamengine_shader_solid;
        }
        Shader_plain(next) {
            return next ?? new this.$.$bog_gamengine_shader_solid_plain;
        }
        Shape_quad(next) {
            return next ?? new this.$.$bog_gamengine_shape_quad;
        }
        Batch(key) {
            return new this.$.$bog_gamengine_batch;
        }
        node_source(node) {
            const probe = node;
            if (typeof probe.is_source !== 'function' || !probe.is_source())
                return null;
            return probe.source?.() ?? null;
        }
        node_drawn(node) {
            const probe = node;
            return typeof probe.atlas === 'function'
                && typeof probe.layer === 'function'
                && typeof probe.uv === 'function';
        }
        node_shader(node) {
            const own = node.shader?.();
            if (own)
                return own;
            if (typeof node.normal_layer !== 'function')
                return this.Shader_sprite();
            return node.atlas() ? this.Shader_solid() : this.Shader_plain();
        }
        node_shape(node) {
            return typeof node.shape === 'function' ? node.shape() : this.Shape_quad();
        }
        auto_batches() {
            const nodes = this.nodes();
            const drawn = [];
            const sources = new Map();
            for (let i = 0; i < nodes.length; ++i) {
                const node = nodes[i];
                const source = this.node_source(node);
                if (source) {
                    const batch = this.Batch('source ' + $bog_gamengine_batch_group_id(node));
                    batch.shader(this.node_shader(node));
                    batch.shape(this.node_shape(node));
                    batch.atlas(node.atlas());
                    batch.source(source);
                    sources.set(node, batch);
                    continue;
                }
                if (this.node_drawn(node))
                    drawn.push(node);
            }
            const parts = $bog_gamengine_batch_group(drawn, node => this.node_shader(node), node => this.node_shape(node));
            const grouped = new Map();
            for (let i = 0; i < parts.length; ++i) {
                const part = parts[i];
                const batch = this.Batch(part.key);
                batch.shader(part.shader);
                batch.shape(part.shape);
                batch.atlas(part.atlas);
                batch.nodes(part.nodes);
                grouped.set(part.nodes[0], batch);
            }
            const batches = [];
            for (let i = 0; i < nodes.length; ++i) {
                const node = nodes[i];
                const batch = sources.get(node) ?? grouped.get(node);
                if (batch)
                    batches.push(batch);
            }
            return batches;
        }
        batches(next) {
            return next ?? this.auto_batches();
        }
        phys(next) {
            return next ?? null;
        }
        phys3(next) {
            return next ?? null;
        }
        input(next) {
            return next ?? null;
        }
        cam(next) {
            return next ?? null;
        }
        aspect(next = 1) {
            return next;
        }
        frame_done = -1;
        frustum = new Float32Array(24);
        eye = new Float32Array(3);
        step() {
            const frame = this.clock().frame();
            const dt = this.clock().dt();
            const input = this.input();
            const nodes = this.nodes();
            const phys = this.phys();
            const phys3 = this.phys3();
            phys?.pull();
            phys3?.pull();
            const cam = this.cam();
            const aspect = this.aspect();
            if (frame !== this.frame_done) {
                this.frame_done = frame;
                input?.poll();
                for (let i = 0; i < nodes.length; ++i)
                    nodes[i].step(dt);
                phys?.step(dt);
                phys3?.step(dt);
                if (cam && nodes.indexOf(cam) < 0) {
                    if (!cam.parent())
                        cam.parent(this);
                    cam.step(dt);
                }
            }
            if (cam) {
                cam.frustum(aspect, this.frustum);
                const world = cam.world();
                this.eye[0] = world[12];
                this.eye[1] = world[13];
                this.eye[2] = world[14];
            }
            const batches = this.batches();
            for (let i = 0; i < batches.length; ++i)
                batches[i].fill(cam ? this.frustum : null, cam ? this.eye : null);
            return frame;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "clock", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "auto_nodes", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "nodes", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "lights", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "Shader_sprite", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "Shader_solid", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "Shader_plain", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "Shape_quad", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_scene.prototype, "Batch", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "auto_batches", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "batches", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "phys", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "phys3", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "input", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "cam", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "aspect", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "step", null);
    $.$bog_gamengine_scene = $bog_gamengine_scene;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_post extends $bog_gamengine_shader {
        face() {
            return {
                glob: {
                    source: 'sampler2D',
                    texel: 'vec2',
                },
                pipe: {
                    pipe_uv: 'vec2',
                },
                output: { color: 'vec4' },
            };
        }
        vert() {
            return `
				void main() {
					vec2 corner = vec2( float( ( gl_VertexID << 1 ) & 2 ), float( gl_VertexID & 2 ) );
					pipe_uv = corner;
					gl_Position = vec4( corner * 2.0 - 1.0, 0.0, 1.0 );
				}
			`;
        }
        frag() {
            return `
				void main() {
					color = texture( source, pipe_uv );
				}
			`;
        }
        steps() {
            return [{ shader: this, scale: 1, from: 'in', extra: null }];
        }
    }
    $.$bog_gamengine_shader_post = $bog_gamengine_shader_post;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_post_tone extends $bog_gamengine_shader_post {
        frag() {
            return `
				vec3 aces( vec3 hue ) {
					vec3 top = hue * ( 2.51 * hue + 0.03 );
					vec3 bottom = hue * ( 2.43 * hue + 0.59 ) + 0.14;
					return top / bottom;
				}
				void main() {
					vec4 base = texture( source, pipe_uv );
					vec3 white = aces( vec3( 1.0 ) );
					color = vec4( clamp( aces( max( base.rgb, vec3( 0.0 ) ) ) / white, 0.0, 1.0 ), base.a );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_post_tone = $bog_gamengine_shader_post_tone;
})($ || ($ = {}));

;
	($.$bog_gamengine_draw) = class $bog_gamengine_draw extends ($.$mol_view) {
		width(){
			return 0;
		}
		height(){
			return 0;
		}
		dom_name(){
			return "canvas";
		}
		field(){
			return {
				...(super.field()), 
				"width": (this.width()), 
				"height": (this.height())
			};
		}
		dpr(){
			return 1;
		}
		scene(){
			const obj = new this.$.$bog_gamengine_scene();
			return obj;
		}
		cam(){
			const obj = new this.$.$bog_gamengine_cam();
			return obj;
		}
		light_dir(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		clear(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		fog(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		fog_color(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		ambient(){
			return 0.35;
		}
		wireframe(next){
			if(next !== undefined) return next;
			return false;
		}
		shadows(next){
			if(next !== undefined) return next;
			return true;
		}
		shadow_size(next){
			if(next !== undefined) return next;
			return 2048;
		}
		shadow_range(next){
			if(next !== undefined) return next;
			return 20;
		}
		post(next){
			if(next !== undefined) return next;
			return true;
		}
		Tone(){
			const obj = new this.$.$bog_gamengine_shader_post_tone();
			return obj;
		}
		passes(){
			return [(this.Tone())];
		}
		stat(){
			return "";
		}
		report(){
			return {
				"tick": 0, 
				"fill": 0, 
				"shadow": 0, 
				"main": 0, 
				"post": 0, 
				"batches": 0, 
				"instances": 0, 
				"draws": 0, 
				"triangles": 0, 
				"bytes": 0
			};
		}
	};
	($mol_mem(($.$bog_gamengine_draw.prototype), "scene"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "cam"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "light_dir"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "clear"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "fog"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "fog_color"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "wireframe"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "shadows"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "shadow_size"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "shadow_range"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "post"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "Tone"));


;
"use strict";
var $;
(function ($) {
    const magic = 0x46546C67;
    const chunk_json = 0x4E4F534A;
    const chunk_bin = 0x004E4942;
    const dims = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
    const zero3 = [0, 0, 0];
    const one3 = [1, 1, 1];
    const unit4 = [0, 0, 0, 1];
    class $bog_gamengine_shape_gltf extends $bog_gamengine_shape {
        data(next) {
            return next ?? null;
        }
        chunks() {
            const data = this.data();
            if (!data)
                return $mol_fail(new Error('glTF has no data'));
            const view = new DataView(data);
            if (view.getUint32(0, true) !== magic)
                return $mol_fail(new Error('glTF is not a GLB container'));
            let json = null;
            let bin = null;
            let at = 12;
            while (at + 8 <= data.byteLength) {
                const length = view.getUint32(at, true);
                const type = view.getUint32(at + 4, true);
                const body = data.slice(at + 8, at + 8 + length);
                if (type === chunk_json)
                    json = JSON.parse(new TextDecoder().decode(body));
                if (type === chunk_bin)
                    bin = body;
                at += 8 + length;
            }
            if (!json)
                return $mol_fail(new Error('GLB has no JSON chunk'));
            return { json, bin };
        }
        json(next) {
            return next ?? this.chunks().json;
        }
        bin(next) {
            return next ?? this.chunks().bin ?? $mol_fail(new Error('GLB has no BIN chunk'));
        }
        accessor(index) {
            const doc = this.json();
            const accessor = doc.accessors?.[index] ?? $mol_fail(new Error(`glTF has no accessor ${index}`));
            const dim = dims[accessor.type] ?? $mol_fail(new Error(`glTF accessor type ${accessor.type} is not supported`));
            const out = new Float32Array(accessor.count * dim);
            if (accessor.bufferView === undefined)
                return out;
            const bview = doc.bufferViews?.[accessor.bufferView] ?? $mol_fail(new Error(`glTF has no bufferView ${accessor.bufferView}`));
            const view = new DataView(this.bin(), (bview.byteOffset ?? 0) + (accessor.byteOffset ?? 0));
            const unit = accessor.componentType === 5126 || accessor.componentType === 5125 ? 4 : accessor.componentType === 5123 ? 2 : 1;
            const stride = bview.byteStride ?? unit * dim;
            for (let i = 0; i < accessor.count; ++i) {
                for (let d = 0; d < dim; ++d) {
                    const at = i * stride + d * unit;
                    switch (accessor.componentType) {
                        case 5126:
                            out[i * dim + d] = view.getFloat32(at, true);
                            break;
                        case 5125:
                            out[i * dim + d] = view.getUint32(at, true);
                            break;
                        case 5123:
                            out[i * dim + d] = view.getUint16(at, true);
                            break;
                        case 5121:
                            out[i * dim + d] = view.getUint8(at);
                            break;
                        case 5122:
                            out[i * dim + d] = view.getInt16(at, true);
                            break;
                        case 5120:
                            out[i * dim + d] = view.getInt8(at);
                            break;
                        default: return $mol_fail(new Error(`glTF component type ${accessor.componentType} is not supported`));
                    }
                }
            }
            return out;
        }
        arrays() {
            const doc = this.json();
            const prim = doc.meshes?.[0]?.primitives?.[0] ?? $mol_fail(new Error('glTF has no mesh primitive'));
            const attrs = prim.attributes;
            if (attrs.POSITION === undefined)
                return $mol_fail(new Error('glTF primitive has no POSITION'));
            const pos = this.accessor(attrs.POSITION);
            const norm = attrs.NORMAL === undefined ? null : this.accessor(attrs.NORMAL);
            const tex = attrs.TEXCOORD_0 === undefined ? null : this.accessor(attrs.TEXCOORD_0);
            const bone = attrs.JOINTS_0 === undefined ? null : this.accessor(attrs.JOINTS_0);
            const load = attrs.WEIGHTS_0 === undefined ? null : this.accessor(attrs.WEIGHTS_0);
            const index = prim.indices === undefined ? null : this.accessor(prim.indices);
            const size = index ? index.length : pos.length / 3;
            const geometry = new Float32Array(size * 3);
            const normals = new Float32Array(size * 3);
            const skin = new Float32Array(size * 2);
            const joints = new Float32Array(bone ? size * 4 : 0);
            const weights = new Float32Array(load ? size * 4 : 0);
            for (let i = 0; i < size; ++i) {
                const v = index ? index[i] : i;
                for (let axis = 0; axis < 3; ++axis) {
                    geometry[i * 3 + axis] = pos[v * 3 + axis];
                    if (norm)
                        normals[i * 3 + axis] = norm[v * 3 + axis];
                }
                if (tex) {
                    skin[i * 2] = tex[v * 2];
                    skin[i * 2 + 1] = 1 - tex[v * 2 + 1];
                }
                for (let k = 0; k < 4; ++k) {
                    if (bone)
                        joints[i * 4 + k] = bone[v * 4 + k];
                    if (load)
                        weights[i * 4 + k] = load[v * 4 + k];
                }
            }
            if (!norm) {
                for (let t = 0; t + 2 < size; t += 3) {
                    const a = t * 3;
                    const b = a + 3;
                    const c = a + 6;
                    const ux = geometry[b] - geometry[a];
                    const uy = geometry[b + 1] - geometry[a + 1];
                    const uz = geometry[b + 2] - geometry[a + 2];
                    const vx = geometry[c] - geometry[a];
                    const vy = geometry[c + 1] - geometry[a + 1];
                    const vz = geometry[c + 2] - geometry[a + 2];
                    let nx = uy * vz - uz * vy;
                    let ny = uz * vx - ux * vz;
                    let nz = ux * vy - uy * vx;
                    const len = Math.hypot(nx, ny, nz) || 1;
                    nx /= len;
                    ny /= len;
                    nz /= len;
                    for (let k = 0; k < 3; ++k) {
                        normals[a + k * 3] = nx;
                        normals[a + k * 3 + 1] = ny;
                        normals[a + k * 3 + 2] = nz;
                    }
                }
            }
            return { geometry, normals, skin, joints, weights };
        }
        geometry() {
            return this.arrays().geometry;
        }
        normals() {
            return this.arrays().normals;
        }
        skin() {
            return this.arrays().skin;
        }
        joints() {
            return this.arrays().joints;
        }
        weights() {
            return this.arrays().weights;
        }
        skeleton() {
            const doc = this.json();
            const skin = doc.skins?.[0];
            if (!skin)
                return null;
            const nodes = doc.nodes ?? [];
            const count = skin.joints.length;
            const at_joint = new Map();
            for (let i = 0; i < count; ++i)
                at_joint.set(skin.joints[i], i);
            const parents = new Int32Array(count).fill(-1);
            for (let i = 0; i < nodes.length; ++i) {
                const kids = nodes[i].children;
                if (!kids)
                    continue;
                for (let k = 0; k < kids.length; ++k) {
                    const kid = at_joint.get(kids[k]);
                    if (kid === undefined)
                        continue;
                    parents[kid] = at_joint.get(i) ?? -1;
                }
            }
            const names = [];
            const base = new Float32Array(count * 10);
            for (let i = 0; i < count; ++i) {
                const node = nodes[skin.joints[i]] ?? {};
                names.push(node.name ?? `joint${i}`);
                const move = node.translation ?? zero3;
                const turn = node.rotation ?? unit4;
                const size = node.scale ?? one3;
                for (let k = 0; k < 3; ++k)
                    base[i * 10 + k] = move[k];
                for (let k = 0; k < 4; ++k)
                    base[i * 10 + 3 + k] = turn[k];
                for (let k = 0; k < 3; ++k)
                    base[i * 10 + 7 + k] = size[k];
            }
            const binds = new Float32Array(count * 16);
            if (skin.inverseBindMatrices === undefined) {
                for (let i = 0; i < count; ++i)
                    for (let k = 0; k < 4; ++k)
                        binds[i * 16 + k * 5] = 1;
            }
            else {
                const source = this.accessor(skin.inverseBindMatrices);
                for (let k = 0; k < binds.length && k < source.length; ++k)
                    binds[k] = source[k];
            }
            const order = new Int32Array(count);
            const ready = new Uint8Array(count);
            let done = 0;
            while (done < count) {
                const was = done;
                for (let i = 0; i < count; ++i) {
                    if (ready[i])
                        continue;
                    const parent = parents[i];
                    if (parent >= 0 && !ready[parent])
                        continue;
                    ready[i] = 1;
                    order[done++] = i;
                }
                if (done === was)
                    return $mol_fail(new Error('glTF skeleton has a cycle'));
            }
            return { count, names, parents, order, base, binds };
        }
        clips() {
            const doc = this.json();
            const clips = new Map();
            const skin = doc.skins?.[0];
            if (!skin)
                return clips;
            const at_joint = new Map();
            for (let i = 0; i < skin.joints.length; ++i)
                at_joint.set(skin.joints[i], i);
            const anims = doc.animations ?? [];
            for (let a = 0; a < anims.length; ++a) {
                const anim = anims[a];
                const channels = [];
                let duration = 0;
                for (let c = 0; c < anim.channels.length; ++c) {
                    const target = anim.channels[c].target;
                    if (target.path !== 'translation' && target.path !== 'rotation' && target.path !== 'scale')
                        continue;
                    const joint = target.node === undefined ? undefined : at_joint.get(target.node);
                    if (joint === undefined)
                        continue;
                    const sampler = anim.samplers[anim.channels[c].sampler]
                        ?? $mol_fail(new Error(`glTF animation has no sampler ${anim.channels[c].sampler}`));
                    const interp = sampler.interpolation ?? 'LINEAR';
                    if (interp !== 'LINEAR' && interp !== 'STEP') {
                        return $mol_fail(new Error(`glTF animation interpolation ${interp} is not supported`));
                    }
                    const times = this.accessor(sampler.input);
                    const values = this.accessor(sampler.output);
                    if (times.length)
                        duration = Math.max(duration, times[times.length - 1]);
                    channels.push({ joint, path: target.path, step: interp === 'STEP', times, values });
                }
                const name = anim.name ?? `clip${a}`;
                clips.set(name, { name, duration, channels });
            }
            return clips;
        }
        mode() {
            return 'triangles';
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "data", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "chunks", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "json", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "bin", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "arrays", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "skeleton", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "clips", null);
    $.$bog_gamengine_shape_gltf = $bog_gamengine_shape_gltf;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$bog_gamengine_skin_max = 64;
    $.$bog_gamengine_skin_empty = new Float32Array(0);
    function $bog_gamengine_skin_mat_trs(out, at, trs, from) {
        const x = trs[from + 3];
        const y = trs[from + 4];
        const z = trs[from + 5];
        const w = trs[from + 6];
        const sx = trs[from + 7];
        const sy = trs[from + 8];
        const sz = trs[from + 9];
        const xx = x * x;
        const yy = y * y;
        const zz = z * z;
        const xy = x * y;
        const xz = x * z;
        const yz = y * z;
        const wx = w * x;
        const wy = w * y;
        const wz = w * z;
        out[at] = (1 - 2 * (yy + zz)) * sx;
        out[at + 1] = 2 * (xy + wz) * sx;
        out[at + 2] = 2 * (xz - wy) * sx;
        out[at + 3] = 0;
        out[at + 4] = 2 * (xy - wz) * sy;
        out[at + 5] = (1 - 2 * (xx + zz)) * sy;
        out[at + 6] = 2 * (yz + wx) * sy;
        out[at + 7] = 0;
        out[at + 8] = 2 * (xz + wy) * sz;
        out[at + 9] = 2 * (yz - wx) * sz;
        out[at + 10] = (1 - 2 * (xx + yy)) * sz;
        out[at + 11] = 0;
        out[at + 12] = trs[from];
        out[at + 13] = trs[from + 1];
        out[at + 14] = trs[from + 2];
        out[at + 15] = 1;
        return out;
    }
    $.$bog_gamengine_skin_mat_trs = $bog_gamengine_skin_mat_trs;
    function $bog_gamengine_skin_mat_mul(out, at, left, left_at, right, right_at) {
        for (let col = 0; col < 4; ++col) {
            const b0 = right[right_at + col * 4];
            const b1 = right[right_at + col * 4 + 1];
            const b2 = right[right_at + col * 4 + 2];
            const b3 = right[right_at + col * 4 + 3];
            for (let row = 0; row < 4; ++row) {
                out[at + col * 4 + row] =
                    left[left_at + row] * b0
                        + left[left_at + 4 + row] * b1
                        + left[left_at + 8 + row] * b2
                        + left[left_at + 12 + row] * b3;
            }
        }
        return out;
    }
    $.$bog_gamengine_skin_mat_mul = $bog_gamengine_skin_mat_mul;
    function $bog_gamengine_skin_quat_mix(out, at, left, left_at, right, right_at, weight) {
        const ax = left[left_at];
        const ay = left[left_at + 1];
        const az = left[left_at + 2];
        const aw = left[left_at + 3];
        let bx = right[right_at];
        let by = right[right_at + 1];
        let bz = right[right_at + 2];
        let bw = right[right_at + 3];
        let dot = ax * bx + ay * by + az * bz + aw * bw;
        if (dot < 0) {
            dot = -dot;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }
        let ka = 1 - weight;
        let kb = weight;
        if (dot < 0.9995) {
            const angle = Math.acos(dot > 1 ? 1 : dot);
            const sin = Math.sin(angle);
            ka = Math.sin(ka * angle) / sin;
            kb = Math.sin(kb * angle) / sin;
        }
        const x = ax * ka + bx * kb;
        const y = ay * ka + by * kb;
        const z = az * ka + bz * kb;
        const w = aw * ka + bw * kb;
        const len = Math.sqrt(x * x + y * y + z * z + w * w) || 1;
        out[at] = x / len;
        out[at + 1] = y / len;
        out[at + 2] = z / len;
        out[at + 3] = w / len;
        return out;
    }
    $.$bog_gamengine_skin_quat_mix = $bog_gamengine_skin_quat_mix;
    function $bog_gamengine_skin_sample(channel, time, out, at) {
        const times = channel.times;
        const values = channel.values;
        const size = times.length;
        if (!size)
            return out;
        const shift = channel.path === 'translation' ? 0 : channel.path === 'rotation' ? 3 : 7;
        const dim = channel.path === 'rotation' ? 4 : 3;
        let from = 0;
        while (from < size - 1 && times[from + 1] <= time)
            ++from;
        const to = from + 1 < size ? from + 1 : from;
        const span = times[to] - times[from];
        let part = span > 0 ? (time - times[from]) / span : 0;
        if (part < 0)
            part = 0;
        if (part > 1)
            part = 1;
        if (channel.step)
            part = 0;
        if (dim === 4) {
            $bog_gamengine_skin_quat_mix(out, at + shift, values, from * 4, values, to * 4, part);
        }
        else {
            for (let k = 0; k < 3; ++k) {
                out[at + shift + k] = values[from * 3 + k] * (1 - part) + values[to * 3 + k] * part;
            }
        }
        return out;
    }
    $.$bog_gamengine_skin_sample = $bog_gamengine_skin_sample;
    function $bog_gamengine_skin_bones(batch) {
        const nodes = batch.nodes();
        if (nodes.length !== 1)
            return null;
        const node = nodes[0];
        const skin = typeof node.skin === 'function' ? node.skin() : null;
        return skin ? skin.pose() : null;
    }
    $.$bog_gamengine_skin_bones = $bog_gamengine_skin_bones;
    function $bog_gamengine_skin_shape_joints(shape) {
        const probe = shape;
        return typeof probe.joints === 'function' ? probe.joints() : $.$bog_gamengine_skin_empty;
    }
    $.$bog_gamengine_skin_shape_joints = $bog_gamengine_skin_shape_joints;
    function $bog_gamengine_skin_shape_weights(shape) {
        const probe = shape;
        return typeof probe.weights === 'function' ? probe.weights() : $.$bog_gamengine_skin_empty;
    }
    $.$bog_gamengine_skin_shape_weights = $bog_gamengine_skin_shape_weights;
    class $bog_gamengine_skin extends $mol_object2 {
        shape(next) {
            return next ?? null;
        }
        clip(next) {
            return next ?? '';
        }
        mix(next) {
            return next ?? '';
        }
        weight(next) {
            return next ?? 0;
        }
        time(next) {
            return next ?? 0;
        }
        loop(next) {
            return next ?? true;
        }
        speed(next) {
            return next ?? 1;
        }
        blend(clip, weight) {
            this.mix(clip);
            this.weight(weight);
            return weight;
        }
        duration() {
            return this.shape()?.clips().get(this.clip())?.duration ?? 0;
        }
        version = 0;
        bones = $.$bog_gamengine_skin_empty;
        locals = $.$bog_gamengine_skin_empty;
        worlds = $.$bog_gamengine_skin_empty;
        trs_main = $.$bog_gamengine_skin_empty;
        trs_mix = $.$bog_gamengine_skin_empty;
        done_skeleton = null;
        done_time = NaN;
        done_clip = '';
        done_mix = '';
        done_weight = NaN;
        prepare() {
            if (this.bones.length)
                return this.bones;
            const max = $.$bog_gamengine_skin_max;
            this.bones = new Float32Array(max * 16);
            for (let i = 0; i < max; ++i)
                for (let k = 0; k < 4; ++k)
                    this.bones[i * 16 + k * 5] = 1;
            this.locals = new Float32Array(max * 16);
            this.worlds = new Float32Array(max * 16);
            this.trs_main = new Float32Array(max * 10);
            this.trs_mix = new Float32Array(max * 10);
            return this.bones;
        }
        apply(clip, time, trs, count, base) {
            for (let k = 0; k < count * 10; ++k)
                trs[k] = base[k];
            if (!clip)
                return trs;
            const channels = clip.channels;
            for (let c = 0; c < channels.length; ++c) {
                const channel = channels[c];
                if (channel.joint >= count)
                    continue;
                $bog_gamengine_skin_sample(channel, time, trs, channel.joint * 10);
            }
            return trs;
        }
        pose() {
            const shape = this.shape();
            const skeleton = shape?.skeleton() ?? null;
            this.prepare();
            if (!skeleton)
                return this.bones;
            if (skeleton.count > $.$bog_gamengine_skin_max) {
                return $mol_fail(new Error(`Skeleton has more than ${$.$bog_gamengine_skin_max} joints`));
            }
            const time = this.time();
            const clip = this.clip();
            const mix = this.mix();
            const weight = this.weight();
            if (this.done_skeleton === skeleton
                && this.done_time === time
                && this.done_clip === clip
                && this.done_mix === mix
                && this.done_weight === weight)
                return this.bones;
            const clips = shape.clips();
            const count = skeleton.count;
            const trs = this.trs_main;
            this.apply(clips.get(clip), time, trs, count, skeleton.base);
            if (mix && weight > 0) {
                const other = this.trs_mix;
                this.apply(clips.get(mix), time, other, count, skeleton.base);
                for (let i = 0; i < count; ++i) {
                    const at = i * 10;
                    for (let k = 0; k < 3; ++k) {
                        trs[at + k] = trs[at + k] * (1 - weight) + other[at + k] * weight;
                        trs[at + 7 + k] = trs[at + 7 + k] * (1 - weight) + other[at + 7 + k] * weight;
                    }
                    $bog_gamengine_skin_quat_mix(trs, at + 3, trs, at + 3, other, at + 3, weight);
                }
            }
            for (let o = 0; o < count; ++o) {
                const i = skeleton.order[o];
                $bog_gamengine_skin_mat_trs(this.locals, i * 16, trs, i * 10);
                const parent = skeleton.parents[i];
                if (parent < 0) {
                    for (let k = 0; k < 16; ++k)
                        this.worlds[i * 16 + k] = this.locals[i * 16 + k];
                }
                else {
                    $bog_gamengine_skin_mat_mul(this.worlds, i * 16, this.worlds, parent * 16, this.locals, i * 16);
                }
                $bog_gamengine_skin_mat_mul(this.bones, i * 16, this.worlds, i * 16, skeleton.binds, i * 16);
            }
            this.done_skeleton = skeleton;
            this.done_time = time;
            this.done_clip = clip;
            this.done_mix = mix;
            this.done_weight = weight;
            ++this.version;
            return this.bones;
        }
        step(dt) {
            const speed = this.speed();
            const duration = this.duration();
            if (!speed || !duration)
                return;
            let time = this.time() + dt * speed;
            if (this.loop()) {
                time = time % duration;
                if (time < 0)
                    time += duration;
            }
            else {
                if (time > duration)
                    time = duration;
                if (time < 0)
                    time = 0;
            }
            this.time(time);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "shape", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "clip", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "mix", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "weight", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "time", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "loop", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "speed", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "duration", null);
    $.$bog_gamengine_skin = $bog_gamengine_skin;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_skin_gl_data extends Object {
        gl;
        width;
        height;
        native;
        constructor(gl, width, height) {
            super();
            this.gl = gl;
            this.width = width;
            this.height = height;
            this.native = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.native);
            gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA32F, width, height);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        send(floats) {
            const gl = this.gl;
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            gl.bindTexture(gl.TEXTURE_2D, this.native);
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.width, this.height, gl.RGBA, gl.FLOAT, floats);
            return floats;
        }
        dispose() {
            this.gl.deleteTexture(this.native);
            return this;
        }
    }
    $.$bog_gamengine_skin_gl_data = $bog_gamengine_skin_gl_data;
    function $bog_gamengine_skin_gl_bones(gl) {
        return new $bog_gamengine_skin_gl_data(gl, 4, $bog_gamengine_skin_max);
    }
    $.$bog_gamengine_skin_gl_bones = $bog_gamengine_skin_gl_bones;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_depth extends $bog_gamengine_shader {
        face() {
            return {
                glob: {
                    shadow_mat: 'mat4',
                },
                input: {
                    vertex: 'vec3',
                    uv: 'vec2',
                    normal: 'vec3',
                    inst_trans: 'mat4',
                    inst_tint: 'vec4',
                    inst_layer: 'float',
                    inst_uv: 'vec4',
                    inst_material: 'vec4',
                    inst_normal_layer: 'float',
                },
            };
        }
        vert() {
            return `
				void main() {
					gl_Position = shadow_mat * inst_trans * vec4( vertex, 1.0 );
				}
			`;
        }
        frag() {
            return `
				void main() {}
			`;
        }
    }
    $.$bog_gamengine_shader_depth = $bog_gamengine_shader_depth;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_gamengine_draw_slot extends Object {
            batch = null;
            program = null;
            proj = null;
            view = null;
            light_count = null;
            light_pos = null;
            light_dir = null;
            light_color = null;
            ambient = null;
            cam_pos = null;
            fog = null;
            fog_color = null;
            wireframe = null;
            shadow_mat = null;
            shadow_map = null;
            shadow_light = null;
            bones = null;
            bones_tex = null;
            depth = false;
            ready = false;
            vao = null;
            vertex = null;
            live = false;
            trans = null;
            tint = null;
            layer = null;
            uv = null;
            material = null;
            normal_layer = null;
            buffers = [];
            atlas = null;
            sampler = null;
            tex = null;
            prim = 0;
            wire = null;
            size = 0;
            cap = 0;
            tris = 0;
            stride = 0;
            bytes_shape = 0;
            bytes = 0;
            dispose(gl) {
                for (let i = 0; i < this.buffers.length; ++i)
                    gl.deleteBuffer(this.buffers[i].native);
                this.buffers = [];
                gl.deleteVertexArray(this.vao);
                this.bones_tex?.dispose();
                this.bones_tex = null;
                return this;
            }
        }
        $$.$bog_gamengine_draw_slot = $bog_gamengine_draw_slot;
        class $bog_gamengine_draw_tex extends Object {
            atlas = null;
            native = null;
            dispose(gl) {
                if (this.native)
                    gl.deleteTexture(this.native);
                this.native = null;
                return this;
            }
        }
        $$.$bog_gamengine_draw_tex = $bog_gamengine_draw_tex;
        const stat_window = 30;
        const light_max = 8;
        function $bog_gamengine_draw_shadow_mat(dir, at, center, range, out) {
            let dx = dir[at];
            let dy = dir[at + 1];
            let dz = dir[at + 2];
            const len = Math.hypot(dx, dy, dz) || 1;
            dx /= len;
            dy /= len;
            dz /= len;
            const flat = Math.abs(dy) > 0.99;
            const ax = 0;
            const ay = flat ? 0 : 1;
            const az = flat ? 1 : 0;
            let rx = ay * dz - az * dy;
            let ry = az * dx - ax * dz;
            let rz = ax * dy - ay * dx;
            const rl = Math.hypot(rx, ry, rz) || 1;
            rx /= rl;
            ry /= rl;
            rz /= rl;
            const ux = dy * rz - dz * ry;
            const uy = dz * rx - dx * rz;
            const uz = dx * ry - dy * rx;
            const cx = center[0];
            const cy = center[1];
            const cz = center[2];
            out[0] = rx / range;
            out[1] = ux / range;
            out[2] = dx / range;
            out[3] = 0;
            out[4] = ry / range;
            out[5] = uy / range;
            out[6] = dy / range;
            out[7] = 0;
            out[8] = rz / range;
            out[9] = uz / range;
            out[10] = dz / range;
            out[11] = 0;
            out[12] = -(rx * cx + ry * cy + rz * cz) / range;
            out[13] = -(ux * cx + uy * cy + uz * cz) / range;
            out[14] = -(dx * cx + dy * cy + dz * cz) / range;
            out[15] = 1;
            return out;
        }
        $$.$bog_gamengine_draw_shadow_mat = $bog_gamengine_draw_shadow_mat;
        class $bog_gamengine_draw extends $.$bog_gamengine_draw {
            slots_all = new WeakMap();
            slots_last = [];
            textures_all = new WeakMap();
            textures_last = [];
            ambient_vec = new Float32Array(3);
            cam_pos_vec = new Float32Array(3);
            fog_vec = new Float32Array(2);
            fog_color_vec = new Float32Array(3);
            lights_pos = new Float32Array(light_max * 4);
            lights_dir = new Float32Array(light_max * 4);
            lights_color = new Float32Array(light_max * 4);
            lights_count = 0;
            wire_off = new Float32Array(1);
            wire_on = new Float32Array([1]);
            shadow_mat_buf = new Float32Array(16);
            shadow_last = null;
            sun_at = -1;
            shadow_at = -1;
            gaps = new Float32Array(stat_window);
            ticks = new Float32Array(stat_window);
            steps_ms = new Float32Array(stat_window);
            fills_ms = new Float32Array(stat_window);
            shadows_ms = new Float32Array(stat_window);
            mains_ms = new Float32Array(stat_window);
            posts_ms = new Float32Array(stat_window);
            batches_ring = new Float32Array(stat_window);
            instances_ring = new Float32Array(stat_window);
            draws_ring = new Float32Array(stat_window);
            triangles_ring = new Float32Array(stat_window);
            bytes_ring = new Float32Array(stat_window);
            count_batches = 0;
            count_instances = 0;
            count_draws = 0;
            count_triangles = 0;
            count_bytes = 0;
            texel_vec = new Float32Array(2);
            post_last = new Map();
            post_vao_last = null;
            samples = 0;
            paint_at = 0;
            context() {
                const canvas = this.dom_node();
                return canvas.getContext('webgl2', { preserveDrawingBuffer: true });
            }
            dpr() {
                return this.$.$mol_dom_context.devicePixelRatio;
            }
            width() {
                return Math.ceil((this.view_rect()?.width ?? 0) * this.dpr());
            }
            height() {
                return Math.ceil((this.view_rect()?.height ?? 0) * this.dpr());
            }
            viewport() {
                const viewport = [0, 0, this.width(), this.height()];
                this.context().viewport(...viewport);
                return viewport;
            }
            scissor() {
                const scissor = this.viewport();
                const gl = this.context();
                gl.enable(gl.SCISSOR_TEST);
                gl.scissor(...scissor);
                return scissor;
            }
            render() {
                super.render();
                this.viewport();
                this.scissor();
                this.paint();
            }
            light_dir(next) {
                return next ?? new Float32Array([0.4, 1, 0.6]);
            }
            clear(next) {
                return next ? $bog_gamengine_node_vec(next) : new Float32Array([0.08, 0.08, 0.1, 1]);
            }
            fog(next) {
                return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0]);
            }
            fog_color(next) {
                if (next)
                    return $bog_gamengine_node_vec(next);
                const clear = this.clear();
                return new Float32Array([clear[0], clear[1], clear[2]]);
            }
            proj() {
                const aspect = this.width() / this.height();
                return this.cam().proj(Number.isFinite(aspect) && aspect > 0 ? aspect : 1);
            }
            slots() {
                const batches = this.scene().batches();
                const slots = [];
                for (let i = 0; i < batches.length; ++i) {
                    const slot = this.slot(batches[i]);
                    if (slot)
                        slots.push(slot);
                }
                const last = this.slots_last;
                for (let i = 0; i < last.length; ++i) {
                    if (slots.includes(last[i]))
                        continue;
                    this.slot_drop(last[i]);
                }
                this.slots_last = slots;
                return slots;
            }
            slot_drop(slot) {
                this.slots_all.delete(slot.batch);
                return slot.dispose(this.context());
            }
            tex_drop(tex) {
                this.textures_all.delete(tex.atlas);
                return tex.dispose(this.context());
            }
            shadow_shader() {
                return new $bog_gamengine_shader_depth;
            }
            shadow_target() {
                const gl = this.context();
                const size = this.shadow_size();
                this.shadow_last?.dispose();
                this.shadow_last = null;
                const target = new $bog_gamengine_gl_depth_target(gl, size);
                this.shadow_last = target;
                return target;
            }
            post_plan() {
                const plan = [];
                if (!this.post())
                    return plan;
                const passes = this.passes();
                const turn = new Map();
                let input = 'scene';
                let prev = 'scene';
                for (let p = 0; p < passes.length; ++p) {
                    const steps = passes[p].steps();
                    for (let s = 0; s < steps.length; ++s) {
                        const step = steps[s];
                        const from = step.from === 'in' ? input : prev;
                        const extra = step.extra === null ? null : step.extra === 'in' ? input : prev;
                        const last = p === passes.length - 1 && s === steps.length - 1;
                        let out = null;
                        if (!last) {
                            let index = turn.get(step.scale) ?? 0;
                            let key = `${step.scale}_${index}`;
                            if (key === from || key === extra) {
                                index = index ? 0 : 1;
                                key = `${step.scale}_${index}`;
                            }
                            turn.set(step.scale, index ? 0 : 1);
                            out = key;
                        }
                        plan.push({ shader: step.shader, from, extra, out });
                        prev = out ?? 'screen';
                    }
                    input = prev;
                }
                return plan;
            }
            post_targets() {
                const plan = this.post_plan();
                const width = this.width();
                const height = this.height();
                const keys = [];
                if (plan.length)
                    keys.push('scene');
                for (let i = 0; i < plan.length; ++i) {
                    const out = plan[i].out;
                    if (out && !keys.includes(out))
                        keys.push(out);
                }
                const gl = keys.length ? this.context() : null;
                for (let i = 0; i < keys.length; ++i) {
                    const key = keys[i];
                    const at = key.indexOf('_');
                    const scale = at < 0 ? 1 : Number(key.slice(0, at));
                    const wide = Math.max(Math.round(width / scale), 1);
                    const high = Math.max(Math.round(height / scale), 1);
                    const found = this.post_last.get(key);
                    if (found)
                        found.resize(wide, high);
                    else
                        this.post_last.set(key, new $bog_gamengine_gl_color_target(gl, wide, high));
                }
                for (const key of [...this.post_last.keys()]) {
                    if (keys.includes(key))
                        continue;
                    this.post_last.get(key).dispose();
                    this.post_last.delete(key);
                }
                return keys;
            }
            post_vao() {
                const vao = this.context().createVertexArray();
                this.post_vao_last = vao;
                return vao;
            }
            post_drop() {
                for (const target of this.post_last.values())
                    target.dispose();
                this.post_last.clear();
                if (this.post_vao_last)
                    this.context().deleteVertexArray(this.post_vao_last);
                this.post_vao_last = null;
                return this;
            }
            destructor() {
                this.post_drop();
                this.shadow_last?.dispose();
                this.shadow_last = null;
                const slots = this.slots_last;
                for (let i = 0; i < slots.length; ++i)
                    this.slot_drop(slots[i]);
                this.slots_last = [];
                const textures = this.textures_last;
                for (let i = 0; i < textures.length; ++i)
                    this.tex_drop(textures[i]);
                this.textures_last = [];
                super.destructor();
            }
            slot(batch) {
                const found = this.slots_all.get(batch);
                if (found)
                    return found;
                const gl = this.context();
                const shader = batch.shader();
                const program = shader.program(gl);
                const globs = shader.face().glob ?? {};
                const shape = batch.shape();
                if (!this.shape_ready(shape))
                    return null;
                const atlas = batch.atlas();
                const cap = Math.max(batch.cap, 16);
                const mode = shape.mode();
                const depth = shader.depth();
                const wireframe = 'wireframe' in globs ? program.uniform('wireframe') : null;
                const glob = (name) => name in globs ? program.uniform(name) : null;
                const slot = Object.assign(new $bog_gamengine_draw_slot, {
                    batch,
                    program,
                    proj: program.uniform('proj'),
                    view: program.uniform('view'),
                    light_count: glob('light_count'),
                    light_pos: glob('light_pos'),
                    light_dir: glob('light_dir'),
                    light_color: glob('light_color'),
                    ambient: glob('ambient'),
                    cam_pos: glob('cam_pos'),
                    fog: glob('fog'),
                    fog_color: glob('fog_color'),
                    wireframe,
                    shadow_mat: glob('shadow_mat'),
                    shadow_map: glob('shadow_map'),
                    shadow_light: glob('shadow_light'),
                    bones: glob('bones'),
                    depth,
                    vao: gl.createVertexArray(),
                    live: mode === 'lines',
                    atlas,
                    sampler: atlas ? program.uniform('atlas') : null,
                    tex: atlas ? this.tex(atlas) : null,
                    prim: mode === 'lines' ? gl.LINES : mode === 'triangles' ? gl.TRIANGLES : gl.TRIANGLE_STRIP,
                    wire: depth && wireframe && mode !== 'lines' ? (mode === 'triangles' ? gl.LINES : gl.LINE_STRIP) : null,
                    size: shape.size(),
                    cap,
                });
                const buffer = (location, size, divisor) => {
                    if (location === null)
                        return null;
                    const buffer = new $bog_gamengine_gl_buffer(gl, location, size, divisor);
                    slot.buffers.push(buffer);
                    return buffer;
                };
                gl.bindVertexArray(slot.vao);
                slot.vertex = buffer(program.attribute('vertex'), 3, 0);
                slot.vertex.send(shape.geometry());
                buffer(program.attribute('uv'), 2, 0)?.send(shape.skin());
                buffer(program.attribute('normal'), 3, 0)?.send(shape.normals());
                slot.trans = buffer(program.attribute('inst_trans'), 16, 1);
                slot.trans.reserve(cap * 64);
                slot.tint = buffer(program.attribute('inst_tint'), 4, 1);
                slot.tint.reserve(cap * 16);
                slot.layer = buffer(program.attribute('inst_layer'), 1, 1);
                slot.layer?.reserve(cap * 4);
                slot.uv = buffer(program.attribute('inst_uv'), 4, 1);
                slot.uv?.reserve(cap * 16);
                slot.material = buffer(program.attribute('inst_material'), 4, 1);
                slot.material?.reserve(cap * 16);
                slot.normal_layer = buffer(program.attribute('inst_normal_layer'), 1, 1);
                slot.normal_layer?.reserve(cap * 4);
                let bytes_skin = 0;
                if (slot.bones) {
                    const joints = $bog_gamengine_skin_shape_joints(shape);
                    const weights = $bog_gamengine_skin_shape_weights(shape);
                    buffer(program.attribute('joints'), 4, 0)?.send(joints);
                    buffer(program.attribute('weights'), 4, 0)?.send(weights);
                    bytes_skin = joints.byteLength + weights.byteLength;
                    slot.bones_tex = $bog_gamengine_skin_gl_bones(gl);
                }
                gl.bindVertexArray(null);
                slot.tris = mode === 'lines' ? 0 : mode === 'triangles' ? slot.size / 3 : Math.max(slot.size - 2, 0);
                slot.stride = 80
                    + (slot.layer ? 4 : 0)
                    + (slot.uv ? 16 : 0)
                    + (slot.material ? 16 : 0)
                    + (slot.normal_layer ? 4 : 0);
                slot.bytes_shape = shape.geometry().byteLength + bytes_skin;
                slot.bytes = slot.stride * cap + slot.bytes_shape;
                this.slots_all.set(batch, slot);
                return slot;
            }
            shape_ready(shape) {
                try {
                    shape.geometry();
                    return true;
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        return false;
                    return $mol_fail_hidden(error);
                }
            }
            tex(atlas) {
                const found = this.textures_all.get(atlas);
                if (found)
                    return found;
                const tex = new $bog_gamengine_draw_tex;
                tex.atlas = atlas;
                this.textures_all.set(atlas, tex);
                return tex;
            }
            textures() {
                const gl = this.context();
                const slots = this.slots();
                const textures = [];
                for (let i = 0; i < slots.length; ++i) {
                    const slot = slots[i];
                    const tex = slot.tex;
                    if (!tex || textures.includes(tex))
                        continue;
                    textures.push(tex);
                    if (tex.native || !slot.atlas.ready())
                        continue;
                    tex.native = $bog_gamengine_gl_texture_array(gl, slot.atlas.images(), slot.atlas.size());
                }
                const last = this.textures_last;
                for (let i = 0; i < last.length; ++i) {
                    if (textures.includes(last[i]))
                        continue;
                    this.tex_drop(last[i]);
                }
                this.textures_last = textures;
                return textures;
            }
            lights_fill() {
                const lights = this.scene().lights();
                const pos = this.lights_pos;
                const dir = this.lights_dir;
                const color = this.lights_color;
                if (!lights.length) {
                    const sun = this.light_dir();
                    const len = Math.hypot(sun[0], sun[1], sun[2]) || 1;
                    pos[0] = 0;
                    pos[1] = 0;
                    pos[2] = 0;
                    pos[3] = 0;
                    dir[0] = -sun[0] / len;
                    dir[1] = -sun[1] / len;
                    dir[2] = -sun[2] / len;
                    dir[3] = -1;
                    color[0] = 1;
                    color[1] = 1;
                    color[2] = 1;
                    color[3] = 0;
                    this.lights_count = 1;
                    this.sun_at = 0;
                    return 1;
                }
                const count = Math.min(lights.length, light_max);
                this.sun_at = -1;
                for (let i = 0; i < count; ++i) {
                    const light = lights[i];
                    const kind = light.kind();
                    const world = light.world();
                    const tone = light.color();
                    const power = light.power();
                    const at = i * 4;
                    pos[at] = world[12];
                    pos[at + 1] = world[13];
                    pos[at + 2] = world[14];
                    pos[at + 3] = kind === 'sun' ? 0 : 1;
                    if (kind === 'sun' && this.sun_at < 0)
                        this.sun_at = i;
                    $bog_gamengine_light_dir(world, dir, at);
                    dir[at + 3] = kind === 'spot' ? Math.cos(light.angle()) : -1;
                    color[at] = tone[0] * power;
                    color[at + 1] = tone[1] * power;
                    color[at + 2] = tone[2] * power;
                    color[at + 3] = light.range();
                }
                this.lights_count = count;
                return count;
            }
            step() {
                try {
                    return this.scene().step();
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        return -1;
                    return $mol_fail_hidden(error);
                }
            }
            paint() {
                const at_start = performance.now();
                this.scene().aspect(this.width() / this.height() || 1);
                this.step();
                const at_step = performance.now();
                const gl = this.context();
                const slots = this.slots();
                this.textures();
                const plan = this.post_plan();
                if (plan.length)
                    this.post_targets();
                const proj = this.proj();
                const view = this.cam().view();
                const wireframe = this.wireframe();
                const ambient = this.ambient();
                this.ambient_vec[0] = ambient;
                this.ambient_vec[1] = ambient;
                this.ambient_vec[2] = ambient;
                const fog = this.fog();
                this.fog_vec[0] = fog[0];
                this.fog_vec[1] = fog[1];
                const fog_color = this.fog_color();
                this.fog_color_vec[0] = fog_color[0];
                this.fog_color_vec[1] = fog_color[1];
                this.fog_color_vec[2] = fog_color[2];
                const cam_world = this.cam().world();
                this.cam_pos_vec[0] = cam_world[12];
                this.cam_pos_vec[1] = cam_world[13];
                this.cam_pos_vec[2] = cam_world[14];
                this.lights_fill();
                this.count_draws = 0;
                const at_prep = performance.now();
                for (let i = 0; i < slots.length; ++i)
                    slots[i].ready = this.slot_send(gl, slots[i]);
                const at_fill = performance.now();
                this.shadow_pass(gl, slots);
                const at_shadow = performance.now();
                const target = plan.length ? this.post_last.get('scene') : null;
                const wide = target ? target.width : this.width();
                const high = target ? target.height : this.height();
                gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.native : null);
                gl.viewport(0, 0, wide, high);
                gl.enable(gl.SCISSOR_TEST);
                gl.scissor(0, 0, wide, high);
                gl.cullFace(gl.BACK);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                const clear = this.clear();
                gl.clearColor(clear[0], clear[1], clear[2], clear[3]);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                for (let i = 0; i < slots.length; ++i) {
                    if (slots[i].ready)
                        this.paint_slot(gl, slots[i], proj, view, wireframe);
                }
                const at_main = performance.now();
                this.post_run(gl, plan);
                const at_post = performance.now();
                gl.bindVertexArray(null);
                gl.useProgram(null);
                this.count_fill(slots);
                this.measure(at_start, at_step, at_prep, at_fill, at_shadow, at_main, at_post);
            }
            post_run(gl, plan) {
                if (!plan.length)
                    return 0;
                gl.disable(gl.DEPTH_TEST);
                gl.disable(gl.CULL_FACE);
                gl.disable(gl.BLEND);
                gl.disable(gl.SCISSOR_TEST);
                gl.bindVertexArray(this.post_vao());
                for (let i = 0; i < plan.length; ++i) {
                    const step = plan[i];
                    const from = this.post_last.get(step.from);
                    const out = step.out ? this.post_last.get(step.out) : null;
                    const program = step.shader.program(gl);
                    gl.bindFramebuffer(gl.FRAMEBUFFER, out ? out.native : null);
                    gl.viewport(0, 0, out ? out.width : this.width(), out ? out.height : this.height());
                    gl.useProgram(program.native);
                    gl.activeTexture(gl.TEXTURE2);
                    gl.bindTexture(gl.TEXTURE_2D, from.texture);
                    $bog_gamengine_gl_uniform_int(gl, program.uniform('source'), 2);
                    if (step.extra) {
                        gl.activeTexture(gl.TEXTURE3);
                        gl.bindTexture(gl.TEXTURE_2D, this.post_last.get(step.extra).texture);
                        $bog_gamengine_gl_uniform_int(gl, program.uniform('extra'), 3);
                    }
                    this.texel_vec[0] = 1 / from.width;
                    this.texel_vec[1] = 1 / from.height;
                    $bog_gamengine_gl_uniform_vector(gl, program.uniform('texel'), this.texel_vec);
                    gl.drawArrays(gl.TRIANGLES, 0, 3);
                    ++this.count_draws;
                }
                gl.activeTexture(gl.TEXTURE0);
                return plan.length;
            }
            slot_send(gl, slot) {
                const batch = slot.batch;
                const count = batch.count;
                if (!count)
                    return false;
                if (slot.tex && !slot.tex.native)
                    return false;
                if (slot.live) {
                    const shape = batch.shape();
                    slot.vertex.send(shape.geometry());
                    slot.size = shape.size();
                }
                if (!slot.size)
                    return false;
                const grown = batch.cap > slot.cap;
                gl.bindVertexArray(slot.vao);
                gl.bindBuffer(gl.ARRAY_BUFFER, slot.trans.native);
                if (grown)
                    gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 64, gl.DYNAMIC_DRAW);
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.trans, 0, count * 16);
                gl.bindBuffer(gl.ARRAY_BUFFER, slot.tint.native);
                if (grown)
                    gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 16, gl.DYNAMIC_DRAW);
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.tint, 0, count * 4);
                if (slot.layer) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, slot.layer.native);
                    if (grown)
                        gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 4, gl.DYNAMIC_DRAW);
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.layer, 0, count);
                }
                if (slot.uv) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, slot.uv.native);
                    if (grown)
                        gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 16, gl.DYNAMIC_DRAW);
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.uv, 0, count * 4);
                }
                if (slot.material) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, slot.material.native);
                    if (grown)
                        gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 16, gl.DYNAMIC_DRAW);
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.material, 0, count * 4);
                }
                if (slot.normal_layer) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, slot.normal_layer.native);
                    if (grown)
                        gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 4, gl.DYNAMIC_DRAW);
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.normal_layer, 0, count);
                }
                if (grown) {
                    slot.cap = batch.cap;
                    slot.bytes = slot.stride * slot.cap + slot.bytes_shape;
                }
                return true;
            }
            count_fill(slots) {
                let batches = 0;
                let instances = 0;
                let triangles = 0;
                let bytes = 0;
                for (let i = 0; i < slots.length; ++i) {
                    const slot = slots[i];
                    if (!slot.ready)
                        continue;
                    const count = slot.batch.count;
                    ++batches;
                    instances += count;
                    triangles += slot.tris * count;
                    bytes += slot.bytes;
                }
                this.count_batches = batches;
                this.count_instances = instances;
                this.count_triangles = triangles;
                this.count_bytes = bytes;
                return instances;
            }
            shadow_pass(gl, slots) {
                this.shadow_at = this.shadows() ? this.sun_at : -1;
                const target = this.shadow_target();
                if (this.shadow_at < 0)
                    return target;
                $bog_gamengine_draw_shadow_mat(this.lights_dir, this.shadow_at * 4, this.cam_pos_vec, this.shadow_range(), this.shadow_mat_buf);
                const program = this.shadow_shader().program(gl);
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.native);
                gl.viewport(0, 0, target.size, target.size);
                gl.disable(gl.SCISSOR_TEST);
                gl.disable(gl.BLEND);
                gl.enable(gl.DEPTH_TEST);
                gl.depthMask(true);
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);
                gl.clear(gl.DEPTH_BUFFER_BIT);
                gl.useProgram(program.native);
                $bog_gamengine_gl_uniform_matrix(gl, program.uniform('shadow_mat'), this.shadow_mat_buf);
                for (let i = 0; i < slots.length; ++i) {
                    const slot = slots[i];
                    if (!slot.ready || !slot.depth)
                        continue;
                    gl.bindVertexArray(slot.vao);
                    gl.drawArraysInstanced(slot.prim, 0, slot.size, slot.batch.count);
                    ++this.count_draws;
                }
                return target;
            }
            paint_slot(gl, slot, proj, view, wireframe) {
                const batch = slot.batch;
                const count = batch.count;
                if (slot.depth) {
                    gl.enable(gl.DEPTH_TEST);
                    gl.enable(gl.CULL_FACE);
                    gl.cullFace(gl.BACK);
                }
                else {
                    gl.disable(gl.DEPTH_TEST);
                    gl.disable(gl.CULL_FACE);
                }
                gl.useProgram(slot.program.native);
                $bog_gamengine_gl_uniform_matrix(gl, slot.proj, proj);
                $bog_gamengine_gl_uniform_matrix(gl, slot.view, view);
                $bog_gamengine_gl_uniform_int(gl, slot.light_count, this.lights_count);
                $bog_gamengine_gl_uniform_vec4s(gl, slot.light_pos, this.lights_pos);
                $bog_gamengine_gl_uniform_vec4s(gl, slot.light_dir, this.lights_dir);
                $bog_gamengine_gl_uniform_vec4s(gl, slot.light_color, this.lights_color);
                $bog_gamengine_gl_uniform_vector(gl, slot.ambient, this.ambient_vec);
                $bog_gamengine_gl_uniform_vector(gl, slot.cam_pos, this.cam_pos_vec);
                $bog_gamengine_gl_uniform_vector(gl, slot.fog, this.fog_vec);
                $bog_gamengine_gl_uniform_vector(gl, slot.fog_color, this.fog_color_vec);
                $bog_gamengine_gl_uniform_vector(gl, slot.wireframe, this.wire_off);
                $bog_gamengine_gl_uniform_matrix(gl, slot.shadow_mat, this.shadow_mat_buf);
                $bog_gamengine_gl_uniform_int(gl, slot.shadow_light, this.shadow_at);
                if (slot.shadow_map) {
                    gl.activeTexture(gl.TEXTURE1);
                    gl.bindTexture(gl.TEXTURE_2D, this.shadow_target().texture);
                    $bog_gamengine_gl_uniform_int(gl, slot.shadow_map, 1);
                }
                if (slot.tex) {
                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D_ARRAY, slot.tex.native);
                    $bog_gamengine_gl_uniform_int(gl, slot.sampler, 0);
                }
                if (slot.bones_tex) {
                    gl.activeTexture(gl.TEXTURE4);
                    const bones = $bog_gamengine_skin_bones(batch);
                    if (bones)
                        slot.bones_tex.send(bones);
                    else
                        gl.bindTexture(gl.TEXTURE_2D, slot.bones_tex.native);
                    $bog_gamengine_gl_uniform_int(gl, slot.bones, 4);
                }
                gl.bindVertexArray(slot.vao);
                gl.drawArraysInstanced(slot.prim, 0, slot.size, count);
                ++this.count_draws;
                if (!wireframe || slot.wire === null)
                    return;
                $bog_gamengine_gl_uniform_vector(gl, slot.wireframe, this.wire_on);
                gl.drawArraysInstanced(slot.wire, 0, slot.size, count);
                ++this.count_draws;
            }
            measure(at_start, at_step, at_prep, at_fill, at_shadow, at_main, at_post) {
                const i = this.samples % stat_window;
                this.ticks[i] = at_post - this.scene().clock().tick_at;
                this.gaps[i] = this.paint_at ? at_post - this.paint_at : 0;
                this.steps_ms[i] = at_step - at_start;
                this.fills_ms[i] = at_fill - at_prep;
                this.shadows_ms[i] = at_shadow - at_fill;
                this.mains_ms[i] = at_main - at_shadow;
                this.posts_ms[i] = at_post - at_main;
                this.batches_ring[i] = this.count_batches;
                this.instances_ring[i] = this.count_instances;
                this.draws_ring[i] = this.count_draws;
                this.triangles_ring[i] = this.count_triangles;
                this.bytes_ring[i] = this.count_bytes;
                this.paint_at = at_post;
                ++this.samples;
            }
            mean(ring, size) {
                let sum = 0;
                for (let i = 0; i < size; ++i)
                    sum += ring[i];
                return size ? sum / size : 0;
            }
            report() {
                this.scene().clock().frame();
                const size = Math.min(this.samples, stat_window);
                return {
                    tick: this.mean(this.steps_ms, size),
                    fill: this.mean(this.fills_ms, size),
                    shadow: this.mean(this.shadows_ms, size),
                    main: this.mean(this.mains_ms, size),
                    post: this.mean(this.posts_ms, size),
                    batches: this.mean(this.batches_ring, size),
                    instances: this.mean(this.instances_ring, size),
                    draws: this.mean(this.draws_ring, size),
                    triangles: this.mean(this.triangles_ring, size),
                    bytes: this.mean(this.bytes_ring, size),
                };
            }
            stat() {
                const frame = this.scene().clock().frame();
                const size = Math.min(this.samples, stat_window);
                let gap = 0;
                let tick = 0;
                for (let i = 0; i < size; ++i) {
                    gap += this.gaps[i];
                    tick += this.ticks[i];
                }
                const div = size || 1;
                return `frame ${frame} | ${(gap / div).toFixed(1)} ms | tick ${(tick / div).toFixed(1)} ms`;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "context", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "width", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "height", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "viewport", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "scissor", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "light_dir", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "clear", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "fog", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "fog_color", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "proj", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "slots", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "shadow_shader", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "shadow_target", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "post_plan", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "post_targets", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "post_vao", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "textures", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "report", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "stat", null);
        $$.$bog_gamengine_draw = $bog_gamengine_draw;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_gamengine_draw, {
            alignSelf: 'stretch',
            justifySelf: 'stretch',
            minWidth: 0,
            minHeight: 0,
            flex: {
                grow: 1,
                shrink: 1,
                basis: 0,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_video_player) = class $mol_video_player extends ($.$mol_view) {
		uri(){
			return "";
		}
		controls(){
			return true;
		}
		autoplay(){
			return true;
		}
		inline(){
			return true;
		}
		loop(){
			return false;
		}
		muted(){
			return false;
		}
		poster(){
			return "";
		}
		stream(){
			return null;
		}
		revolume(next){
			if(next !== undefined) return next;
			return null;
		}
		retime(next){
			if(next !== undefined) return next;
			return null;
		}
		redurate(next){
			if(next !== undefined) return next;
			return null;
		}
		playing_event(next){
			if(next !== undefined) return next;
			return null;
		}
		play_event(next){
			if(next !== undefined) return next;
			return null;
		}
		pause_event(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "video";
		}
		playing(next){
			if(next !== undefined) return next;
			return false;
		}
		play(){
			return null;
		}
		pause(){
			return null;
		}
		volume(next){
			if(next !== undefined) return next;
			return 0;
		}
		time(next){
			if(next !== undefined) return next;
			return 0;
		}
		duration(){
			return 0;
		}
		attr(){
			return {
				"src": (this.uri()), 
				"controls": (this.controls()), 
				"autoplay": (this.autoplay()), 
				"playsinline": (this.inline()), 
				"loop": (this.loop()), 
				"muted": (this.muted()), 
				"poster": (this.poster())
			};
		}
		field(){
			return {"srcObject": (this.stream())};
		}
		event(){
			return {
				"volumechange": (next) => (this.revolume(next)), 
				"timeupdate": (next) => (this.retime(next)), 
				"durationchange": (next) => (this.redurate(next)), 
				"playing": (next) => (this.playing_event(next)), 
				"play": (next) => (this.play_event(next)), 
				"pause": (next) => (this.pause_event(next))
			};
		}
	};
	($mol_mem(($.$mol_video_player.prototype), "revolume"));
	($mol_mem(($.$mol_video_player.prototype), "retime"));
	($mol_mem(($.$mol_video_player.prototype), "redurate"));
	($mol_mem(($.$mol_video_player.prototype), "playing_event"));
	($mol_mem(($.$mol_video_player.prototype), "play_event"));
	($mol_mem(($.$mol_video_player.prototype), "pause_event"));
	($mol_mem(($.$mol_video_player.prototype), "playing"));
	($mol_mem(($.$mol_video_player.prototype), "volume"));
	($mol_mem(($.$mol_video_player.prototype), "time"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Video player component
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_video_player_demo
         */
        class $mol_video_player extends $.$mol_video_player {
            dom_node() {
                return super.dom_node();
            }
            volume(next) {
                this.revolume();
                if (next === undefined) {
                    return this.dom_node().volume;
                }
                else {
                    return this.dom_node().volume = Math.max(0, Math.min(next, 1));
                }
            }
            time(next) {
                this.retime();
                if (next === undefined) {
                    return this.dom_node().currentTime;
                }
                else {
                    return this.dom_node().currentTime = Math.max(0, Math.min(next, this.duration()));
                }
            }
            duration() {
                this.redurate();
                return this.dom_node().duration;
            }
            playing(next) {
                const node = this.dom_node();
                this.playing_event();
                this.play_event();
                if (next === undefined)
                    return !node.paused;
                if (next && node.paused)
                    $mol_wire_sync(node).play();
                if (!next && !node.paused)
                    node.pause();
                return !node.paused;
            }
            play() {
                this.playing(true);
            }
            pause() {
                this.playing(false);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_video_player.prototype, "volume", null);
        __decorate([
            $mol_mem
        ], $mol_video_player.prototype, "time", null);
        __decorate([
            $mol_mem
        ], $mol_video_player.prototype, "duration", null);
        __decorate([
            $mol_mem
        ], $mol_video_player.prototype, "playing", null);
        $$.$mol_video_player = $mol_video_player;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/video/player/player.view.css", "[mol_video_player] {\n\tflex: 1 1 auto;\n}\n");
})($ || ($ = {}));

;
	($.$mol_link) = class $mol_link extends ($.$mol_view) {
		uri_toggle(){
			return "";
		}
		uri_unsafe(){
			return (this.uri_toggle());
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		target(){
			return "_self";
		}
		file_name(){
			return "";
		}
		current(){
			return false;
		}
		relation(){
			return "";
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		click(next){
			return (this.event_click(next));
		}
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		uri_off(){
			return "";
		}
		uri_native(){
			return null;
		}
		external(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri_unsafe()), 
				"title": (this.hint_safe()), 
				"target": (this.target()), 
				"download": (this.file_name()), 
				"mol_link_current": (this.current()), 
				"rel": (this.relation())
			};
		}
		sub(){
			return [(this.title())];
		}
		arg(){
			return {};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
	};
	($mol_mem(($.$mol_link.prototype), "event_click"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber from [mol_wire](../wire/README.md)
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** State of arguments like `foo=bar xxx` */
    class $mol_state_arg extends $mol_object {
        prefix;
        static prolog = '';
        static separator = ' ';
        static href(next) {
            return next || process.argv.slice(2).join(' ');
        }
        static href_normal() {
            return this.link({});
        }
        static dict(next) {
            if (next !== void 0)
                this.href(this.make_link(next));
            var href = this.href();
            var chunks = href.split(' ');
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static value(key, next) {
            if (next === void 0)
                return this.dict()[key] ?? null;
            this.href(this.link({ [key]: next }));
            return next;
        }
        static link(next) {
            const params = {};
            var prev = this.dict();
            for (var key in prev) {
                params[key] = prev[key];
            }
            for (var key in next) {
                params[key] = next[key];
            }
            return this.make_link(params);
        }
        static make_link(next) {
            const chunks = [];
            for (const key in next) {
                if (next[key] !== null) {
                    chunks.push([key, next[key]].map(encodeURIComponent).join('='));
                }
            }
            return chunks.join(' ');
        }
        static go(next) {
            this.href(this.link(next));
        }
        static commit() { }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            const prefix = this.prefix;
            const dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_safe_uri(uri) {
        return uri.replace(/^(?=\w+script+:)/, 'about:blank#');
    }
    $.$mol_dom_safe_uri = $mol_dom_safe_uri;
    function $mol_dom_safe_attr(val) {
        return val;
    }
    $.$mol_dom_safe_attr = $mol_dom_safe_attr;
    $.$mol_dom_safe_rules = {
        // defaults
        '': { id: $mol_dom_safe_attr },
        // special
        a: { href: $mol_dom_safe_uri },
        img: { src: $mol_dom_safe_uri },
        object: { src: $mol_dom_safe_uri },
        // blocks
        div: {},
        p: {},
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        blockquote: {},
        pre: {},
        ul: {},
        ol: {},
        li: {},
        details: {},
        section: {},
        summary: {},
        hr: {},
        table: {},
        tr: {},
        td: {},
        // inlines
        span: {},
        strong: {},
        em: {},
        br: {},
        ins: {},
        del: {},
        code: {},
    };
    function $mol_dom_safe(nodes) {
        const res = [];
        for (const node of nodes) {
            if (node.nodeType === node.TEXT_NODE) {
                res.push(node);
                continue;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                const kids = this.$mol_dom_safe([...node.childNodes]);
                const allowed = this.$mol_dom_safe_rules[node.localName];
                if (!allowed) {
                    res.push(...kids);
                    continue;
                }
                for (const attr of [...node.attributes]) {
                    const proc = allowed[attr.localName] ?? this.$mol_dom_safe_rules[''][attr.localName];
                    if (proc)
                        attr.nodeValue = proc(attr.nodeValue);
                    else
                        node.removeAttribute(attr.nodeName);
                }
                $mol_dom_render_children(node, kids);
                res.push(node);
                continue;
            }
        }
        return res;
    }
    $.$mol_dom_safe = $mol_dom_safe;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Dynamic hyperlink. It can add, change or remove parameters. A link that leads to the current page has [mol_link_current] attribute set to true.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_link_demo
         */
        class $mol_link extends $.$mol_link {
            uri_toggle() {
                return this.current() ? this.uri_off() : this.uri();
            }
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            uri_off() {
                const arg2 = {};
                for (let i in this.arg())
                    arg2[i] = null;
                return new this.$.$mol_state_arg(this.state_key()).link(arg2);
            }
            uri_native() {
                const base = this.$.$mol_state_arg.href();
                return new URL(this.uri(), base);
            }
            current() {
                const base = this.$.$mol_state_arg.href_normal();
                const target = this.uri_native().toString();
                if (base === target)
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) != args[key])
                        return false;
                }
                return true;
            }
            file_name() {
                return null;
            }
            minimal_height() {
                return Math.max(super.minimal_height(), 24);
            }
            external() {
                return this.uri_native().origin !== $mol_dom_context.location.origin;
            }
            target() {
                return this.external() ? '_blank' : '_self';
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    if (error instanceof Error)
                        return '💥' + error.message;
                    return '';
                }
            }
            uri_unsafe() {
                return $mol_dom_safe_uri(super.uri_unsafe());
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_toggle", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_off", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_native", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($mol_link, {
        textDecoration: 'none',
        color: $mol_theme.control,
        stroke: 'currentcolor',
        cursor: 'pointer',
        padding: $mol_gap.text,
        boxSizing: 'border-box',
        position: 'relative',
        minWidth: rem(2.5),
        minHeight: rem(2.5),
        gap: $mol_gap.space,
        border: {
            radius: $mol_gap.round,
        },
        ':hover': {
            background: {
                color: $mol_theme.hover,
            },
        },
        ':focus': {
            outline: 'none',
        },
        ':focus-visible': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            }
        },
        ':active': {
            color: $mol_theme.focus,
        },
        '@': {
            mol_link_current: {
                'true': {
                    color: $mol_theme.current,
                    textShadow: '0 0',
                }
            }
        },
    });
})($ || ($ = {}));

;
	($.$mol_svg) = class $mol_svg extends ($.$mol_view) {
		dom_name(){
			return "svg";
		}
		dom_name_space(){
			return "http://www.w3.org/2000/svg";
		}
		font_size(){
			return 16;
		}
		font_family(){
			return "";
		}
		style_size(){
			return {};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Base SVG component to display SVG images or icons. */
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $mol_state_time.now(0);
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_root) = class $mol_svg_root extends ($.$mol_svg) {
		view_box(){
			return "0 0 100 100";
		}
		aspect(){
			return "xMidYMid";
		}
		dom_name(){
			return "svg";
		}
		attr(){
			return {
				...(super.attr()), 
				"viewBox": (this.view_box()), 
				"preserveAspectRatio": (this.aspect())
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_svg_path) = class $mol_svg_path extends ($.$mol_svg) {
		geometry(){
			return "";
		}
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this.geometry())};
		}
	};


;
"use strict";


;
	($.$mol_icon) = class $mol_icon extends ($.$mol_svg_root) {
		path(){
			return "";
		}
		Path(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.path()));
			return obj;
		}
		view_box(){
			return "0 0 24 24";
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
		sub(){
			return [(this.Path())];
		}
	};
	($mol_mem(($.$mol_icon.prototype), "Path"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1em;\n\theight: 1.5em;\n\tflex: 0 0 auto;\n\tvertical-align: top;\n\tdisplay: inline-block;\n\tfilter: drop-shadow(0px 1px 1px var(--mol_theme_back));\n\ttransform-origin: center;\n}\n\n[mol_icon_path] {\n\ttransform-origin: center;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_script) = class $mol_icon_script extends ($.$mol_icon) {
		path(){
			return "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2H8C6.3,2 5,3.3 5,5V16H16V17C16,17.6 16.4,18 17,18H18V5C18,4.4 18.4,4 19,4C19.6,4 20,4.4 20,5V6H22V5C22,3.3 20.7,2 19,2Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_script_text) = class $mol_icon_script_text extends ($.$mol_icon) {
		path(){
			return "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z";
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        /** Is storage a long term. */
        static persisted(next) {
            return false;
        }
        /** Total storage quota in bytes. */
        static total() {
            return 0;
        }
        /** Total storage usage in bytes. */
        static used() {
            return 0;
        }
        /** Minimum available free space in bytes. */
        static free() {
            return this.total() - this.used();
        }
        /** Fulfillness of storage. */
        static portion() {
            const total = this.total();
            if (!total)
                return 1;
            return this.used() / total;
        }
        /**
         * Fulfillness logarithmic level.
         * `0` - empty
         * `1` - half free
         * `2` - quart free
         * `Infinity` - fulfilled
         */
        static level() {
            return Math.floor(-Math.log2(1 - this.portion()));
        }
    }
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_storage_node extends $mol_storage {
        static persisted() {
            return true;
        }
        static stats() {
            $mol_state_time.now(1000);
            return $node.fs.statfsSync('.');
        }
        static total() {
            const { blocks, bsize } = this.stats();
            return blocks * bsize;
        }
        static used() {
            const { blocks, bfree, bsize } = this.stats();
            return (blocks - bfree) * bsize;
        }
        static free() {
            const { bfree, bsize } = this.stats();
            return bfree * bsize;
        }
        static portion() {
            const { blocks, bfree } = this.stats();
            if (!blocks)
                return 1;
            return (blocks - bfree) / blocks;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage_node, "stats", null);
    $.$mol_storage_node = $mol_storage_node;
    $.$mol_storage = $.$mol_storage_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_lock extends $mol_object {
        promise = null;
        async wait() {
            let next = () => { };
            let destructed = false;
            const task = $mol_wire_auto();
            if (!task)
                return next;
            const destructor = task.destructor.bind(task);
            task.destructor = () => {
                destructor();
                destructed = true;
                next();
            };
            let promise;
            do {
                promise = this.promise;
                await promise;
                if (destructed)
                    return next;
            } while (promise !== this.promise);
            this.promise = new Promise(done => { next = done; });
            return next;
        }
        grab() { return $mol_wire_sync(this).wait(); }
    }
    $.$mol_lock = $mol_lock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let buf = new Uint8Array(2 ** 12); // 4KB Mem Page
    /** Temporary buffer. Recursive usage isn't supported. */
    function $mol_charset_buffer(size) {
        if (buf.byteLength < size)
            buf = new Uint8Array(size);
        return buf;
    }
    $.$mol_charset_buffer = $mol_charset_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_charset_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_encode_to(str, buf));
    }
    $.$mol_charset_encode = $mol_charset_encode;
    function $mol_charset_encode_to(str, buf, from = 0) {
        let pos = from;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) { // ASCII - 1 octet
                buf[pos++] = code;
            }
            else if (code < 0x800) { // 2 octet
                buf[pos++] = 0xc0 | (code >> 6);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else if (code < 0xd800 || code >= 0xe000) { // 3 octet
                buf[pos++] = 0xe0 | (code >> 12);
                buf[pos++] = 0x80 | ((code >> 6) & 0x3f);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else { // surrogate pair
                const point = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
                buf[pos++] = 0xf0 | (point >> 18);
                buf[pos++] = 0x80 | ((point >> 12) & 0x3f);
                buf[pos++] = 0x80 | ((point >> 6) & 0x3f);
                buf[pos++] = 0x80 | (point & 0x3f);
            }
        }
        return pos - from;
    }
    $.$mol_charset_encode_to = $mol_charset_encode_to;
    function $mol_charset_encode_size(str) {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80)
                size += 1;
            else if (code < 0x800)
                size += 2;
            else if (code < 0xd800 || code >= 0xe000)
                size += 3;
            else
                size += 4;
        }
        return size;
    }
    $.$mol_charset_encode_size = $mol_charset_encode_size;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_transaction extends $mol_object {
        path() { return ''; }
        modes() { return []; }
        write(options) {
            throw new Error('Not implemented');
        }
        read() {
            throw new Error('Not implemented');
        }
        truncate(size) {
            throw new Error('Not implemented');
        }
        flush() {
            throw new Error('Not implemented');
        }
        close() {
            throw new Error('Not implemented');
        }
        destructor() {
            this.close();
        }
    }
    $.$mol_file_transaction = $mol_file_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let file_modes;
    (function (file_modes) {
        /** create if it doesn't already exist */
        file_modes[file_modes["create"] = $node.fs.constants.O_CREAT] = "create";
        /** truncate to zero size if it already exists */
        file_modes[file_modes["exists_truncate"] = $node.fs.constants.O_TRUNC] = "exists_truncate";
        /** throw exception if it already exists */
        file_modes[file_modes["exists_fail"] = $node.fs.constants.O_EXCL] = "exists_fail";
        file_modes[file_modes["read_only"] = $node.fs.constants.O_RDONLY] = "read_only";
        file_modes[file_modes["write_only"] = $node.fs.constants.O_WRONLY] = "write_only";
        file_modes[file_modes["read_write"] = $node.fs.constants.O_RDWR] = "read_write";
        /** data will be appended to the end */
        file_modes[file_modes["append"] = $node.fs.constants.O_APPEND] = "append";
    })(file_modes || (file_modes = {}));
    function mode_mask(modes) {
        return modes.reduce((res, mode) => res | file_modes[mode], 0);
    }
    class $mol_file_transaction_node extends $mol_file_transaction {
        descr() {
            $mol_wire_solid();
            return $node.fs.openSync(this.path(), mode_mask(this.modes()));
        }
        write({ buffer, offset = 0, length, position = null }) {
            if (Array.isArray(buffer)) {
                return $node.fs.writevSync(this.descr(), buffer, position ?? undefined);
            }
            if (typeof buffer === 'string') {
                return $node.fs.writeSync(this.descr(), buffer, position);
            }
            length = length ?? buffer.byteLength;
            return $node.fs.writeSync(this.descr(), buffer, offset, length, position);
        }
        truncate(size) {
            $node.fs.ftruncateSync(this.descr());
        }
        read() {
            return $mol_file_node_buffer_normalize($node.fs.readFileSync(this.descr()));
        }
        flush() {
            $node.fs.fsyncSync(this.descr());
        }
        close() {
            $node.fs.closeSync(this.descr());
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_transaction_node.prototype, "descr", null);
    $.$mol_file_transaction_node = $mol_file_transaction_node;
    $.$mol_file_transaction = $mol_file_transaction_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_base extends $mol_object {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        exists_cut() { return this.exists(); }
        root() {
            const path = this.path();
            const base = this.constructor.base;
            // Если путь выше или равен base или если parent такойже как и this - считаем это корнем
            return base.startsWith(path) || this == this.parent();
        }
        stat(next, virt) {
            const path = this.path();
            const parent = this.parent();
            // Отслеживать проверку наличия родительской папки не стоит до корня диска
            // Лучше ограничить mam-ом
            if (!this.root()) {
                /*
                Если parent папка удалилась, надо ресетнуть все объекты в ней на любой глубине.
                Например, rm -rf с последующим git pull: parent папка может удалиться, потом создасться,
                а текущая папка успеет только удалиться до момента выполнения stat.
                Поэтому parent.exists() не запустит перевычисления, нужна именно parent.version()

                Однако, parent.version() меняется не только при удалении, будет ложное срабатывание
                С этим придется мириться, красивого решения пока нет.
                */
                parent.version();
            }
            parent.watcher();
            if (virt)
                return next ?? null;
            return next ?? this.info(path);
        }
        static changed = new Set;
        static frame = null;
        static changed_add(type, path) {
            if (/([\/\\]\.|___$)/.test(path))
                return;
            const file = this.relative(path.at(-1) === '/' ? path.slice(0, -1) : path);
            // console.log(type, path)
            // add (change): добавился файл - у parent надо обновить список sub, если он был заюзан
            // change, unlink (rename): обновился или удалился файл - ресетим
            // addDir (change), добавилась папка, у parent обновляем список директорий в sub
            // дочерние ресетим
            // unlinkDir (rename), удалилась папка, ресетим ее
            // stat у всех дочерних обновится сам, т.к. связан с parent.version()
            this.changed.add(file);
            if (!this.watching)
                return;
            // throttle, пока события поступают не сбрасываем.
            // аналог awaitWriteFinish из chokidar
            // интервалы между change-сообщениями модифицируемого файла должны быть меньше watch_debounce
            this.frame?.destructor();
            this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
                if (!this.watching)
                    return;
                this.watching = false;
                $mol_wire_async(this).flush();
            });
        }
        /**
         * Должно быть больше, чем время между событиями от вотчера при записи внешним процессом.
         * Иначе запуск ресетов паралельно с изменением может привести к неконсистентности.
         */
        static watch_debounce() { return 500; }
        static flush() {
            // Пока flush работает, вотчер сюда не заходит, но может добавлять новые изменения
            // на каждом перезапуске они применятся
            // Пока run выполняется, изменения накапливаются, в конце run вызывается flush
            // Пока применяются изменения, run должен ожидать конца flush
            for (const file of this.changed) {
                const parent = file.parent();
                try {
                    if ($mol_wire_probe(() => parent.sub()))
                        parent.sub(null);
                    file.reset();
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        $mol_fail_log(error);
                }
            }
            this.changed.clear();
            this.watching = true;
            // this.watch_wd?.destructor()
            // this.watch_wd = null
        }
        static watching = true;
        static lock = new $mol_lock;
        static watch_off(path) {
            this.watching = false;
            // run должен ожидать конца flush
            this.flush();
            this.watching = false;
            /*
            watch запаздывает и событие может прилететь через 3 сек после окончания сайд эффекта
            поэтому добавляем папку, которую меняет side_effect
            Когда дойдет до выполнения flush, он ресетнет ее
            
            Иначе будут лишние срабатывания
            Например, удалили hyoo/board, watch ресетит и exists начинает отдавать false, срабатывает git clone
            Сразу после него событие addDir еще не успело прийти,
            на следующем перезапуске вызывается git pull, т.к.
            с точки зрения реактивной системы hyoo/board еще не существует.
            */
            this.changed.add(this.absolute(path));
        }
        // protected static watch_wd = null as null | $mol_after_timeout
        static unwatched(side_effect, affected_dir) {
            // ждем, пока выполнится предыдущий unwatched
            const unlock = this.lock.grab();
            this.watch_off(affected_dir);
            try {
                const result = side_effect();
                this.flush();
                unlock();
                return result;
            }
            catch (e) {
                if (!$mol_promise_like(e)) {
                    this.flush();
                    unlock();
                }
                $mol_fail_hidden(e);
            }
        }
        reset() {
            this.stat(null);
        }
        modified() { return this.stat()?.mtime ?? null; }
        version() {
            const next = this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
            // console.log('version', next, this.path())
            return next;
        }
        info(path) { return null; }
        ensure() { }
        drop() { }
        copy(to) { }
        read() { return new Uint8Array; }
        write(buffer) { }
        kids() {
            return [];
        }
        readable(opts) {
            return new ReadableStream;
        }
        writable(opts) {
            return new WritableStream;
        }
        // open( ... modes: readonly $mol_file_mode[] ) { return 0 }
        buffer(next) {
            // Если версия пустая - возвращаем пустой буфер
            let readed = new Uint8Array();
            if (next === undefined) {
                // Если меняется версия файла, буфер надо перечитать
                if (this.version())
                    readed = this.read();
            }
            const prev = $mol_mem_cached(() => this.buffer());
            const changed = prev === undefined || !$mol_compare_array(prev, next ?? readed);
            if (prev !== undefined && changed) {
                // Логируем, если повторно читаем/пишем и буфер поменялся
                this.$.$mol_log3_rise({
                    place: `$mol_file_node.buffer()`,
                    message: 'Changed',
                    path: this.relate(),
                });
            }
            if (next === undefined)
                return changed ? readed : prev;
            // Если буфер при записи не поменялся и файл не удаляли перед этим - не записываем новую версию.
            // Если записывать, это приведет к смене mtime и вотчер снова триггернется, даже если содержимое файла не поменялось.
            // В этом алгоритме есть изъян.
            // Если файл записали, потом отключили вотчер, кто-то из вне его поменял, потом включили вотчер, снова записали тот же буфер,
            // то буфер не запишется на диск, т.к. кэш не консистентен с диском.
            if (!changed && this.exists())
                return prev;
            this.parent().exists(true);
            this.stat(this.stat_make(next.length), 'virt');
            this.write(next);
            return next;
        }
        stat_make(size) {
            const now = new Date();
            return {
                type: 'file',
                size,
                atime: now,
                mtime: now,
                ctime: now,
            };
        }
        clone(to) {
            if (!this.exists())
                return null;
            const target = this.constructor.absolute(to);
            try {
                this.version();
                target.parent().exists(true);
                this.copy(to);
                target.reset();
                return target;
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    console.error(error);
                }
            }
            return null;
        }
        // static watch_root = ''
        // static watcher_warned = false
        watcher() {
            // const constructor = this.constructor as typeof $mol_file_base
            // if (! constructor.watcher_warned) {
            // 	console.warn(`${constructor}.watcher() not implemented`)
            // 	constructor.watcher_warned = true
            // }
            return {
                destructor() { }
            };
        }
        exists(next) {
            const exists = Boolean(this.stat());
            // console.log('exists current', exists, 'next', next, this.path())
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next) {
                this.parent().exists(true);
                this.ensure();
            }
            else {
                this.drop();
            }
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            // Если записываем text, и вотчер ресетнул записанный файл,
            // то надо снова его обновить, вызвать логику, которая делала пуш в text.
            // Например файл удалили, потом снова создали, версия поменялась - перезаписываем
            // Если использовать version, то вновь созданный файл, через вотчер запустит свое пересоздание
            if (next !== undefined)
                this.exists();
            return this.text_int(next, virt);
        }
        text_int(next, virt) {
            if (virt) {
                this.stat(this.stat_make(0), 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer());
            }
            else {
                const buffer = $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        sub(reset) {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            this.version();
            // Если дочерний file удалился, список надо обновить
            return this.kids().filter(file => file.exists());
        }
        resolve(path) {
            throw new Error('implement');
        }
        relate(base = this.constructor.relative('.')) {
            const base_path = base.path();
            const path = this.path();
            return path.startsWith(base_path) ? path.slice(base_path.length) : path;
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
        toJSON() {
            return this.path();
        }
        open(...modes) {
            return this.$.$mol_file_transaction.make({
                path: () => this.path(),
                modes: () => modes
            });
        }
    }
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "exists_cut", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "modified", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "version", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "readable", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "writable", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "stat_make", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "clone", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "text_int", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "sub", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "size", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "open", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base, "absolute", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "flush", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "watch_off", null);
    $.$mol_file_base = $mol_file_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function $mol_file_node_buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    $.$mol_file_node_buffer_normalize = $mol_file_node_buffer_normalize;
    class $mol_file_node extends $mol_file {
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher(reset) {
            const path = this.path();
            const root = this.root();
            // Если папки/файла нет, watch упадет с ошибкой
            // exists обратится к parent.version и parent.watcher
            // Поэтому у root-папки и выше не надо вызывать exists, иначе поднимется выше base до корня диска
            // exists вызывать надо, что б пересоздавать вотчер при появлении папки или файла
            if (!root && !this.exists())
                return super.watcher();
            let watcher;
            try {
                // Между exists и watch файл может удалиться, в любом случае надо обрабатывать ENOENT
                watcher = $node.fs.watch(path);
            }
            catch (error) {
                if (!(error instanceof Error))
                    error = new Error('Unknown watch error', { cause: error });
                error.message += '\n' + path;
                if (root || error.code !== 'ENOENT') {
                    this.$.$mol_fail_log(error);
                }
                // Если файла нет - вотчер не создается, создастся потом, когда exists поменяется на true.
                // Если создание упало с другой ошибкой - не ломаем работу mol_file, деградируем до не реактивной fs.
                return super.watcher();
            }
            watcher.on('change', (type, name) => {
                if (!name)
                    return;
                const path = $node.path.join(this.path(), name.toString());
                this.constructor.changed_add(type, path);
            });
            watcher.on('error', e => this.$.$mol_fail_log(e));
            let destructed = false;
            watcher.on('close', () => {
                // Если в процессе работы вотчер сам закрылся, надо его переоткрыть
                if (!destructed)
                    setTimeout(() => $mol_wire_async(this).watcher(null), 500);
            });
            return {
                destructor() {
                    destructed = true;
                    watcher.close();
                }
            };
        }
        info(path) {
            try {
                return stat_convert($node.fs.statSync(path));
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    if (error.code === 'ENOENT')
                        return null;
                    if (error.code === 'EPERM')
                        return null;
                    error.message += '\n' + path;
                    this.$.$mol_fail_hidden(error);
                }
            }
            return null;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path, { recursive: true });
                return null;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'EEXIST')
                        return null;
                    e.message += '\n' + path;
                    this.$.$mol_fail_hidden(e);
                }
            }
        }
        copy(to) {
            $node.fs.copyFileSync(this.path(), to);
        }
        drop() {
            $node.fs.unlinkSync(this.path());
        }
        read() {
            const path = this.path();
            try {
                return $mol_file_node_buffer_normalize($node.fs.readFileSync(path));
            }
            catch (error) {
                if (!$mol_promise_like(error)) {
                    error.message += '\n' + path;
                }
                $mol_fail_hidden(error);
            }
        }
        write(buffer) {
            const path = this.path();
            try {
                $node.fs.writeFileSync(path, buffer);
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    error.message += '\n' + path;
                }
                return this.$.$mol_fail_hidden(error);
            }
        }
        kids() {
            const path = this.path();
            try {
                const kids = $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
                return kids;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'ENOENT')
                        return [];
                    e.message += '\n' + path;
                }
                $mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor
                .relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        readable(opts) {
            const { Readable } = $node['node:stream'];
            const stream = $node.fs.createReadStream(this.path(), {
                flags: 'r',
                autoClose: true,
                start: opts?.start,
                end: opts?.end,
                encoding: 'binary',
            });
            return Readable.toWeb(stream);
        }
        writable(opts) {
            const { Writable } = $node['node:stream'];
            const stream = $node.fs.createWriteStream(this.path(), {
                flags: 'w+',
                autoClose: true,
                start: opts?.start,
                encoding: 'binary',
            });
            return Writable.toWeb(stream);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "info", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "copy", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "drop", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "read", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "write", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node.prototype, "readable", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "writable", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local_node extends $mol_state_local {
        static dir() {
            const base = process.env.XDG_DATA_HOME || ($node.os.homedir() + '/.local/share');
            return $mol_file.absolute(base).resolve('./mol_state_local');
        }
        static value(key, next) {
            const file = this.dir().resolve(encodeURIComponent(key) + '.json');
            if (next === null) {
                file.exists(false);
                return null;
            }
            const arg = next === undefined ? undefined : JSON.stringify(next);
            return JSON.parse(file.text(arg) || 'null');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local_node, "dir", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local_node, "value", null);
    $.$mol_state_local_node = $mol_state_local_node;
    $.$mol_state_local = $mol_state_local_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Localisation in $mol framework
     * @see https://mol.hyoo.ru/#!section=docs/=s5aqnb_odub8l
     */
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static langs_rtl() {
            return ['ar', 'he', 'fa', 'ur', 'yi', 'ps', 'ug', 'sd'];
        }
        static direction() {
            const lang = this.lang();
            let direction;
            try {
                direction = new Intl.Locale(lang).getTextInfo().direction;
            }
            catch (e) {
                $mol_fail_log(e);
            }
            return direction ?? (this.langs_rtl().includes(lang) ? 'rtl' : 'ltr');
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "direction", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));

;
	($.$mol_link_source) = class $mol_link_source extends ($.$mol_link) {
		Icon(){
			const obj = new this.$.$mol_icon_script_text();
			return obj;
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_link_source_hint"));
		}
		sub(){
			return [(this.Icon())];
		}
	};
	($mol_mem(($.$mol_link_source.prototype), "Icon"));


;
"use strict";


;
	($.$mol_scroll) = class $mol_scroll extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		event_scroll(next){
			if(next !== undefined) return next;
			return null;
		}
		scroll_top(next){
			if(next !== undefined) return next;
			return 0;
		}
		scroll_left(next){
			if(next !== undefined) return next;
			return 0;
		}
		attr(){
			return {...(super.attr()), "tabindex": (this.tabindex())};
		}
		event(){
			return {...(super.event()), "scroll": (next) => (this.event_scroll(next))};
		}
	};
	($mol_mem(($.$mol_scroll.prototype), "event_scroll"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_top"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_left"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_listener extends $mol_object {
        _node;
        _event;
        _handler;
        _config;
        constructor(_node, _event, _handler, _config = { passive: true }) {
            super();
            this._node = _node;
            this._event = _event;
            this._handler = _handler;
            this._config = _config;
            this._node.addEventListener(this._event, this._handler, this._config);
        }
        destructor() {
            this._node.removeEventListener(this._event, this._handler, this._config);
            super.destructor();
        }
    }
    $.$mol_dom_listener = $mol_dom_listener;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_print extends $mol_object {
        static before() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'beforeprint', () => {
                this.active(true);
            });
        }
        static after() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'afterprint', () => {
                this.active(false);
            });
        }
        static active(next) {
            this.before();
            this.after();
            return next || false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_print, "before", null);
    __decorate([
        $mol_mem
    ], $mol_print, "after", null);
    __decorate([
        $mol_mem
    ], $mol_print, "active", null);
    $.$mol_print = $mol_print;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Scrolling pane.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_scroll_demo
         */
        class $mol_scroll extends $.$mol_scroll {
            scroll_top(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollTop = next;
                return el.scrollTop;
            }
            scroll_left(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollLeft = next;
                return el.scrollLeft;
            }
            event_scroll(next) {
                const el = this.dom_node();
                this.scroll_left(el.scrollLeft, 'cache');
                this.scroll_top(el.scrollTop, 'cache');
            }
            minimal_height() {
                return this.$.$mol_print.active() ? null : 0;
            }
            minimal_width() {
                return this.$.$mol_print.active() ? null : 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem, px } = $mol_style_unit;
        $mol_style_define($mol_scroll, {
            display: 'grid',
            overflow: 'auto',
            flex: {
                direction: 'column',
                grow: 1,
                shrink: 1,
                // basis: 0,
            },
            outline: 'none',
            align: {
                self: 'stretch',
                items: 'flex-start',
            },
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            scroll: {
                padding: [rem(.75), 0],
            },
            maxHeight: per(100),
            maxWidth: per(100),
            webkitOverflowScrolling: 'touch',
            contain: 'content',
            '>': {
                $mol_view: {
                    // transform: 'translateZ(0)', // enforce gpu scroll in all agents
                    gridArea: '1/1',
                },
            },
            '::before': {
                display: 'none',
            },
            '::after': {
                display: 'none',
            },
            '::-webkit-scrollbar': {
                width: rem(.25),
                height: rem(.25),
            },
            '@media': {
                'print': {
                    overflow: 'hidden',
                    contain: 'none',
                    maxHeight: 'unset',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_page) = class $mol_page extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		Logo(){
			return null;
		}
		title_content(){
			return [(this.Logo()), (this.title())];
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h1");
			(obj.sub) = () => ((this.title_content()));
			return obj;
		}
		tools(){
			return [];
		}
		Tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.tools()));
			return obj;
		}
		head(){
			return [(this.Title()), (this.Tools())];
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (64);
			(obj.dom_name) = () => ("header");
			(obj.sub) = () => ((this.head()));
			return obj;
		}
		body_scroll_top(next){
			return (this.Body().scroll_top(next));
		}
		body(){
			return [];
		}
		Body_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		body_content(){
			return [(this.Body_content())];
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ((this.body_content()));
			return obj;
		}
		foot(){
			return [];
		}
		Foot(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("footer");
			(obj.sub) = () => ((this.foot()));
			return obj;
		}
		dom_name(){
			return "article";
		}
		attr(){
			return {...(super.attr()), "tabIndex": (this.tabindex())};
		}
		sub(){
			return [
				(this.Head()), 
				(this.Body()), 
				(this.Foot())
			];
		}
	};
	($mol_mem(($.$mol_page.prototype), "Title"));
	($mol_mem(($.$mol_page.prototype), "Tools"));
	($mol_mem(($.$mol_page.prototype), "Head"));
	($mol_mem(($.$mol_page.prototype), "Body_content"));
	($mol_mem(($.$mol_page.prototype), "Body"));
	($mol_mem(($.$mol_page.prototype), "Foot"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem } = $mol_style_unit;
        const { hsla, blur } = $mol_style_func;
        $mol_style_define($mol_page, {
            display: 'flex',
            flex: {
                basis: 'auto',
                direction: 'column',
            },
            position: 'relative',
            alignSelf: 'stretch',
            maxWidth: per(100),
            maxHeight: per(100),
            boxSizing: 'border-box',
            color: $mol_theme.text,
            // backdropFilter: blur( `3px` ), enforces layering
            // zIndex: 0 ,
            ':focus': {
                outline: 'none',
            },
            Head: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                flex: 'none',
                position: 'relative',
                margin: 0,
                minHeight: rem(4),
                padding: $mol_gap.block,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 2,
                '@media': {
                    'print': {
                        box: {
                            shadow: [[0, `1px`, 0, 0, hsla(0, 0, 0, .25)]],
                        },
                    },
                },
            },
            Title: {
                minHeight: rem(2),
                margin: 0,
                padding: $mol_gap.text,
                gap: $mol_gap.text,
                wordBreak: 'normal',
                textShadow: '0 0',
                font: {
                    size: 'inherit',
                    weight: 'normal',
                },
                flex: {
                    grow: 1,
                    shrink: 1,
                    basis: 'auto',
                },
            },
            Tools: {
                flex: {
                    basis: 'auto',
                    grow: 0,
                    shrink: 1,
                },
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                '@media': {
                    'print': {
                        display: 'none',
                    },
                },
            },
            Body: {
                flex: {
                    grow: 1000,
                    shrink: 1,
                    basis: per(100),
                },
            },
            Body_content: {
                padding: $mol_gap.block,
                minHeight: 0,
                minWidth: 0,
                flex: {
                    direction: 'column',
                    shrink: 1,
                    grow: 1,
                },
                justify: {
                    self: 'stretch',
                },
            },
            Foot: {
                display: 'flex',
                justifyContent: 'space-between',
                flex: 'none',
                margin: 0,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 1,
                padding: $mol_gap.block,
                ':empty': {
                    display: 'none',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_keyboard_state) = class $mol_keyboard_state extends ($.$mol_plugin) {
		down(next){
			if(next !== undefined) return next;
			return null;
		}
		up(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {
				...(super.event()), 
				"keydown": (next) => (this.down(next)), 
				"keyup": (next) => (this.up(next))
			};
		}
		key(){
			return {};
		}
	};
	($mol_mem(($.$mol_keyboard_state.prototype), "down"));
	($mol_mem(($.$mol_keyboard_state.prototype), "up"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_keyboard_state extends $.$mol_keyboard_state {
            key() {
                return super.key();
            }
            down(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                const handle = this.key()[name];
                if (handle)
                    handle(true);
            }
            up(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                const handle = this.key()[name];
                if (handle)
                    handle(false);
            }
        }
        $$.$mol_keyboard_state = $mol_keyboard_state;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const faces = [
        [[0, 0, 1], [1, 0, 0], [0, 1, 0]],
        [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
        [[0, 0, -1], [-1, 0, 0], [0, 1, 0]],
        [[-1, 0, 0], [0, 0, 1], [0, 1, 0]],
        [[0, 1, 0], [1, 0, 0], [0, 0, -1]],
        [[0, -1, 0], [1, 0, 0], [0, 0, 1]],
    ];
    const corners = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
    const strip = [];
    for (let face = 0; face < faces.length; ++face) {
        if (face > 0)
            strip.push([face, 0]);
        for (let corner = 0; corner < corners.length; ++corner)
            strip.push([face, corner]);
        if (face < faces.length - 1)
            strip.push([face, 3]);
    }
    class $bog_gamengine_shape_box extends $bog_gamengine_shape {
        geometry() {
            const geometry = new Float32Array(strip.length * 3);
            for (let i = 0; i < strip.length; ++i) {
                const [normal, u, v] = faces[strip[i][0]];
                const [cx, cy] = corners[strip[i][1]];
                for (let axis = 0; axis < 3; ++axis) {
                    geometry[i * 3 + axis] = (normal[axis] + u[axis] * cx + v[axis] * cy) / 2;
                }
            }
            return geometry;
        }
        skin() {
            const skin = new Float32Array(strip.length * 2);
            for (let i = 0; i < strip.length; ++i) {
                const [cx, cy] = corners[strip[i][1]];
                skin[i * 2] = cx > 0 ? 1 : 0;
                skin[i * 2 + 1] = cy > 0 ? 0 : 1;
            }
            return skin;
        }
        normals() {
            const normals = new Float32Array(strip.length * 3);
            for (let i = 0; i < strip.length; ++i) {
                const normal = faces[strip[i][0]][0];
                for (let axis = 0; axis < 3; ++axis)
                    normals[i * 3 + axis] = normal[axis];
            }
            return normals;
        }
        count() {
            return faces.length * corners.length;
        }
    }
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_box.prototype, "geometry", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_box.prototype, "skin", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_box.prototype, "normals", null);
    $.$bog_gamengine_shape_box = $bog_gamengine_shape_box;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shape_plane extends $bog_gamengine_shape {
        tile(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        geometry() {
            return new Float32Array([
                -0.5, 0, +0.5,
                +0.5, 0, +0.5,
                -0.5, 0, -0.5,
                +0.5, 0, -0.5,
            ]);
        }
        skin() {
            const tile = this.tile();
            const u = tile[0];
            const v = tile[1];
            return new Float32Array([
                0, v,
                u, v,
                0, 0,
                u, 0,
            ]);
        }
        normals() {
            return new Float32Array([
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
            ]);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_plane.prototype, "tile", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_plane.prototype, "geometry", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_plane.prototype, "skin", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_plane.prototype, "normals", null);
    $.$bog_gamengine_shape_plane = $bog_gamengine_shape_plane;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_cam_deep extends $bog_gamengine_cam {
        fov(next) {
            return next ?? Math.PI / 3;
        }
        near(next) {
            return next ?? 0.1;
        }
        far(next) {
            return next ?? 100;
        }
        follow(next) {
            return next ?? null;
        }
        lift(next) {
            return next ?? 0;
        }
        step(dt) {
            const node = this.follow();
            if (!node)
                return;
            const at = node.pos();
            const lift = this.lift();
            const pos = this.pos();
            if (pos[0] !== at[0] || pos[1] !== at[1] + lift || pos[2] !== at[2]) {
                const next = new Float32Array(3);
                next[0] = at[0];
                next[1] = at[1] + lift;
                next[2] = at[2];
                this.pos(next);
            }
            const turn = node.rot();
            const rot = this.rot();
            if (rot[0] === turn[0] && rot[1] === turn[1] && rot[2] === turn[2])
                return;
            const next = new Float32Array(3);
            next[0] = turn[0];
            next[1] = turn[1];
            next[2] = turn[2];
            this.rot(next);
        }
        props() {
            return [
                ...super.props(),
                { name: 'lift', kind: 'number', get: () => this.lift(), set: next => this.lift(next) },
                { name: 'fov', kind: 'number', get: () => this.fov(), set: next => this.fov(next) },
                { name: 'near', kind: 'number', get: () => this.near(), set: next => this.near(next) },
                { name: 'far', kind: 'number', get: () => this.far(), set: next => this.far(next) },
            ];
        }
        proj(aspect) {
            return $mol_3d_mat4.perspective(this.fov(), aspect, this.near(), this.far());
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_deep.prototype, "fov", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_deep.prototype, "near", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_deep.prototype, "far", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_deep.prototype, "follow", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_deep.prototype, "lift", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_cam_deep.prototype, "proj", null);
    $.$bog_gamengine_cam_deep = $bog_gamengine_cam_deep;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const uv_plain = new Float32Array([0, 0, 1, 1]);
    class $bog_gamengine_mesh extends $bog_gamengine_node {
        lods(next) {
            return next ?? [];
        }
        radius() {
            try {
                return this.shape().radius();
            }
            catch (error) {
                if ($mol_promise_like(error))
                    return Infinity;
                return $mol_fail_hidden(error);
            }
        }
        shape(next) {
            return next ?? new $bog_gamengine_shape_box;
        }
        atlas(next) {
            return next ?? null;
        }
        frame(next = '') {
            return next;
        }
        size(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1]);
        }
        material(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0.6, 0, 0]);
        }
        normal_frame(next = '') {
            return next;
        }
        props() {
            return [
                ...super.props(),
                { name: 'frame', kind: 'frame', get: () => this.frame(), set: next => this.frame(next) },
                { name: 'normal_frame', kind: 'frame', get: () => this.normal_frame(), set: next => this.normal_frame(next) },
                { name: 'size', kind: 'vec3', get: () => this.size(), set: next => this.size(next) },
                { name: 'material', kind: 'vec4', get: () => this.material(), set: next => this.material(next) },
                { name: 'billboard', kind: 'flag', get: () => this.billboard(), set: next => this.billboard(next) },
            ];
        }
        layer() {
            const atlas = this.atlas();
            return atlas ? atlas.layer(this.frame()) : 0;
        }
        normal_layer() {
            const atlas = this.atlas();
            const frame = this.normal_frame();
            return atlas && frame ? atlas.layer(frame) : -1;
        }
        uv() {
            return uv_plain;
        }
        trans() {
            return $mol_3d_mat4.multiply(super.trans(), $mol_3d_mat4.scaling(this.size()));
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "lods", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "shape", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "material", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "normal_frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "layer", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "normal_layer", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "trans", null);
    $.$bog_gamengine_mesh = $bog_gamengine_mesh;
})($ || ($ = {}));

;
	($.$bog_game_arcade) = class $bog_game_arcade extends ($.$mol_stack) {
		spawn_pos(){
			return (this.Realm().spawn_pos());
		}
		map_rows(){
			return (this.Realm().map_rows());
		}
		map_width(){
			return (this.Realm().map_width());
		}
		map_height(){
			return (this.Realm().map_height());
		}
		guy_pos(){
			return (this.Guy().pos());
		}
		turn_left(next){
			return (this.Guy().turn_left(next));
		}
		turn_right(next){
			return (this.Guy().turn_right(next));
		}
		move_forward(next){
			return (this.Guy().move_forward(next));
		}
		move_backward(next){
			return (this.Guy().move_backward(next));
		}
		move_left(next){
			return (this.Guy().move_left(next));
		}
		move_right(next){
			return (this.Guy().move_right(next));
		}
		guy_angle(){
			return (this.Guy().angle());
		}
		Guy(){
			const obj = new this.$.$bog_game_actor();
			(obj.Realm) = () => ((this.Realm()));
			(obj.pos_spawn) = () => ((this.spawn_pos()));
			return obj;
		}
		Healer(){
			const obj = new this.$.$bog_game_actor_ghost();
			(obj.Realm) = () => ((this.Realm()));
			(obj.pos_spawn) = () => ((this.spawn_pos()));
			return obj;
		}
		Draw(){
			const obj = new this.$.$bog_gamengine_draw();
			(obj.scene) = () => ((this.Scene()));
			(obj.cam) = () => ((this.Cam()));
			(obj.ambient) = () => (0.6);
			return obj;
		}
		View(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Draw())]);
			return obj;
		}
		title(){
			return "$bog_game_arcade";
		}
		Ear(){
			const obj = new this.$.$mol_video_player();
			(obj.uri) = () => ("https://mp3d.jamendo.com/?trackid=1889563&format=mp33");
			(obj.loop) = () => (true);
			(obj.autoplay) = () => (true);
			(obj.volume) = (next) => (0.001);
			(obj.controls) = () => (false);
			return obj;
		}
		Sources(){
			const obj = new this.$.$mol_link_source();
			(obj.uri) = () => ("https://github.com/b-on-g/game");
			return obj;
		}
		stat(){
			return "";
		}
		Hud(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.title()));
			(obj.tools) = () => ([(this.Ear()), (this.Sources())]);
			(obj.foot) = () => ([(this.stat())]);
			return obj;
		}
		Control(){
			const obj = new this.$.$mol_keyboard_state();
			(obj.key) = () => ({
				"W": (next) => (this.move_forward(next)), 
				"A": (next) => (this.move_left(next)), 
				"S": (next) => (this.move_backward(next)), 
				"D": (next) => (this.move_right(next)), 
				"Q": (next) => (this.turn_left(next)), 
				"E": (next) => (this.turn_right(next)), 
				"up": (next) => (this.move_forward(next)), 
				"left": (next) => (this.turn_left(next)), 
				"down": (next) => (this.move_backward(next)), 
				"right": (next) => (this.turn_right(next)), 
				"pageUp": (next) => (this.move_left(next)), 
				"pageDown": (next) => (this.move_right(next))
			});
			return obj;
		}
		nodes(){
			return [];
		}
		Solid(){
			const obj = new this.$.$bog_gamengine_shader_solid();
			return obj;
		}
		Box(){
			const obj = new this.$.$bog_gamengine_shape_box();
			return obj;
		}
		walls(){
			return [];
		}
		Wall_batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Solid()));
			(obj.shape) = () => ((this.Box()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.nodes) = () => ((this.walls()));
			return obj;
		}
		map_tile(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		Plane(){
			const obj = new this.$.$bog_gamengine_shape_plane();
			(obj.tile) = () => ((this.map_tile()));
			return obj;
		}
		Floor_batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Solid()));
			(obj.shape) = () => ((this.Plane()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.nodes) = () => ([(this.Floor()), (this.Ceil())]);
			return obj;
		}
		Quad(){
			const obj = new this.$.$bog_gamengine_shape_quad();
			return obj;
		}
		avatars(){
			return [];
		}
		Avatar_batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Solid()));
			(obj.shape) = () => ((this.Quad()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.nodes) = () => ((this.avatars()));
			return obj;
		}
		cam_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		cam_rot(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		wall_frame(id){
			return "";
		}
		wall_pos(id){
			const obj = new this.$.Float32Array();
			return obj;
		}
		floor_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		floor_size(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		ceil_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		ceil_rot(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		avatar_pos(id){
			const obj = new this.$.Float32Array();
			return obj;
		}
		map(){
			return "🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑\n🛑🛑🟦⚫⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫⚫🟦🛑🛑\n🛑🟦⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🟦🛑\n🛑⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🟦⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🛑\n🛑⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🟦🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🛑\n🛑⚫⚫⚫🎨🟦🎨⚫💫⚫🎨🟦🎨⚫💫⚫🟦🟦🟦⚫💫⚫🎨🟦🎨⚫💫⚫🎨🟦🎨⚫⚫⚫🛑\n🛑⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🟦🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🛑\n🛑🟦⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🟦🟦🟦🟦🟦⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🟦🛑\n🛑🎨⚫⚫⚫💫⚫⚫💫⚫⚫💫⚫⚫⚫🎨🟦🟦🟦🎨⚫⚫⚫💫⚫⚫💫⚫⚫💫⚫⚫⚫🎨🛑\n🛑🟦⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🟦🟦🟦🟦🟦⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🟦🛑\n🛑⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🟦🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🛑\n🛑⚫⚫⚫🎨🟦🎨⚫💫⚫🎨🟦🎨⚫💫⚫🟦🟦🟦⚫💫⚫🎨🟦🎨⚫💫⚫🎨🟦🎨⚫⚫⚫🛑\n🛑⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🟦🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🛑\n🛑⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🟦⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🛑\n🛑🟦⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🟦🛑\n🛑🛑🟦⚫⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫🟦🎨🟦⚫⚫⚫⚫🟦🛑🛑\n🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑";
		}
		place_skins(){
			return {
				"🎨": [
					"meme_1", 
					"meme_2", 
					"meme_3", 
					"meme_4", 
					"meme_5", 
					"meme_6", 
					"meme_7", 
					"meme_8", 
					"meme_9", 
					"meme_10", 
					"meme_11", 
					"meme_12", 
					"meme_13", 
					"meme_14", 
					"meme_15", 
					"meme_16", 
					"meme_17", 
					"meme_18"
				], 
				"🟦": ["wall_0", "wall_1"], 
				"🛑": ["border"]
			};
		}
		Realm(){
			const obj = new this.$.$bog_game_realm();
			(obj.map) = () => ((this.map()));
			return obj;
		}
		actors(){
			return [(this.Guy()), (this.Healer())];
		}
		sub(){
			return [(this.View()), (this.Hud())];
		}
		plugins(){
			return [(this.Control())];
		}
		Atlas(){
			const obj = new this.$.$bog_gamengine_atlas();
			(obj.size) = () => (256);
			(obj.uris) = () => ([
				"bog/game/arcade/texture/border.jpg", 
				"bog/game/arcade/texture/ground.jpg", 
				"bog/game/arcade/texture/healer_0.png", 
				"bog/game/arcade/texture/meme_1.jpg", 
				"bog/game/arcade/texture/meme_2.jpg", 
				"bog/game/arcade/texture/meme_3.jpg", 
				"bog/game/arcade/texture/meme_4.jpg", 
				"bog/game/arcade/texture/meme_5.jpg", 
				"bog/game/arcade/texture/meme_6.jpg", 
				"bog/game/arcade/texture/meme_7.jpg", 
				"bog/game/arcade/texture/meme_8.jpg", 
				"bog/game/arcade/texture/meme_9.jpg", 
				"bog/game/arcade/texture/meme_10.jpg", 
				"bog/game/arcade/texture/meme_11.jpg", 
				"bog/game/arcade/texture/meme_12.jpg", 
				"bog/game/arcade/texture/meme_13.jpg", 
				"bog/game/arcade/texture/meme_14.jpg", 
				"bog/game/arcade/texture/meme_15.jpg", 
				"bog/game/arcade/texture/meme_16.jpg", 
				"bog/game/arcade/texture/meme_17.jpg", 
				"bog/game/arcade/texture/meme_18.jpg", 
				"bog/game/arcade/texture/wall_0.jpg", 
				"bog/game/arcade/texture/wall_1.jpg"
			]);
			return obj;
		}
		Scene(){
			const obj = new this.$.$bog_gamengine_scene();
			(obj.cam) = () => ((this.Cam()));
			(obj.kids) = () => ((this.nodes()));
			(obj.batches) = () => ([
				(this.Wall_batch()), 
				(this.Floor_batch()), 
				(this.Avatar_batch())
			]);
			return obj;
		}
		Cam(){
			const obj = new this.$.$bog_gamengine_cam_deep();
			(obj.fov) = () => (1.5707963);
			(obj.pos) = () => ((this.cam_pos()));
			(obj.rot) = () => ((this.cam_rot()));
			return obj;
		}
		Wall(id){
			const obj = new this.$.$bog_gamengine_mesh();
			(obj.shape) = () => ((this.Box()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ((this.wall_frame(id)));
			(obj.pos) = () => ((this.wall_pos(id)));
			return obj;
		}
		Floor(){
			const obj = new this.$.$bog_gamengine_mesh();
			(obj.shape) = () => ((this.Plane()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("ground");
			(obj.pos) = () => ((this.floor_pos()));
			(obj.size) = () => ((this.floor_size()));
			return obj;
		}
		Ceil(){
			const obj = new this.$.$bog_gamengine_mesh();
			(obj.shape) = () => ((this.Plane()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("ground");
			(obj.pos) = () => ((this.ceil_pos()));
			(obj.rot) = () => ((this.ceil_rot()));
			(obj.size) = () => ((this.floor_size()));
			return obj;
		}
		Avatar(id){
			const obj = new this.$.$bog_gamengine_mesh();
			(obj.shape) = () => ((this.Quad()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("healer_0");
			(obj.pos) = () => ((this.avatar_pos(id)));
			(obj.billboard) = () => (true);
			return obj;
		}
	};
	($mol_mem(($.$bog_game_arcade.prototype), "Guy"));
	($mol_mem(($.$bog_game_arcade.prototype), "Healer"));
	($mol_mem(($.$bog_game_arcade.prototype), "Draw"));
	($mol_mem(($.$bog_game_arcade.prototype), "View"));
	($mol_mem(($.$bog_game_arcade.prototype), "Ear"));
	($mol_mem(($.$bog_game_arcade.prototype), "Sources"));
	($mol_mem(($.$bog_game_arcade.prototype), "Hud"));
	($mol_mem(($.$bog_game_arcade.prototype), "Control"));
	($mol_mem(($.$bog_game_arcade.prototype), "Solid"));
	($mol_mem(($.$bog_game_arcade.prototype), "Box"));
	($mol_mem(($.$bog_game_arcade.prototype), "Wall_batch"));
	($mol_mem(($.$bog_game_arcade.prototype), "map_tile"));
	($mol_mem(($.$bog_game_arcade.prototype), "Plane"));
	($mol_mem(($.$bog_game_arcade.prototype), "Floor_batch"));
	($mol_mem(($.$bog_game_arcade.prototype), "Quad"));
	($mol_mem(($.$bog_game_arcade.prototype), "Avatar_batch"));
	($mol_mem(($.$bog_game_arcade.prototype), "cam_pos"));
	($mol_mem(($.$bog_game_arcade.prototype), "cam_rot"));
	($mol_mem_key(($.$bog_game_arcade.prototype), "wall_pos"));
	($mol_mem(($.$bog_game_arcade.prototype), "floor_pos"));
	($mol_mem(($.$bog_game_arcade.prototype), "floor_size"));
	($mol_mem(($.$bog_game_arcade.prototype), "ceil_pos"));
	($mol_mem(($.$bog_game_arcade.prototype), "ceil_rot"));
	($mol_mem_key(($.$bog_game_arcade.prototype), "avatar_pos"));
	($mol_mem(($.$bog_game_arcade.prototype), "Realm"));
	($mol_mem(($.$bog_game_arcade.prototype), "Atlas"));
	($mol_mem(($.$bog_game_arcade.prototype), "Scene"));
	($mol_mem(($.$bog_game_arcade.prototype), "Cam"));
	($mol_mem_key(($.$bog_game_arcade.prototype), "Wall"));
	($mol_mem(($.$bog_game_arcade.prototype), "Floor"));
	($mol_mem(($.$bog_game_arcade.prototype), "Ceil"));
	($mol_mem_key(($.$bog_game_arcade.prototype), "Avatar"));


;
"use strict";
var $;
(function ($) {
    function $mol_offline() { }
    $.$mol_offline = $mol_offline;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    try {
        $mol_offline();
    }
    catch (error) {
        console.error(error);
    }
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_game_arcade extends $.$bog_game_arcade {
            stat() {
                const [x, y] = this.guy_pos();
                return [
                    `pos: ${x.toFixed(3)} x ${y.toFixed(3)}`,
                    `angle: ${this.guy_angle().toFixed(3)}`,
                    `objects: ${this.nodes().length}`,
                    `batches: ${this.Scene().batches().length}`,
                    `layers: ${this.Atlas().ready() ? this.Atlas().uris().length : 0}`,
                ].join(' | ');
            }
            wall_ids() {
                const rows = this.map_rows();
                const ids = [];
                for (let y = 0; y < rows.length; ++y) {
                    for (let x = 0; x < rows[y].length; ++x) {
                        if (rows[y][x] !== '⚫')
                            ids.push(`${x}_${y}`);
                    }
                }
                return ids;
            }
            walls() {
                return this.wall_ids().map(id => this.Wall(id));
            }
            wall_frame(id) {
                const [x, y] = id.split('_').map(Number);
                const skins = this.place_skins();
                const kind = this.map_rows()[y][x];
                return $mol_array_lottery(skins[kind]);
            }
            wall_pos(id) {
                const [x, y] = id.split('_').map(Number);
                return new Float32Array([x + 0.5, 0.5, y + 0.5]);
            }
            floor_pos() {
                return new Float32Array([this.map_width() / 2, 0, this.map_height() / 2]);
            }
            floor_size() {
                return new Float32Array([this.map_width(), 1, this.map_height()]);
            }
            map_tile() {
                return new Float32Array([this.map_width(), this.map_height()]);
            }
            ceil_pos() {
                return new Float32Array([this.map_width() / 2, 1, this.map_height() / 2]);
            }
            ceil_rot() {
                return new Float32Array([Math.PI, 0, 0]);
            }
            cam_pos() {
                const [x, y] = this.guy_pos();
                return new Float32Array([x, 0.25, y]);
            }
            cam_rot() {
                return new Float32Array([0, -this.guy_angle(), 0]);
            }
            avatars() {
                return this.actors().map((_, i) => this.Avatar(i));
            }
            avatar_pos(index) {
                const [x, y] = this.actors()[index].pos();
                return new Float32Array([x, 0.5, y]);
            }
            nodes() {
                return [...this.walls(), this.Floor(), this.Ceil(), ...this.avatars()];
            }
            auto() {
                for (const actor of this.actors()) {
                    actor.auto();
                }
            }
        }
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "wall_ids", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "walls", null);
        __decorate([
            $mol_mem_key
        ], $bog_game_arcade.prototype, "wall_frame", null);
        __decorate([
            $mol_mem_key
        ], $bog_game_arcade.prototype, "wall_pos", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "floor_pos", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "floor_size", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "map_tile", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "ceil_pos", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "ceil_rot", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "cam_pos", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "cam_rot", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "avatars", null);
        __decorate([
            $mol_mem_key
        ], $bog_game_arcade.prototype, "avatar_pos", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "nodes", null);
        __decorate([
            $mol_mem
        ], $bog_game_arcade.prototype, "auto", null);
        $$.$bog_game_arcade = $bog_game_arcade;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        $mol_style_define($bog_game_arcade, {
            View: {
                alignSelf: 'stretch',
                justifySelf: 'stretch',
            },
            Hud: {
                alignSelf: 'stretch',
                justifySelf: 'stretch',
            },
            Ear: {
                height: rem(2.5),
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));


export default $
//# sourceMappingURL=node.js.map
