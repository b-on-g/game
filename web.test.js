"use strict";
function require( path ){ return $node[ path ] };
"use strict";

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

;
"use strict";
var $;
(function ($_1) {
    function $mol_test(set) {
        for (let name in set) {
            const code = set[name];
            const test = (typeof code === 'string') ? new Function('', code) : code;
            $_1.$mol_test_all.push(test);
        }
        $mol_test_schedule();
    }
    $_1.$mol_test = $mol_test;
    $_1.$mol_test_mocks = [];
    $_1.$mol_test_all = [];
    async function $mol_test_run() {
        for (var test of $_1.$mol_test_all) {
            let context = Object.create($$);
            for (let mock of $_1.$mol_test_mocks)
                await mock(context);
            const res = test(context);
            if ($mol_promise_like(res)) {
                await new Promise((done, fail) => {
                    res.then(done, fail);
                    setTimeout(() => fail(new Error('Test timeout: ' + test.name)), 1000);
                });
            }
        }
        $$.$mol_log3_done({
            place: '$mol_test',
            message: 'All tests passed',
            count: $_1.$mol_test_all.length,
        });
    }
    $_1.$mol_test_run = $mol_test_run;
    let scheduled = false;
    function $mol_test_schedule() {
        if (scheduled)
            return;
        scheduled = true;
        setTimeout(async () => {
            scheduled = false;
            await $mol_test_run();
            $$.$mol_test_complete();
        }, 1000);
    }
    $_1.$mol_test_schedule = $mol_test_schedule;
    $_1.$mol_test_mocks.push(context => {
        let seed = 0;
        context.Math = Object.create(Math);
        context.Math.random = () => Math.sin(seed++);
        const forbidden = ['XMLHttpRequest', 'fetch'];
        for (let api of forbidden) {
            context[api] = new Proxy(function () { }, {
                get() {
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
                apply() {
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
            });
        }
    });
    $mol_test({
        'mocked Math.random'($) {
            console.assert($.Math.random() === 0);
            console.assert($.Math.random() === Math.sin(1));
        },
        'forbidden XMLHttpRequest'($) {
            try {
                console.assert(void new $.XMLHttpRequest);
            }
            catch (error) {
                console.assert(error.message === 'XMLHttpRequest is forbidden in tests');
            }
        },
        'forbidden fetch'($) {
            try {
                console.assert(void $.fetch(''));
            }
            catch (error) {
                console.assert(error.message === 'fetch is forbidden in tests');
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_test_complete() {
    }
    $.$mol_test_complete = $mol_test_complete;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Argument must be Truthy
     * @deprecated use $mol_assert_equal instead
     */
    function $mol_assert_ok(value) {
        if (value)
            return;
        $mol_fail(new Error(`${value} ≠ true`));
    }
    $.$mol_assert_ok = $mol_assert_ok;
    /**
     * Argument must be Falsy
     * @deprecated use $mol_assert_equal instead
     */
    function $mol_assert_not(value) {
        if (!value)
            return;
        $mol_fail(new Error(`${value} ≠ false`));
    }
    $.$mol_assert_not = $mol_assert_not;
    /**
     * Handler must throw an error.
     * @example
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } ) // Passes because throws error
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } , 'Parse error' ) // Passes because throws right message
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } , Error ) // Passes because throws right class
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_fail(handler, ErrorRight) {
        const fail = $.$mol_fail;
        try {
            $.$mol_fail = $.$mol_fail_hidden;
            handler();
        }
        catch (error) {
            $.$mol_fail = fail;
            if (typeof ErrorRight === 'string') {
                $mol_assert_equal(error.message ?? error, ErrorRight);
            }
            else {
                $mol_assert_equal(error instanceof ErrorRight, true);
            }
            return error;
        }
        finally {
            $.$mol_fail = fail;
        }
        $mol_fail(new Error('Not failed', { cause: { expect: ErrorRight } }));
    }
    $.$mol_assert_fail = $mol_assert_fail;
    /** @deprecated Use $mol_assert_equal */
    function $mol_assert_like(...args) {
        $mol_assert_equal(...args);
    }
    $.$mol_assert_like = $mol_assert_like;
    /**
     * All arguments must not be structural equal to each other.
     * @example
     * $mol_assert_unique( 1 , 2 , 3 ) // Passes
     * $mol_assert_unique( 1 , 1 , 2 ) // Fails because 1 === 1
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_unique(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (!$mol_compare_deep(args[i], args[j]))
                    continue;
                return $mol_fail(new Error(`Uniquesess assertion failure`, { cause: { [i]: args[i], [i]: args[i] } }));
            }
        }
    }
    $.$mol_assert_unique = $mol_assert_unique;
    /**
     * All arguments must be structural equal each other.
     * @example
     * $mol_assert_like( [1] , [1] , [1] ) // Passes
     * $mol_assert_like( [1] , [1] , [2] ) // Fails because 1 !== 2
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_equal(...args) {
        for (let i = 1; i < args.length; ++i) {
            if ($mol_compare_deep(args[0], args[i]))
                continue;
            return $mol_fail(new Error(`Equality assertion failure`, { cause: { 0: args[0], [i]: args[i] } }));
        }
    }
    $.$mol_assert_equal = $mol_assert_equal;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'must be false'() {
            $mol_assert_not(0);
        },
        'must be true'() {
            $mol_assert_ok(1);
        },
        'two must be equal'() {
            $mol_assert_equal(2, 2);
        },
        'three must be equal'() {
            $mol_assert_equal(2, 2, 2);
        },
        'two must be unique'() {
            $mol_assert_unique([2], [3]);
        },
        'three must be unique'() {
            $mol_assert_unique([1], [2], [3]);
        },
        'two must be alike'() {
            $mol_assert_equal([3], [3]);
        },
        'three must be alike'() {
            $mol_assert_equal([3], [3], [3]);
        },
        'two object must be alike'() {
            $mol_assert_equal({ a: 1 }, { a: 1 });
        },
        'three object must be alike'() {
            $mol_assert_equal({ a: 1 }, { a: 1 }, { a: 1 });
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_serialize(node) {
        const serializer = new $mol_dom_context.XMLSerializer;
        return serializer.serializeToString(node);
    }
    $.$mol_dom_serialize = $mol_dom_serialize;
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
var $;
(function ($) {
    $mol_test({
        'Make empty div'() {
            $mol_assert_equal(($mol_jsx("div", null)).outerHTML, '<div></div>');
        },
        'Define native field'() {
            const dom = $mol_jsx("input", { value: '123' });
            $mol_assert_equal(dom.outerHTML, '<input value="123">');
            $mol_assert_equal(dom.value, '123');
        },
        'Define classes'() {
            const dom = $mol_jsx("div", { class: 'foo bar' });
            $mol_assert_equal(dom.outerHTML, '<div class="foo bar"></div>');
        },
        'Define styles'() {
            const dom = $mol_jsx("div", { style: { color: 'red' } });
            $mol_assert_equal(dom.outerHTML, '<div style="color: red;"></div>');
        },
        'Define dataset'() {
            const dom = $mol_jsx("div", { dataset: { foo: 'bar' } });
            $mol_assert_equal(dom.outerHTML, '<div data-foo="bar"></div>');
        },
        'Define attributes'() {
            const dom = $mol_jsx("div", { lang: "ru", hidden: true });
            $mol_assert_equal(dom.outerHTML, '<div lang="ru" hidden=""></div>');
        },
        'Define child nodes'() {
            const dom = $mol_jsx("div", null,
                "hello",
                $mol_jsx("strong", null, "world"),
                "!");
            $mol_assert_equal(dom.outerHTML, '<div>hello<strong>world</strong>!</div>');
        },
        'Make fragment'() {
            const dom = $mol_jsx($mol_jsx_frag, null,
                $mol_jsx("br", null),
                $mol_jsx("hr", null));
            $mol_assert_equal($mol_dom_serialize(dom), '<br xmlns="http://www.w3.org/1999/xhtml" /><hr xmlns="http://www.w3.org/1999/xhtml" />');
        },
        'Spread fragment'() {
            const dom = $mol_jsx("div", null,
                $mol_jsx($mol_jsx_frag, null,
                    $mol_jsx("br", null),
                    $mol_jsx("hr", null)));
            $mol_assert_equal(dom.outerHTML, '<div><br><hr></div>');
        },
        'Function as component'() {
            const Button = (props, target) => {
                return $mol_jsx("button", { title: props.hint }, target());
            };
            const dom = $mol_jsx(Button, { id: "foo", hint: "click me" }, () => 'hey!');
            $mol_assert_equal(dom.outerHTML, '<button id="foo" title="click me" class="Button">hey!</button>');
        },
        'Nested guid generation'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "bar" },
                        $mol_jsx("img", { id: "icon" })));
            };
            const Bar = (props, icon) => {
                return $mol_jsx("span", null,
                    icon,
                    $mol_jsx("i", { id: "label" }));
            };
            const dom = $mol_jsx(Foo, { id: "foo" });
            $mol_assert_equal(dom.outerHTML, '<div id="foo" class="Foo"><span id="foo/bar" class="Foo_bar Bar"><img id="foo/icon" class="Foo_icon"><i id="foo/bar/label" class="Foo_bar_label Bar_label"></i></span></div>');
        },
        'Fail on non unique ids'() {
            const App = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("span", { id: "bar" }),
                    $mol_jsx("span", { id: "bar" }));
            };
            $mol_assert_fail(() => $mol_jsx(App, { id: "foo" }), 'JSX already has tag with id "foo/bar"');
        },
        'Owner based guid generationn'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "middle", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            const dom = $mol_jsx(Foo, { id: "app" });
            $mol_assert_equal(dom.outerHTML, '<div id="app" class="Foo"><span id="app/middle" class="Foo_middle Bar"><img id="app/icon" class="Foo_icon"></span></div>');
        },
        'Fail on same ids from different caller'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("img", { id: "icon" }),
                    $mol_jsx(Bar, { id: "bar", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            $mol_assert_fail(() => $mol_jsx(Foo, { id: "foo" }), 'JSX already has tag with id "foo/icon"');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'get'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal(proxy.foo, 777);
        },
        'has'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal('foo' in proxy, true);
        },
        'set'() {
            const target = { foo: 777 };
            const proxy = $mol_delegate({}, () => target);
            proxy.foo = 123;
            $mol_assert_equal(target.foo, 123);
        },
        'getOwnPropertyDescriptor'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_like(Object.getOwnPropertyDescriptor(proxy, 'foo'), {
                value: 777,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        },
        'ownKeys'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777, [Symbol.toStringTag]: 'bar' }));
            $mol_assert_like(Reflect.ownKeys(proxy), ['foo', Symbol.toStringTag]);
        },
        'getPrototypeOf'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_equal(Object.getPrototypeOf(proxy), Foo.prototype);
        },
        'setPrototypeOf'() {
            class Foo {
            }
            const target = {};
            const proxy = $mol_delegate({}, () => target);
            Object.setPrototypeOf(proxy, Foo.prototype);
            $mol_assert_equal(Object.getPrototypeOf(target), Foo.prototype);
        },
        'instanceof'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
        'autobind'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_log3_come = () => { };
        $.$mol_log3_done = () => { };
        $.$mol_log3_fail = () => { };
        $.$mol_log3_warn = () => { };
        $.$mol_log3_rise = () => { };
        $.$mol_log3_area = () => () => { };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'FQN of anon function'($) {
            const $$ = Object.assign($, { $mol_func_name_test: (() => () => { })() });
            $mol_assert_equal($$.$mol_func_name_test.name, '');
            $mol_assert_equal($$.$mol_func_name($$.$mol_func_name_test), '$mol_func_name_test');
            $mol_assert_equal($$.$mol_func_name_test.name, '$mol_func_name_test');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'init with overload'() {
            class X extends $mol_object {
                foo() {
                    return 1;
                }
            }
            var x = X.make({
                foo: () => 2,
            });
            $mol_assert_equal(x.foo(), 2);
        },
        'Context in instance inherits from class'($) {
            const custom = $.$mol_ambient({});
            class X extends $.$mol_object {
                static $ = custom;
            }
            $mol_assert_equal(new X().$, custom);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Collect deps'() {
            const pub1 = new $mol_wire_pub;
            const pub2 = new $mol_wire_pub;
            const sub = new $mol_wire_pub_sub;
            const bu1 = sub.track_on();
            try {
                pub1.promote();
                pub2.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu1);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub2, pub2]);
            const bu2 = sub.track_on();
            try {
                pub1.promote();
                pub1.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu2);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub1, pub2]);
        },
        'cyclic detection'($) {
            const sub1 = new $mol_wire_pub_sub;
            const sub2 = new $mol_wire_pub_sub;
            const bu1 = sub1.track_on();
            try {
                const bu2 = sub2.track_on();
                try {
                    $mol_assert_fail(() => sub1.promote(), 'Circular subscription');
                }
                finally {
                    sub2.track_cut();
                    sub2.track_off(bu2);
                }
            }
            finally {
                sub1.track_cut();
                sub1.track_off(bu1);
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /// @todo right orderinng
    $.$mol_after_mock_queue = [];
    function $mol_after_mock_warp() {
        const queue = $.$mol_after_mock_queue.splice(0);
        for (const task of queue)
            task();
    }
    $.$mol_after_mock_warp = $mol_after_mock_warp;
    class $mol_after_mock_commmon extends $mol_object2 {
        task;
        promise = Promise.resolve();
        cancelled = false;
        id;
        constructor(task) {
            super();
            this.task = task;
            $.$mol_after_mock_queue.push(task);
        }
        destructor() {
            const index = $.$mol_after_mock_queue.indexOf(this.task);
            if (index >= 0)
                $.$mol_after_mock_queue.splice(index, 1);
        }
    }
    $.$mol_after_mock_commmon = $mol_after_mock_commmon;
    class $mol_after_mock_timeout extends $mol_after_mock_commmon {
        delay;
        constructor(delay, task) {
            super(task);
            this.delay = delay;
        }
    }
    $.$mol_after_mock_timeout = $mol_after_mock_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_tick = $mol_after_mock_commmon;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Sync execution'() {
            class Sync extends $mol_object2 {
                static calc(a, b) {
                    return a + b;
                }
            }
            __decorate([
                $mol_wire_method
            ], Sync, "calc", null);
            $mol_assert_equal(Sync.calc(1, 2), 3);
        },
        async 'async <=> sync'() {
            class SyncAsync extends $mol_object2 {
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            $mol_assert_equal(await SyncAsync.calc(1, 2), 8);
        },
        async 'Idempotence control'() {
            class Idempotence extends $mol_object2 {
                static logs_idemp = 0;
                static logs_unidemp = 0;
                static log_idemp() {
                    this.logs_idemp += 1;
                }
                static log_unidemp() {
                    this.logs_unidemp += 1;
                }
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    this.log_idemp();
                    this.log_unidemp();
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            __decorate([
                $mol_wire_method
            ], Idempotence, "log_idemp", null);
            $mol_assert_equal(await Idempotence.calc(1, 2), 8);
            $mol_assert_equal(Idempotence.logs_idemp, 1);
            $mol_assert_equal(Idempotence.logs_unidemp, 3);
        },
        async 'Error handling'() {
            class Handle extends $mol_object2 {
                static async sum(a, b) {
                    $mol_fail(new Error('test error ' + (a + b)));
                }
                static check() {
                    try {
                        return $mol_wire_sync(Handle).sum(1, 2);
                    }
                    catch (error) {
                        if ($mol_promise_like(error))
                            $mol_fail_hidden(error);
                        $mol_assert_equal(error.message, 'test error 3');
                    }
                }
            }
            await $mol_wire_async(Handle).check();
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Lazy computed lists with native Array interface. $mol_range2_array is mutable but all derived ranges are immutable. */
    function $mol_range2(item = index => index, size = () => Number.POSITIVE_INFINITY) {
        const source = typeof item === 'function' ? new $mol_range2_array() : item;
        if (typeof item !== 'function') {
            item = index => source[index];
            size = () => source.length;
        }
        return new Proxy(source, {
            get(target, field) {
                if (typeof field === 'string') {
                    if (field === 'length')
                        return size();
                    const index = Number(field);
                    if (index < 0)
                        return undefined;
                    if (index >= size())
                        return undefined;
                    if (index === Math.trunc(index))
                        return item(index);
                }
                return $mol_range2_array.prototype[field];
            },
            set(target, field) {
                return $mol_fail(new TypeError(`Lazy range is read only (trying to set field ${JSON.stringify(field)})`));
            },
            ownKeys(target) {
                return [...Array(size())].map((v, i) => String(i)).concat('length');
            },
            getOwnPropertyDescriptor(target, field) {
                if (field === "length")
                    return {
                        value: size(),
                        writable: true,
                        enumerable: false,
                        configurable: false,
                    };
                const index = Number(field);
                if (index === Math.trunc(index))
                    return {
                        get: () => this.get(target, field, this),
                        enumerable: true,
                        configurable: true,
                    };
                return Object.getOwnPropertyDescriptor(target, field);
            }
        });
    }
    $.$mol_range2 = $mol_range2;
    class $mol_range2_array extends Array {
        // Lazy
        concat(...tail) {
            if (tail.length === 0)
                return this;
            if (tail.length > 1) {
                let list = this;
                for (let item of tail)
                    list = list.concat(item);
                return list;
            }
            return $mol_range2(index => index < this.length ? this[index] : tail[0][index - this.length], () => this.length + tail[0].length);
        }
        // Lazy
        filter(check, context) {
            const filtered = [];
            let cursor = -1;
            return $mol_range2(index => {
                while (cursor < this.length && index >= filtered.length - 1) {
                    const val = this[++cursor];
                    if (check(val, cursor, this))
                        filtered.push(val);
                }
                return filtered[index];
            }, () => cursor < this.length ? Number.POSITIVE_INFINITY : filtered.length);
        }
        // Diligent
        forEach(proceed, context) {
            for (let [key, value] of this.entries())
                proceed.call(context, value, key, this);
        }
        // Lazy
        map(proceed, context) {
            return $mol_range2(index => proceed.call(context, this[index], index, this), () => this.length);
        }
        // Diligent
        reduce(merge, result) {
            let index = 0;
            if (arguments.length === 1) {
                result = this[index++];
            }
            for (; index < this.length; ++index) {
                result = merge(result, this[index], index, this);
            }
            return result;
        }
        // Lazy
        toReversed() {
            return $mol_range2(index => this[this.length - 1 - index], () => this.length);
        }
        // Lazy
        slice(from = 0, to = this.length) {
            return $mol_range2(index => this[from + index], () => Math.min(to, this.length) - from);
        }
        // Lazy
        some(check, context) {
            for (let index = 0; index < this.length; ++index) {
                if (check.call(context, this[index], index, this))
                    return true;
            }
            return false;
        }
        every(check, context) {
            for (let index = 0; index < this.length; ++index) {
                if (!check.call(context, this[index], index, this))
                    return false;
            }
            return true;
        }
        reverse() {
            return $mol_fail(new TypeError(`Mutable reverse is forbidden. Use toReversed instead.`));
        }
        sort() {
            return $mol_fail(new TypeError(`Mutable sort is forbidden. Use toSorted instead.`));
        }
        indexOf(needle) {
            return this.findIndex(item => item === needle);
        }
        [Symbol.toPrimitive]() {
            return $mol_guid();
        }
    }
    $.$mol_range2_array = $mol_range2_array;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'lazy calls'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 10);
            $mol_assert_equal(list[-1], undefined);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[9], 9);
            $mol_assert_equal(list[9.5], undefined);
            $mol_assert_equal(list[10], undefined);
            $mol_assert_equal(calls, 2);
        },
        'infinity list'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index));
            $mol_assert_equal(list.length, Number.POSITIVE_INFINITY);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[4], 4);
            $mol_assert_equal(list[Number.MAX_SAFE_INTEGER], Number.MAX_SAFE_INTEGER);
            $mol_assert_equal(list[Number.POSITIVE_INFINITY], undefined);
            $mol_assert_equal(calls, 3);
        },
        'stringify'() {
            const list = $mol_range2(i => i, () => 5);
            $mol_assert_equal(list.toString(), '0,1,2,3,4');
            $mol_assert_equal(list.join(';'), '0;1;2;3;4');
        },
        'for-of'() {
            let log = '';
            for (let i of $mol_range2(i => i + 1, () => 5)) {
                log += i;
            }
            $mol_assert_equal(log, '12345');
        },
        'for-in'() {
            let log = '';
            for (let i in $mol_range2(i => i, () => 5)) {
                log += i;
            }
            $mol_assert_equal(log, '01234');
        },
        'forEach'() {
            let log = '';
            $mol_range2(i => i, () => 5).forEach(i => log += i);
            $mol_assert_equal(log, '01234');
        },
        'reduce'() {
            let calls = 0;
            const list = $mol_range2().slice(1, 6);
            $mol_assert_equal(list.reduce((s, v) => s + v), 15);
            $mol_assert_equal(list.reduce((s, v) => s + v, 5), 20);
        },
        'lazy concat'() {
            let calls1 = 0;
            let calls2 = 0;
            const list = $mol_range2(index => (++calls1, index), () => 5).concat([0, 1, 2, 3, 4], $mol_range2(index => (++calls2, index), () => 5));
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 15);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[4], 4);
            $mol_assert_equal(list[5], 0);
            $mol_assert_equal(list[9], 4);
            $mol_assert_equal(list[10], 0);
            $mol_assert_equal(list[14], 4);
            $mol_assert_equal(list[15], undefined);
            $mol_assert_equal(calls1, 2);
            $mol_assert_equal(calls2, 2);
        },
        'lazy filter'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 15).filter(v => v % 2).slice(0, 3);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 3);
            $mol_assert_equal(list[0], 1);
            $mol_assert_equal(list[2], 5);
            $mol_assert_equal(list[3], undefined);
            $mol_assert_equal(calls, 8);
        },
        'lazy reverse'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).toReversed().slice(0, 3);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 3);
            $mol_assert_equal(list[0], 9);
            $mol_assert_equal(list[2], 7);
            $mol_assert_equal(list[3], undefined);
            $mol_assert_equal(calls, 2);
        },
        'lazy map'() {
            let calls1 = 0;
            let calls2 = 0;
            const source = $mol_range2(index => (++calls1, index), () => 5);
            const target = source.map((item, index, self) => {
                ++calls2;
                $mol_assert_equal(source, self);
                return index + 10;
            }, () => 5);
            $mol_assert_equal(true, target instanceof Array);
            $mol_assert_equal(target.length, 5);
            $mol_assert_equal(target[0], 10);
            $mol_assert_equal(target[4], 14);
            $mol_assert_equal(target[5], undefined);
            $mol_assert_equal(calls1, 2);
            $mol_assert_equal(calls2, 2);
        },
        'lazy slice'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).slice(3, 7);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 4);
            $mol_assert_equal(list[0], 3);
            $mol_assert_equal(list[3], 6);
            $mol_assert_equal(list[4], undefined);
            $mol_assert_equal(calls, 2);
        },
        'lazy some'() {
            let calls = 0;
            $mol_assert_equal(true, $mol_range2(index => (++calls, index), () => 5).some(v => v >= 2));
            $mol_assert_equal(calls, 3);
            $mol_assert_equal(false, $mol_range2(i => i, () => 0).some(v => true));
            $mol_assert_equal(true, $mol_range2(i => i).some(v => v > 5));
        },
        'lazy every'() {
            let calls = 0;
            $mol_assert_equal(false, $mol_range2(index => (++calls, index), () => 5).every(v => v < 2));
            $mol_assert_equal(calls, 3);
            $mol_assert_equal(true, $mol_range2(i => i, () => 0).every(v => false));
            $mol_assert_equal(false, $mol_range2(i => i).every(v => v < 5));
        },
        'lazyfy'() {
            let calls = 0;
            const list = $mol_range2([0, 1, 2, 3, 4, 5]).map(i => (++calls, i + 10)).slice(2);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 4);
            $mol_assert_equal(calls, 0);
            $mol_assert_equal(list[0], 12);
            $mol_assert_equal(list[3], 15);
            $mol_assert_equal(list[4], undefined);
            $mol_assert_equal(calls, 2);
        },
        'prevent modification'() {
            const list = $mol_range2(i => i, () => 5);
            $mol_assert_fail(() => list.push(4), TypeError);
            $mol_assert_fail(() => list.pop(), TypeError);
            $mol_assert_fail(() => list.unshift(4), TypeError);
            $mol_assert_fail(() => list.shift(), TypeError);
            $mol_assert_fail(() => list.splice(1, 2), TypeError);
            $mol_assert_fail(() => list[1] = 2, TypeError);
            $mol_assert_fail(() => list.reverse(), TypeError);
            $mol_assert_fail(() => list.sort(), TypeError);
            $mol_assert_equal(list.toString(), '0,1,2,3,4');
        }
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    $mol_test({
        'nulls & undefineds'() {
            $mol_assert_ok($mol_compare_deep(null, null));
            $mol_assert_ok($mol_compare_deep(undefined, undefined));
            $mol_assert_not($mol_compare_deep(undefined, null));
            $mol_assert_not($mol_compare_deep({}, null));
        },
        'number'() {
            $mol_assert_ok($mol_compare_deep(1, 1));
            $mol_assert_ok($mol_compare_deep(Number.NaN, Number.NaN));
            $mol_assert_not($mol_compare_deep(1, 2));
            $mol_assert_ok($mol_compare_deep(Object(1), Object(1)));
            $mol_assert_not($mol_compare_deep(Object(1), Object(2)));
        },
        'POJO'() {
            $mol_assert_ok($mol_compare_deep({}, {}));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { b: 2 }));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { a: 2 }));
            $mol_assert_not($mol_compare_deep({}, { a: undefined }));
            $mol_assert_not($mol_compare_deep({ a: 1, b: 2 }, { b: 2, a: 1 }));
            $mol_assert_ok($mol_compare_deep({ a: { b: 1 } }, { a: { b: 1 } }));
            $mol_assert_ok($mol_compare_deep(Object.create(null), Object.create(null)));
        },
        'Array'() {
            $mol_assert_ok($mol_compare_deep([], []));
            $mol_assert_ok($mol_compare_deep([1, [2]], [1, [2]]));
            $mol_assert_not($mol_compare_deep([1, 2], [1, 3]));
            $mol_assert_not($mol_compare_deep([1, 2,], [1, 3, undefined]));
            $mol_assert_not($mol_compare_deep($mol_range2().slice(0, 0), new Array()));
            $mol_assert_not($mol_compare_deep($mol_range2(), $mol_range2()));
        },
        'Non POJO are different'() {
            class Thing extends Object {
            }
            $mol_assert_not($mol_compare_deep(new Thing, new Thing));
            $mol_assert_not($mol_compare_deep(() => 1, () => 1));
            $mol_assert_not($mol_compare_deep(new RangeError('Test error'), new RangeError('Test error')));
        },
        'POJO with symbols'() {
            const sym = Symbol();
            $mol_assert_ok($mol_compare_deep({ [sym]: true }, { [sym]: true }));
            $mol_assert_not($mol_compare_deep({ [Symbol()]: true }, { [Symbol()]: true }));
        },
        'same POJOs with cyclic reference'() {
            const a = { foo: {} };
            a['self'] = a;
            const b = { foo: {} };
            b['self'] = b;
            $mol_assert_ok($mol_compare_deep(a, b));
        },
        'same POJOs with cyclic reference with cache warmup'() {
            const obj1 = { test: 1, obj3: null };
            const obj1_copy = { test: 1, obj3: null };
            const obj2 = { test: 2, obj1 };
            const obj2_copy = { test: 2, obj1: obj1_copy };
            const obj3 = { test: 3, obj2 };
            const obj3_copy = { test: 3, obj2: obj2_copy };
            obj1.obj3 = obj3;
            obj1_copy.obj3 = obj3_copy;
            // warmup cache
            $mol_assert_not($mol_compare_deep(obj1, {}));
            $mol_assert_not($mol_compare_deep(obj2, {}));
            $mol_assert_not($mol_compare_deep(obj3, {}));
            $mol_assert_ok($mol_compare_deep(obj3, obj3_copy));
        },
        'Date'() {
            $mol_assert_ok($mol_compare_deep(new Date(12345), new Date(12345)));
            $mol_assert_not($mol_compare_deep(new Date(12345), new Date(12346)));
        },
        'RegExp'() {
            $mol_assert_ok($mol_compare_deep(/\x22/mig, /\x22/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x21/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x22/mg));
        },
        'Error'() {
            $mol_assert_not($mol_compare_deep(new Error('xxx'), new Error('xxx')));
            const fail = (message) => new Error(message);
            $mol_assert_ok($mol_compare_deep(...['xxx', 'xxx'].map(msg => new Error(msg))));
            $mol_assert_not($mol_compare_deep(...['xxx', 'yyy'].map(msg => new Error(msg))));
        },
        'Map'() {
            $mol_assert_ok($mol_compare_deep(new Map, new Map));
            $mol_assert_ok($mol_compare_deep(new Map([[1, [2]]]), new Map([[1, [2]]])));
            $mol_assert_ok($mol_compare_deep(new Map([[[1], 2]]), new Map([[[1], 2]])));
            $mol_assert_not($mol_compare_deep(new Map([[1, 2]]), new Map([[1, 3]])));
            $mol_assert_not($mol_compare_deep(new Map([[[1], 2]]), new Map([[[3], 2]])));
        },
        'Set'() {
            $mol_assert_ok($mol_compare_deep(new Set, new Set));
            $mol_assert_ok($mol_compare_deep(new Set([1, [2]]), new Set([1, [2]])));
            $mol_assert_not($mol_compare_deep(new Set([1]), new Set([2])));
        },
        'Uint8Array'() {
            $mol_assert_ok($mol_compare_deep(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_deep(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_deep(new Uint8Array([0]), new Uint8Array([1])));
        },
        'DataView'() {
            $mol_assert_ok($mol_compare_deep(new DataView(new Uint8Array().buffer), new DataView(new Uint8Array().buffer)));
            $mol_assert_ok($mol_compare_deep(new DataView(new Uint8Array([0]).buffer), new DataView(new Uint8Array([0]).buffer)));
            $mol_assert_not($mol_compare_deep(new DataView(new Uint8Array([0]).buffer), new DataView(new Uint8Array([1]).buffer)));
        },
        'Serializale'() {
            class User {
                name;
                rand;
                constructor(name, rand = Math.random()) {
                    this.name = name;
                    this.rand = rand;
                }
                [Symbol.toPrimitive](mode) {
                    return this.name;
                }
            }
            $mol_assert_ok($mol_compare_deep(new User('Jin'), new User('Jin')));
            $mol_assert_not($mol_compare_deep(new User('Jin'), new User('John')));
        },
        'Iterable'() {
            $mol_assert_ok($mol_compare_deep(new URLSearchParams({ foo: 'bar' }), new URLSearchParams({ foo: 'bar' })));
            $mol_assert_not($mol_compare_deep(new URLSearchParams({ foo: 'xxx' }), new URLSearchParams({ foo: 'yyy' })));
            $mol_assert_not($mol_compare_deep(new URLSearchParams({ foo: 'xxx', bar: 'yyy' }), new URLSearchParams({ bar: 'yyy', foo: 'xxx' })));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_timeout = $mol_after_mock_timeout;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'test types'($) {
            class A {
                static a() {
                    return '';
                }
                static b() {
                    return $mol_wire_async(this).a();
                }
            }
        },
        async 'Latest method calls wins'($) {
            class NameLogger extends $mol_object2 {
                static $ = $;
                static first = [];
                static last = [];
                static send(next) {
                    $mol_wire_sync(this.first).push(next);
                    $$.$mol_wait_timeout(0);
                    this.last.push(next);
                }
            }
            const name = $mol_wire_async(NameLogger).send;
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_equal(NameLogger.first, ['john', 'jin']);
            $mol_assert_equal(NameLogger.last, ['jin']);
        },
        async 'Latest function calls wins'($) {
            const first = [];
            const last = [];
            function send_name(next) {
                $mol_wire_sync(first).push(next);
                $$.$mol_wait_timeout(0);
                last.push(next);
            }
            const name = $mol_wire_async(send_name);
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_equal(first, ['john', 'jin']);
            $mol_assert_equal(last, ['jin']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'test types'($) {
            class A {
                static a() {
                    return Promise.resolve('');
                }
                static b() {
                    return $mol_wire_sync(this).a();
                }
            }
        },
        async 'test method from host'($) {
            let count = 0;
            class A {
                static a() {
                    return $mol_wire_sync(this).b();
                }
                static b() { return Promise.resolve(++count); }
            }
            $mol_assert_equal(await $mol_wire_async(A).a(), 1, count);
        },
        async 'test function'($) {
            let count = 0;
            class A {
                static a() {
                    return $mol_wire_sync(this.b)();
                }
                static b() { return Promise.resolve(++count); }
            }
            $mol_assert_equal(await $mol_wire_async(A).a(), 1, count);
        },
        async 'test construct itself'($) {
            class A {
                static instances = [];
                static a() {
                    const a = new ($mol_wire_sync(A))();
                    this.instances.push(a);
                    $mol_wire_sync(this).b();
                }
                static b() { return Promise.resolve(); }
            }
            await $mol_wire_async(A).a();
            $mol_assert_equal(A.instances.length, 2);
            $mol_assert_equal(A.instances[0] instanceof A, true);
            $mol_assert_equal(A.instances[0], A.instances[1]);
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_work extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = requestIdleCallback(task, { timeout: delay });
        }
        destructor() {
            cancelIdleCallback(this.id);
        }
    }
    $.$mol_after_work = $mol_after_work;
    if (typeof requestIdleCallback !== 'function') {
        $.$mol_after_work = $mol_after_timeout;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_work = $mol_after_mock_timeout;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wait_rest_async() {
        return new Promise(done => {
            new this.$mol_after_work(16, () => done(null));
        });
    }
    $.$mol_wait_rest_async = $mol_wait_rest_async;
    function $mol_wait_rest() {
        return this.$mol_wire_sync(this).$mol_wait_rest_async();
    }
    $.$mol_wait_rest = $mol_wait_rest;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test_mocks.push($ => {
            $.$mol_wait_timeout = function $mol_wait_timeout_mock(timeout) { };
            $.$mol_wait_timeout_async = async function $mol_wait_timeout_async_mock(timeout) { };
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wait_timeout_async(timeout) {
        const promise = new $mol_promise();
        const task = new this.$mol_after_timeout(timeout, () => promise.done());
        return Object.assign(promise, {
            destructor: () => task.destructor()
        });
    }
    $.$mol_wait_timeout_async = $mol_wait_timeout_async;
    function $mol_wait_timeout(timeout) {
        return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
    }
    $.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test_mocks.push($ => {
            $.$mol_wait_rest = function $mol_wait_rest_mock() { };
            $.$mol_wait_rest_async = async function $mol_wait_rest_async_mock() { };
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        // https://github.com/nin-jin/slides/tree/master/reactivity#component-states
        'Cached channel'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 2);
            App.value(2);
            $mol_assert_equal(App.value(), 3);
        },
        'Read Pushed'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 0) {
                    return next;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(1), 1);
            $mol_assert_equal(App.value(), 1);
        },
        'Mem overrides mem'($) {
            class Base extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Base, "value", null);
            class Middle extends Base {
                static value(next) {
                    return super.value(next) + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Middle, "value", null);
            class App extends Middle {
                static value(next) {
                    return super.value(next) * 3;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 9);
            $mol_assert_equal(App.value(5), 21);
            $mol_assert_equal(App.value(), 21);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-consistency
        'Auto recalculation of cached values'($) {
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    return next || 1;
                }
                static yyy() {
                    return this.xxx() + 1;
                }
                static zzz() {
                    return this.yyy() + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            $mol_assert_equal(App.yyy(), 2);
            $mol_assert_equal(App.zzz(), 3);
            App.xxx(5);
            $mol_assert_equal(App.zzz(), 7);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-reasonability
        'Skip recalculation when actually no dependency changes'($) {
            const log = [];
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    log.push('xxx');
                    return next || 1;
                }
                static yyy() {
                    log.push('yyy');
                    return [Math.sign(this.xxx())];
                }
                static zzz() {
                    log.push('zzz');
                    return this.yyy()[0] + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx']);
            App.xxx(5);
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx']);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx', 'yyy']);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#flow-auto
        'Flow: Auto'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static source(next = 1) { return next; }
                static condition(next = true) { return next; }
                static counter = 0;
                static result() {
                    const res = this.condition() ? this.source() : 0;
                    return res + this.counter++;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "source", null);
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            $mol_assert_equal(App.counter, 1);
            App.source(10);
            $mol_assert_equal(App.result(), 11);
            $mol_assert_equal(App.counter, 2);
            App.condition(false);
            $mol_assert_equal(App.result(), 2);
            $mol_assert_equal(App.counter, 3);
            $mol_wire_fiber.sync();
            $mol_assert_equal(App.source(), 1);
            App.source(20);
            $mol_assert_equal(App.result(), 2);
            $mol_assert_equal(App.counter, 3);
            App.condition(true);
            $mol_assert_equal(App.result(), 23);
            $mol_assert_equal(App.counter, 4);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#dupes-equality
        'Dupes: Equality'($) {
            let counter = 0;
            class App extends $mol_object2 {
                static $ = $;
                static foo(next) {
                    return next ?? { numbs: [1] };
                }
                static bar() {
                    return { ...this.foo(), count: ++counter };
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [1] });
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [2] });
            $mol_assert_like(App.bar(), { numbs: [2], count: 2 });
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#cycle-fail
        'Cycle: Fail'($) {
            class App extends $mol_object2 {
                static $ = $;
                static foo() {
                    return this.bar() + 1;
                }
                static bar() {
                    return this.foo() + 1;
                }
                static test() {
                    $mol_assert_fail(() => App.foo(), 'Circular subscription');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            App.test();
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        // 'Update deps on push'( $ ) {
        // 	class App extends $mol_object2 {
        // 		static $ = $
        // 		@ $mol_wire_solo
        // 		static left( next = false ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static right( next = false ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static res( next?: boolean ) {
        // 			return this.left( next ) && this.right()
        // 		}
        // 	}
        // 	$mol_assert_equal( App.res(), false )
        // 	$mol_assert_equal( App.res( true ), false )
        // 	$mol_assert_equal( App.right( true ), true )
        // 	$mol_assert_equal( App.res(), true )
        // } ,
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        'Different order of pull and push'($) {
            class App extends $mol_object2 {
                static $ = $;
                static store(next = 0) {
                    return next;
                }
                static fast(next) {
                    return this.store(next);
                }
                static slow(next) {
                    if (next !== undefined)
                        this.slow(); // enforce pull before push
                    return this.store(next);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "store", null);
            __decorate([
                $mol_wire_solo
            ], App, "fast", null);
            __decorate([
                $mol_wire_solo
            ], App, "slow", null);
            App.fast();
            $mol_assert_equal(App.slow(666), 666);
            $mol_assert_equal(App.fast(), App.slow(), 666);
            App.store(777);
            $mol_assert_equal(App.fast(), App.slow(), 777);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        'Actions inside invariant'($) {
            class App extends $mol_object2 {
                static $ = $;
                static count(next = 0) {
                    return next;
                }
                static count2() {
                    return this.count();
                }
                static res() {
                    const count = this.count2();
                    if (!count)
                        this.count(count + 1);
                    return count + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "count", null);
            __decorate([
                $mol_wire_solo
            ], App, "count2", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            $mol_assert_like(App.res(), 1);
            App.count(5);
            $mol_assert_like(App.res(), 6);
        },
        async 'Toggle with async'($) {
            class App extends $mol_object2 {
                static $ = $;
                static checked(next = false) {
                    $$.$mol_wait_timeout(0);
                    return next;
                }
                static toggle() {
                    const prev = this.checked();
                    $mol_assert_unique(this.checked(!prev), prev);
                    // $mol_assert_equal( this.checked() , prev )
                }
                static res() {
                    return this.checked();
                }
                static test() {
                    $mol_assert_equal(App.res(), false);
                    App.toggle();
                    $mol_assert_equal(App.res(), true);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "checked", null);
            __decorate([
                $mol_wire_method
            ], App, "toggle", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        // // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        // 'Stable order of multiple root'( $ ) {
        // 	class App extends $mol_object2 {
        // 		static $ = $
        // 		static counter = 0
        // 		@ $mol_wire_solo
        // 		static left_trigger( next = 0 ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static left_root() {
        // 			this.left_trigger()
        // 			return ++ this.counter
        // 		}
        // 		@ $mol_wire_solo
        // 		static right_trigger( next = 0 ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static right_root() {
        // 			this.right_trigger()
        // 			return ++ this.counter
        // 		}
        // 	}
        // 	$mol_assert_equal( App.left_root(), 1 )
        // 	$mol_assert_equal( App.right_root(), 2 )
        // 	App.right_trigger( 1 )
        // 	App.left_trigger( 1 )
        // 	$mol_wire_fiber.sync()
        // 	$mol_assert_equal( App.right_root(), 4 )
        // 	$mol_assert_equal( App.left_root(), 3 )
        // } ,
        // https://github.com/nin-jin/slides/tree/master/reactivity#error-store
        'Restore after error'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static condition(next = false) { return next; }
                static broken() {
                    if (this.condition()) {
                        $mol_fail(new Error('test error'));
                    }
                    return 1;
                }
                static result() {
                    return this.broken();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "broken", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            App.condition(true);
            $mol_assert_fail(() => App.result(), 'test error');
            App.condition(false);
            $mol_assert_equal(App.result(), 1);
        },
        async 'Wait for data'($) {
            class App extends $mol_object2 {
                static $ = $;
                static async source() {
                    return 'Jin';
                }
                static middle() {
                    return $mol_wire_sync(this).source();
                }
                static target() {
                    return this.middle();
                }
                static test() {
                    $mol_assert_equal(App.target(), 'Jin');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "middle", null);
            __decorate([
                $mol_wire_solo
            ], App, "target", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        'Auto destroy on long alone'($) {
            let destroyed = false;
            class App extends $mol_object2 {
                static $ = $;
                static showing(next = true) {
                    return next;
                }
                static details() {
                    return {
                        destructor() {
                            destroyed = true;
                        }
                    };
                }
                static render() {
                    return this.showing() ? this.details() : null;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "showing", null);
            __decorate([
                $mol_wire_solo
            ], App, "details", null);
            __decorate([
                $mol_wire_solo
            ], App, "render", null);
            const details = App.render();
            $mol_assert_ok(details);
            App.showing(false);
            $mol_assert_not(App.render());
            App.showing(true);
            $mol_assert_equal(App.render(), details);
            $mol_wire_fiber.sync();
            $mol_assert_not(destroyed);
            App.showing(false);
            $mol_wire_fiber.sync();
            $mol_assert_ok(destroyed);
            App.showing(true);
            $mol_assert_unique(App.render(), details);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        async 'Hold pubs while wait async task'($) {
            class App extends $mol_object2 {
                static $ = $;
                static counter = 0;
                static resets(next) {
                    return ($mol_wire_probe(() => this.resets()) ?? -1) + 1;
                }
                static async wait() { }
                static value() {
                    return ++this.counter;
                }
                static result() {
                    if (this.resets())
                        $mol_wire_sync(this).wait();
                    return this.value();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "resets", null);
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            App.resets(null);
            $mol_wire_fiber.sync();
            $mol_assert_equal(await $mol_wire_async(App).result(), 1);
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static title() {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "title", null);
            $mol_assert_equal(`${App.title()}`, 'App.title<>');
        },
        'Unsubscribe from temp pubs on complete'($) {
            class Random extends $mol_object2 {
                static $ = $;
                static seed() {
                    return Math.random();
                }
                static resets(next) {
                    return Math.random();
                }
                static value() {
                    this.resets();
                    return this.seed();
                }
            }
            __decorate([
                $mol_wire_method
            ], Random, "seed", null);
            __decorate([
                $mol_wire_solo
            ], Random, "resets", null);
            __decorate([
                $mol_wire_solo
            ], Random, "value", null);
            const first = Random.value();
            Random.resets(null);
            $mol_assert_unique(Random.value(), first);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        async 'Error caching'($) {
            const next_cached = 123;
            class Some extends $mol_object2 {
                static $ = $;
                static data(id, next) {
                    if (next)
                        return next;
                    setTimeout(() => {
                        $mol_wire_async(this).data(id, next_cached);
                    }, 10);
                    $mol_fail_hidden(new Promise(() => { }));
                }
                static run() {
                    return this.data('1');
                }
            }
            __decorate([
                $mol_wire_plex
            ], Some, "data", null);
            __decorate([
                $mol_wire_method
            ], Some, "run", null);
            const val = await $mol_wire_async(Some).run();
            $mol_assert_equal(val, next_cached);
        },
        'Memoize by single simple key'($) {
            class Team extends $mol_object2 {
                static $ = $;
                static user_name(user, next) {
                    return next ?? user;
                }
                static user_names() {
                    return [
                        this.user_name('jin'),
                        this.user_name('john'),
                    ];
                }
            }
            __decorate([
                $mol_wire_plex
            ], Team, "user_name", null);
            __decorate([
                $mol_wire_solo
            ], Team, "user_names", null);
            $mol_assert_like(Team.user_names(), ['jin', 'john']);
            Team.user_name('jin', 'JIN');
            $mol_assert_like(Team.user_names(), ['JIN', 'john']);
        },
        'Memoize by single complex key'($) {
            class Map extends $mol_object2 {
                static $ = $;
                static tile(pos) {
                    return new String(`/tile=${pos}`);
                }
                static test() {
                    $mol_assert_like(this.tile([0, 1]), new String('/tile=0,1'));
                    $mol_assert_equal(this.tile([0, 1]), this.tile([0, 1]));
                }
            }
            __decorate([
                $mol_wire_plex
            ], Map, "tile", null);
            __decorate([
                $mol_wire_method
            ], Map, "test", null);
            Map.test();
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static like(friend) {
                    return new $mol_object2;
                }
                static relation([friend, props]) {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_plex
            ], App, "like", null);
            __decorate([
                $mol_wire_plex
            ], App, "relation", null);
            $mol_assert_equal(`${App.like(123)}`, 'App.like<123>');
            $mol_assert_equal(`${App.relation([123, [456]])}`, 'App.relation<[123,[456]]>');
        },
        'Deep deps'($) {
            class Fib extends $mol_object2 {
                static $ = $;
                static sums = 0;
                static value(index, next) {
                    if (next)
                        return next;
                    if (index < 2)
                        return 1;
                    ++this.sums;
                    return this.value(index - 1) + this.value(index - 2);
                }
            }
            __decorate([
                $mol_wire_plex
            ], Fib, "value", null);
            $mol_assert_equal(Fib.value(4), 5);
            $mol_assert_equal(Fib.sums, 3);
            Fib.value(1, 2);
            $mol_assert_equal(Fib.value(4), 8);
            $mol_assert_equal(Fib.sums, 6);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Previous value'() {
            class Cache extends $mol_object2 {
                static store(next) {
                    if (!next)
                        return {};
                    return {
                        ...$mol_wire_probe(() => this.store()) ?? {},
                        ...next,
                    };
                }
            }
            __decorate([
                $mol_wire_solo
            ], Cache, "store", null);
            $mol_assert_like(Cache.store(), {});
            $mol_assert_like(Cache.store({ foo: 666 }), { foo: 666 });
            $mol_assert_like(Cache.store({ bar: 777 }), { foo: 666, bar: 777 });
        },
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    $mol_test({
        'Primitives'() {
            $mol_assert_equal($mol_key(null), 'null');
            $mol_assert_equal($mol_key(false), 'false');
            $mol_assert_equal($mol_key(true), 'true');
            $mol_assert_equal($mol_key(0), '0');
            $mol_assert_equal($mol_key(1n << 64n), '18446744073709551616n');
            $mol_assert_equal($mol_key(''), '""');
        },
        'Array & POJO'() {
            $mol_assert_equal($mol_key([null]), '[null]');
            $mol_assert_equal($mol_key({ foo: 0 }), '{"foo":0}');
            $mol_assert_equal($mol_key({ foo: [false] }), '{"foo":[false]}');
        },
        'Uint8Array'() {
            $mol_assert_equal($mol_key(new Uint8Array([1, 2])), 'Uint8Array([1,2])');
            $mol_assert_equal($mol_key([new Uint8Array([1, 2])]), '[Uint8Array([1,2])]');
            $mol_assert_equal($mol_key({ foo: new Uint8Array([1, 2]) }), '{"foo":Uint8Array([1,2])}');
        },
        'Function'() {
            const func = () => { };
            $mol_assert_equal($mol_key(func), $mol_key(func));
            $mol_assert_unique($mol_key(func), $mol_key(() => { }));
        },
        'Objects'() {
            class User {
            }
            const jin = new User();
            $mol_assert_equal($mol_key(jin), $mol_key(jin));
            $mol_assert_unique($mol_key(jin), $mol_key(new User()));
        },
        'Elements'() {
            const foo = $mol_jsx("div", null, "bar");
            $mol_assert_equal($mol_key(foo), $mol_key(foo));
            $mol_assert_unique($mol_key(foo), $mol_key($mol_jsx("div", null, "bar")));
        },
        'Custom JSON representation'() {
            class User {
                toJSON() { return 'jin'; }
            }
            $mol_assert_unique([$mol_key(new User)], [$mol_key(new User)]);
        },
        'Custom key handler'() {
            class User {
                name;
                age;
                constructor(name, age) {
                    this.name = name;
                    this.age = age;
                }
                [$mol_key_handle]() { return `User(${JSON.stringify(this.name)})`; }
            }
            $mol_assert_equal($mol_key([new User('jin', 16)]), $mol_key([new User('jin', 18)]), '[User("jin")]');
        },
        'Special native classes'() {
            $mol_assert_equal($mol_key(new Date('xyz')), 'Date(NaN)');
            $mol_assert_equal($mol_key(new Date(12345)), 'Date(12345)');
            $mol_assert_equal($mol_key(/./), '/./');
            $mol_assert_equal($mol_key(/\./gimsu), '/\\./gimsu');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_frame = $mol_after_mock_commmon;
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'return result without errors'() {
            $mol_assert_equal($mol_try(() => false), false);
        },
        //'return error if thrown'() {
        //	
        //	const error = new Error( '$mol_try test error' )
        //	$mol_assert_equal( $mol_try( ()=> { throw error } ) , error )
        //	
        //} ,
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => $.$mol_fail_log = () => false);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Watch and logs reactive states. Logger automatically added to test bundle which is adding to `test.html`. */
    class $mol_wire_log extends $mol_object2 {
        static watch(task) {
            return task;
        }
        static track(fiber) {
            const prev = $mol_wire_probe(() => this.track(fiber));
            let next;
            try {
                next = fiber.sync();
            }
            finally {
                for (const pub of fiber.pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
            if (fiber.host === this)
                return next;
            if ($mol_compare_deep(prev, next)) {
                this.$.$mol_log3_rise({
                    message: '💧 Same',
                    place: fiber,
                });
            }
            else if (prev !== undefined) {
                this.$.$mol_log3_rise({
                    message: '🔥 Next',
                    place: fiber,
                    prev,
                });
            }
            return next;
        }
        static active() {
            try {
                this.watch()?.();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            finally {
                for (const pub of $mol_wire_auto().pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_wire_log, "watch", null);
    __decorate([
        $mol_mem_key
    ], $mol_wire_log, "track", null);
    __decorate([
        $mol_mem
    ], $mol_wire_log, "active", null);
    $.$mol_wire_log = $mol_wire_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_wire_log.active();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'all cases of using maybe'() {
            $mol_assert_equal($mol_maybe(0)[0], 0);
            $mol_assert_equal($mol_maybe(false)[0], false);
            $mol_assert_equal($mol_maybe(null)[0], void 0);
            $mol_assert_equal($mol_maybe(void 0)[0], void 0);
            $mol_assert_equal($mol_maybe(void 0).map(v => v.toString())[0], void 0);
            $mol_assert_equal($mol_maybe(0).map(v => v.toString())[0], '0');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'run callback'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            $mol_assert_equal(Plus1.run(() => 2), 3);
        },
        'wrap function'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            const obj = {
                level: 2,
                pow: Plus1.func(function (a) {
                    return a ** this.level;
                })
            };
            $mol_assert_equal(obj.pow(2), 5);
        },
        'decorate field getter'() {
            class Plus1 extends $mol_wrapper {
                static last = 0;
                static wrap(task) {
                    return function (...args) {
                        return Plus1.last = (task.call(this, ...args) || 0) + 1;
                    };
                }
            }
            class Foo {
                static get two() {
                    return 1;
                }
                static set two(next) { }
            }
            __decorate([
                Plus1.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Plus1.last, 2);
            $mol_assert_equal(Foo.two, 2);
        },
        'decorate instance method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo1 {
                level = 2;
                pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo1.prototype, "pow", null);
            const Foo2 = Foo1;
            const foo = new Foo2;
            $mol_assert_equal(foo.pow(2), 5);
        },
        'decorate static method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo {
                static level = 2;
                static pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo, "pow", null);
            $mol_assert_equal(Foo.pow(2), 5);
        },
        'decorate class'() {
            class BarInc extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        const foo = task.call(this, ...args);
                        foo.bar++;
                        return foo;
                    };
                }
            }
            let Foo = class Foo {
                bar;
                constructor(bar) {
                    this.bar = bar;
                }
            };
            Foo = __decorate([
                BarInc.class
            ], Foo);
            $mol_assert_equal(new Foo(2).bar, 3);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'memoize field'() {
            class Foo {
                static one = 1;
                static get two() {
                    return ++this.one;
                }
                static set two(next) { }
            }
            __decorate([
                $mol_memo.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Foo.two, 3);
            $mol_assert_equal(Foo.two, 3);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'const returns stored value'() {
            const foo = { bar: $mol_const(Math.random()) };
            $mol_assert_equal(foo.bar(), foo.bar());
            $mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'id auto generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                static $ = $;
                element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "element", null);
            var x = $mol_view_test_block.Root(0);
            $mol_assert_equal(x.dom_node().id, '$mol_view_test_block.Root(0)');
            $mol_assert_equal(x.element(0).dom_node().id, '$mol_view_test_block.Root(0).element(0)');
        },
        'caching ref to dom node'($) {
            var x = new class extends $mol_view {
            };
            x.$ = $;
            $mol_assert_equal(x.dom_node(), x.dom_node());
        },
        'content render'($) {
            class $mol_view_test extends $mol_view {
                sub() {
                    return ['lol', 5];
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                Element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "Element", null);
            var x = new $mol_view_test_block();
            x.$ = $;
            $mol_assert_equal(x.dom_node().getAttribute('mol_view_test_block'), '');
            $mol_assert_equal(x.dom_node().getAttribute('mol_view'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_block_element'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_item'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view'), '');
        },
        'render custom attributes'($) {
            class $mol_view_test extends $mol_view {
                attr() {
                    return {
                        'href': '#haha',
                        'required': true,
                        'hidden': false,
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.getAttribute('href'), '#haha');
            $mol_assert_equal(node.getAttribute('required'), 'true');
            $mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields'($) {
            class $mol_view_test extends $mol_view {
                field() {
                    return {
                        'hidden': true
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.hidden, true);
        },
        'attach event handlers'($) {
            var clicked = false;
            class $mol_view_test extends $mol_view {
                event() {
                    return {
                        'click': (next) => this.event_click(next)
                    };
                }
                event_click(next) {
                    clicked = true;
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_node();
            node.click();
            $mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'source starts with version line'($) {
            const source = $bog_gamengine_gl_source({}, 'void main() {}', 'void main() {}');
            $mol_assert_ok(source.vert.startsWith('#version 300 es\n'));
            $mol_assert_ok(source.frag.startsWith('#version 300 es\n'));
        },
        'glob goes to both shaders as uniform'($) {
            const source = $bog_gamengine_gl_source({ glob: { proj: 'mat4' } }, '', '');
            $mol_assert_ok(source.vert.includes('uniform mat4 proj;\n'));
            $mol_assert_ok(source.frag.includes('uniform mat4 proj;\n'));
        },
        'input goes to vert only as in'($) {
            const source = $bog_gamengine_gl_source({ input: { vertex: 'vec3' } }, '', '');
            $mol_assert_ok(source.vert.includes('in vec3 vertex;\n'));
            $mol_assert_not(source.frag.includes('vertex'));
        },
        'sampler2DShadow glob is declared as uniform in frag'($) {
            const source = $bog_gamengine_gl_source({ glob: { shadow_map: 'sampler2DShadow' } }, '', '');
            $mol_assert_ok(source.frag.includes('uniform sampler2DShadow shadow_map;\n'));
            $mol_assert_ok(source.frag.includes('precision highp sampler2DShadow;'));
        },
        'inputs get layout locations in face order, mat4 takes four'($) {
            const source = $bog_gamengine_gl_source({ input: { vertex: 'vec3', inst_trans: 'mat4', inst_tint: 'vec4' } }, '', '');
            $mol_assert_ok(source.vert.includes('layout( location = 0 ) in vec3 vertex;\n'));
            $mol_assert_ok(source.vert.includes('layout( location = 1 ) in mat4 inst_trans;\n'));
            $mol_assert_ok(source.vert.includes('layout( location = 5 ) in vec4 inst_tint;\n'));
        },
        'pipe is out in vert and in in frag'($) {
            const source = $bog_gamengine_gl_source({ pipe: { pipe_tint: 'vec4' } }, '', '');
            $mol_assert_ok(source.vert.includes('out vec4 pipe_tint;\n'));
            $mol_assert_ok(source.frag.includes('in vec4 pipe_tint;\n'));
        },
        'output goes to frag only as out'($) {
            const source = $bog_gamengine_gl_source({ output: { color: 'vec4' } }, '', '');
            $mol_assert_ok(source.frag.includes('out vec4 color;\n'));
            $mol_assert_not(source.vert.includes('color'));
        },
        'entry text ends the source'($) {
            const source = $bog_gamengine_gl_source({}, 'void main() { v }', 'void main() { f }');
            $mol_assert_ok(source.vert.endsWith('void main() { v }'));
            $mol_assert_ok(source.frag.endsWith('void main() { f }'));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function key_jump() {
        const key = new $bog_gamengine_key;
        key.bind({ jump: ['space', 'W'] });
        return key;
    }
    function key_axis() {
        const key = new $bog_gamengine_key;
        key.bind({ left: ['A'], right: ['D'] });
        return key;
    }
    $mol_test({
        'action is false before any key'() {
            const key = key_jump();
            $mol_assert_equal(key.action('jump'), false);
        },
        'pressed key turns action on'() {
            const key = key_jump();
            key.keys().space(true);
            $mol_assert_equal(key.action('jump'), true);
        },
        'second key keeps action while first released'() {
            const key = key_jump();
            key.keys().space(true);
            key.keys().W(true);
            key.keys().space(false);
            $mol_assert_equal(key.action('jump'), true);
        },
        'both keys released turn action off'() {
            const key = key_jump();
            key.keys().space(true);
            key.keys().W(true);
            key.keys().space(false);
            key.keys().W(false);
            $mol_assert_equal(key.action('jump'), false);
        },
        'axis is zero without keys'() {
            const key = key_axis();
            $mol_assert_equal(key.axis('left', 'right'), 0);
        },
        'axis is minus one on left'() {
            const key = key_axis();
            key.keys().A(true);
            $mol_assert_equal(key.axis('left', 'right'), -1);
        },
        'axis is one on right'() {
            const key = key_axis();
            key.keys().D(true);
            $mol_assert_equal(key.axis('left', 'right'), 1);
        },
        'unknown action is false'() {
            const key = key_jump();
            $mol_assert_equal(key.action('fly'), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_pad_mock extends $bog_gamengine_pad {
        state = null;
        pads() {
            return [this.state];
        }
    }
    function pad_state(pressed, axes) {
        const buttons = [];
        for (let i = 0; i < 16; ++i)
            buttons.push({ pressed: pressed.includes(i) });
        return { buttons, axes };
    }
    function pad_move() {
        const pad = new $bog_gamengine_pad_mock;
        pad.bind({ jump: ['a'], left: ['lx-'], right: ['right', 'lx+'] });
        return pad;
    }
    $mol_test({
        'action is false without gamepad'() {
            const pad = pad_move();
            pad.poll();
            $mol_assert_equal(pad.action('jump'), false);
        },
        'pressed button turns action on'() {
            const pad = pad_move();
            pad.state = pad_state([0], [0, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.action('jump'), true);
        },
        'released button turns action off'() {
            const pad = pad_move();
            pad.state = pad_state([0], [0, 0, 0, 0]);
            pad.poll();
            pad.state = pad_state([], [0, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.action('jump'), false);
        },
        'stick inside dead zone gives zero axis'() {
            const pad = pad_move();
            pad.state = pad_state([], [0.1, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.axis('left', 'right'), 0);
        },
        'stick right gives positive axis'() {
            const pad = pad_move();
            pad.state = pad_state([], [0.6, 0, 0, 0]);
            pad.poll();
            $mol_assert_ok(Math.abs(pad.axis('left', 'right') - 0.6) < 1e-6);
        },
        'stick left gives negative axis'() {
            const pad = pad_move();
            pad.state = pad_state([], [-0.6, 0, 0, 0]);
            pad.poll();
            $mol_assert_ok(Math.abs(pad.axis('left', 'right') + 0.6) < 1e-6);
        },
        'dpad button bound with stick turns action on'() {
            const pad = pad_move();
            pad.state = pad_state([15], [0, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.action('right'), true);
        },
        'stick bound with dpad button turns action on'() {
            const pad = pad_move();
            pad.state = pad_state([], [0.5, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.action('right'), true);
        },
        'unknown action is false'() {
            const pad = pad_move();
            pad.state = pad_state([0], [0, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.action('fly'), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            'handle clicks by default'($) {
                let clicked = false;
                const clicker = $mol_button.make({
                    $,
                    click: (event) => { clicked = true; },
                });
                const element = clicker.dom_tree();
                const event = $mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $mol_assert_ok(clicked);
            },
            'no handle clicks if disabled'($) {
                let clicked = false;
                const clicker = $mol_button.make({
                    $,
                    click: (event) => { clicked = true; },
                    enabled: () => false,
                });
                const element = clicker.dom_tree();
                const event = $mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $mol_assert_not(clicked);
            },
            async 'Store error'($) {
                const clicker = $mol_button.make({
                    $,
                    click: (event) => $.$mol_fail(new Error('Test error')),
                });
                const event = $mol_dom_context.document.createEvent('mouseevent');
                $mol_assert_fail(() => clicker.event_activate(event), 'Test error');
                await Promise.resolve();
                $mol_assert_equal(clicker.status()[0].message, 'Test error');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_style_sheet_test1 extends $mol_view {
        Item() { return new $mol_view; }
    }
    $.$mol_style_sheet_test1 = $mol_style_sheet_test1;
    class $mol_style_sheet_test2 extends $mol_view {
        List() { return new $mol_style_sheet_test1; }
    }
    $.$mol_style_sheet_test2 = $mol_style_sheet_test2;
    $mol_test({
        'component block styles'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                display: 'block',
                zIndex: 1,
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tdisplay: block;\n\tz-index: 1;\n}\n');
        },
        'various units'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                width: '50%',
                height: '50px',
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\twidth: 50%;\n\theight: 50px;\n}\n');
        },
        'various functions'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { calc } = $mol_style_func;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                width: calc(`100% - 1px`),
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\twidth: calc(100% - 1px);\n}\n');
        },
        'property groups'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                flex: {
                    grow: 5,
                    shrink: 10,
                }
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tflex-grow: 5;\n\tflex-shrink: 10;\n}\n');
        },
        'custom properties'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '--isVariable': 'yes',
                '--is_variable': 'no',
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\t--is-variable: yes;\n\t--is_variable: no;\n}\n');
        },
        'custom property groups'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '--variable': {
                    test1: '5px',
                    test2: '10px',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\t--variable-test1: 5px;\n\t--variable-test2: 10px;\n}\n');
        },
        'property shorthand'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                padding: ['5px', 'auto'],
                margin: ['10px', 'auto'],
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tpadding: 5px auto;\n\tmargin: 10px auto;\n}\n');
        },
        'sequenced values'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { url } = $mol_style_func;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                background: {
                    image: [[url('foo')], [url('bar')]],
                    size: [['cover'], ['contain']],
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tbackground-image: url("foo"),url("bar");\n\tbackground-size: cover,contain;\n}\n');
        },
        'sequenced structs'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                box: {
                    shadow: [
                        {
                            inset: true,
                            x: 0,
                            y: 0,
                            blur: '0.5rem',
                            spread: 0,
                            color: 'red',
                        },
                        {
                            inset: false,
                            x: 0,
                            y: 0,
                            blur: '0.5rem',
                            spread: 0,
                            color: 'blue',
                        },
                    ],
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tbox-shadow: inset 0 0 0.5rem 0 red,0 0 0.5rem 0 blue;\n}\n');
        },
        'component block styles with pseudo class'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                ':focus': {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:focus {\n\tdisplay: block;\n}\n');
        },
        'component block styles with pseudo element'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '::first-line': {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]::first-line {\n\tdisplay: block;\n}\n');
        },
        'component block styles with media query'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '@media': {
                    'print': {
                        display: 'block',
                    },
                    '(max-width: 640px)': {
                        display: 'inline',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n@media print {\n[mol_style_sheet_test] {\n\tdisplay: block;\n}\n}\n@media (max-width: 640px) {\n[mol_style_sheet_test] {\n\tdisplay: inline;\n}\n}\n');
        },
        'component block styles with attribute value'() {
            class $mol_style_sheet_test extends $mol_view {
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark'
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '@': {
                    mol_theme: {
                        '$mol_theme_dark': {
                            display: 'block',
                        },
                    },
                    disabled: {
                        'true': {
                            width: '100%',
                        },
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test]:where([disabled="true"]) {\n\twidth: 100%;\n}\n');
        },
        'component block styles with attribute value (short syntax)'() {
            class $mol_style_sheet_test extends $mol_view {
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark'
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '[mol_theme]': {
                    '$mol_theme_dark': {
                        display: 'block',
                    },
                },
                '[disabled]': {
                    'true': {
                        width: '100%',
                    },
                    'false': {
                        width: '50%',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test]:where([disabled="true"]) {\n\twidth: 100%;\n}\n[mol_style_sheet_test]:where([disabled="false"]) {\n\twidth: 50%;\n}\n');
        },
        'component element styles'() {
            class $mol_style_sheet_test extends $mol_view {
                Item() { return new $mol_view; }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                Item: {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test_item] {\n\tdisplay: block;\n}\n');
        },
        'component element of element styles'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                width: '100%',
                List: {
                    color: 'red',
                    Item: {
                        display: 'block',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] {\n\twidth: 100%;\n}\n[mol_style_sheet_test2_list] {\n\tcolor: red;\n}\n[mol_style_sheet_test2_list_item] {\n\tdisplay: block;\n}\n');
        },
        'component element styles with block attribute value'() {
            class $mol_style_sheet_test extends $mol_view {
                Item() { return new $mol_view; }
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark',
                        disabled: true,
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '@': {
                    mol_theme: {
                        '$mol_theme_dark': {
                            Item: {
                                color: 'red',
                            },
                        },
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) :where([mol_style_sheet_test_item]) {\n\tcolor: red;\n}\n');
        },
        'inner component styles by class'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                color: 'red',
                $mol_style_sheet_test1: {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] {\n\tcolor: red;\n}\n[mol_style_sheet_test2] :where([mol_style_sheet_test1]) {\n\tdisplay: block;\n}\n');
        },
        'child component styles by class'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                color: 'red',
                '>': {
                    $mol_style_sheet_test1: {
                        display: 'block',
                    },
                    $mol_style_sheet_test2: {
                        display: 'inline',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] {\n\tcolor: red;\n}\n[mol_style_sheet_test2] > :where([mol_style_sheet_test1]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test2] > :where([mol_style_sheet_test2]) {\n\tdisplay: inline;\n}\n');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'stick at seven tenths of radius gives seven tenths axis'() {
            const screen = new $bog_gamengine_input_screen;
            screen.move(0.7 * screen.radius(), 0);
            $mol_assert_ok(Math.abs(screen.axis('left', 'right') - 0.7) < 1e-6);
        },
        'stick pulled up gives positive vertical axis'() {
            const screen = new $bog_gamengine_input_screen;
            screen.move(0, -0.5 * screen.radius());
            $mol_assert_ok(Math.abs(screen.axis('down', 'up') - 0.5) < 1e-6);
        },
        'stick inside dead zone gives zero axis'() {
            const screen = new $bog_gamengine_input_screen;
            screen.move(0.1 * screen.radius(), 0);
            $mol_assert_equal(screen.axis('left', 'right'), 0);
        },
        'stick beyond radius is clamped to one'() {
            const screen = new $bog_gamengine_input_screen;
            screen.move(3 * screen.radius(), 0);
            $mol_assert_ok(Math.abs(screen.axis('left', 'right') - 1) < 1e-6);
        },
        'stick returned to center gives zero axis'() {
            const screen = new $bog_gamengine_input_screen;
            screen.move(screen.radius(), 0);
            screen.move(0, 0);
            $mol_assert_equal(screen.axis('left', 'right'), 0);
        },
        'pressed button holds action'() {
            const screen = new $bog_gamengine_input_screen;
            screen.press('jump');
            $mol_assert_equal(screen.action('jump'), true);
        },
        'released button drops action'() {
            const screen = new $bog_gamengine_input_screen;
            screen.press('jump');
            screen.release('jump');
            $mol_assert_equal(screen.action('jump'), false);
        },
        'hidden screen has no widgets'() {
            const screen = new $bog_gamengine_input_screen;
            $mol_assert_equal(screen.sub().length, 0);
        },
        'shown screen has stick and buttons'() {
            const screen = new $bog_gamengine_input_screen;
            screen.shown(true);
            $mol_assert_equal(screen.sub().length, 2);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_input_pad_mock extends $bog_gamengine_pad {
        state = null;
        pads() {
            return [this.state];
        }
    }
    function input_move() {
        const key = new $bog_gamengine_key;
        key.bind({ left: ['A'], right: ['D'] });
        const pad = new $bog_gamengine_input_pad_mock;
        pad.bind({ left: ['lx-'], right: ['lx+'] });
        const input = new $bog_gamengine_input;
        input.key(key);
        input.pad(pad);
        return { input, key, pad };
    }
    $mol_test({
        'key held gives action while pad is silent'() {
            const { input, key } = input_move();
            key.keys().D(true);
            input.poll();
            $mol_assert_equal(input.action('right'), true);
        },
        'key held gives full axis while pad is silent'() {
            const { input, key } = input_move();
            key.keys().D(true);
            input.poll();
            $mol_assert_equal(input.axis('left', 'right'), 1);
        },
        'pad stick gives its axis while keys are silent'() {
            const { input, pad } = input_move();
            pad.state = { buttons: [], axes: [0.5, 0, 0, 0] };
            input.poll();
            $mol_assert_ok(Math.abs(input.axis('left', 'right') - 0.5) < 1e-6);
        },
        'key overrides pad stick'() {
            const { input, key, pad } = input_move();
            key.keys().A(true);
            pad.state = { buttons: [], axes: [0.5, 0, 0, 0] };
            input.poll();
            $mol_assert_equal(input.axis('left', 'right'), -1);
        },
        'both silent give zero axis'() {
            const { input } = input_move();
            input.poll();
            $mol_assert_equal(input.axis('left', 'right'), 0);
        },
        'both silent give false action'() {
            const { input } = input_move();
            input.poll();
            $mol_assert_equal(input.action('right'), false);
        },
        'screen stick gives its axis while keys and pad are silent'() {
            const { input } = input_move();
            const screen = new $bog_gamengine_input_screen;
            input.screen(screen);
            screen.move(0.5 * screen.radius(), 0);
            input.poll();
            $mol_assert_ok(Math.abs(input.axis('left', 'right') - 0.5) < 1e-6);
        },
        'screen button gives action while keys and pad are silent'() {
            const { input } = input_move();
            const screen = new $bog_gamengine_input_screen;
            input.screen(screen);
            screen.press('right');
            input.poll();
            $mol_assert_equal(input.action('right'), true);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_clock_time_mock extends $mol_state_time {
        static stamp(next = 0) {
            return next;
        }
        static now(precision) {
            return this.stamp();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock_time_mock, "stamp", null);
    function clock_mock($) {
        $.$mol_state_time = $bog_gamengine_clock_time_mock;
        const clock = new $bog_gamengine_clock;
        clock.$ = $;
        return clock;
    }
    $mol_test({
        'three ticks give frame 3'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.frame();
            $bog_gamengine_clock_time_mock.stamp(16);
            clock.frame();
            $bog_gamengine_clock_time_mock.stamp(32);
            $mol_assert_equal(clock.frame(), 3);
        },
        'dt is seconds since previous frame'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.frame();
            $bog_gamengine_clock_time_mock.stamp(16);
            $mol_assert_equal(clock.dt(), 0.016);
        },
        'paused gives dt 0'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.frame();
            clock.paused(true);
            $bog_gamengine_clock_time_mock.stamp(16);
            $mol_assert_equal(clock.dt(), 0);
        },
        'jump of 5 seconds gives dt 0.1'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.frame();
            $bog_gamengine_clock_time_mock.stamp(5000);
            $mol_assert_equal(clock.dt(), 0.1);
        },
        'speed scales dt'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.frame();
            clock.speed(0.5);
            $bog_gamengine_clock_time_mock.stamp(20);
            $mol_assert_equal(clock.dt(), 0.01);
        },
        'time accumulates dt'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.time();
            $bog_gamengine_clock_time_mock.stamp(10);
            clock.time();
            $bog_gamengine_clock_time_mock.stamp(30);
            $mol_assert_equal(clock.time(), 0.03);
        },
        'time set to 5 keeps accumulating dt from 5'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.time();
            $bog_gamengine_clock_time_mock.stamp(10);
            clock.time();
            clock.time(5);
            $mol_assert_equal(clock.time(), 5);
            $bog_gamengine_clock_time_mock.stamp(30);
            $mol_assert_equal(clock.time(), 5.02);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_node_test_hero extends $bog_gamengine_node {
    }
    function node_test_prop(node, name) {
        return node.props().find(prop => prop.name === name);
    }
    $mol_test({
        'child shifted by 1 under parent rotated by half pi lands at (0, 1, 0)'() {
            const parent = new $bog_gamengine_node;
            parent.rot(new Float32Array([0, 0, Math.PI / 2]));
            const child = new $bog_gamengine_node;
            child.parent(parent);
            child.pos(new Float32Array([1, 0, 0]));
            const world = child.world();
            $mol_assert_ok(Math.abs(world[12] - 0) < 1e-6);
            $mol_assert_ok(Math.abs(world[13] - 1) < 1e-6);
            $mol_assert_ok(Math.abs(world[14] - 0) < 1e-6);
        },
        'title without name is class name without prefix'() {
            $mol_assert_equal(new $bog_gamengine_node_test_hero().title(), 'node_test_hero');
        },
        'title with name is name'() {
            const node = new $bog_gamengine_node_test_hero;
            node.name('Hero');
            $mol_assert_equal(node.title(), 'Hero');
        },
        'base props are pos, rot, scale and tint with kinds'() {
            const props = new $bog_gamengine_node().props();
            $mol_assert_equal(props.map(prop => prop.name), ['pos', 'rot', 'scale', 'tint']);
            $mol_assert_equal(props.map(prop => prop.kind), ['vec3', 'euler', 'vec3', 'vec4']);
        },
        'set through props changes pos'() {
            const node = new $bog_gamengine_node;
            node_test_prop(node, 'pos').set(new Float32Array([1, 2, 3]));
            $mol_assert_equal([...node.pos()], [1, 2, 3]);
        },
        'pos from plain array is typed array with same numbers'() {
            const node = new $bog_gamengine_node;
            node.pos([1, 2, 3]);
            $mol_assert_ok(node.pos() instanceof Float32Array);
            $mol_assert_equal([...node.pos()], [1, 2, 3]);
        },
        'pos from typed array keeps the same reference'() {
            const node = new $bog_gamengine_node;
            const typed = new Float32Array([1, 2, 3]);
            node.pos(typed);
            $mol_assert_equal(node.pos(), typed);
        },
        'kids setter stores nodes'() {
            const a = new $bog_gamengine_node;
            const b = new $bog_gamengine_node;
            const parent = new $bog_gamengine_node;
            parent.kids([a, b]);
            $mol_assert_equal(parent.kids(), [a, b]);
        },
        'kids setter sets parent of kids'() {
            const a = new $bog_gamengine_node;
            const parent = new $bog_gamengine_node;
            parent.kids([a]);
            $mol_assert_equal(a.parent(), parent);
        },
        'kids setter keeps parent already set'() {
            const a = new $bog_gamengine_node;
            const own = new $bog_gamengine_node;
            a.parent(own);
            new $bog_gamengine_node().kids([a]);
            $mol_assert_equal(a.parent(), own);
        },
        'root of a bare node is itself and scene is null'() {
            const node = new $bog_gamengine_node;
            $mol_assert_equal(node.root(), node);
            $mol_assert_equal(node.scene(), null);
            $mol_assert_equal(node.input(), null);
            $mol_assert_equal(node.clock(), null);
        },
        'billboard normal looks at the camera turned by half pi'() {
            const scene = new $bog_gamengine_scene;
            const cam = new $bog_gamengine_cam;
            cam.rot(new Float32Array([0, Math.PI / 2, 0]));
            scene.cam(cam);
            const node = new $bog_gamengine_node;
            node.billboard(true);
            scene.kids([node]);
            const trans = node.trans();
            const to_cam = [-Math.sin(Math.PI / 2), 0, -Math.cos(Math.PI / 2)];
            const normal = [trans[8], trans[9], trans[10]];
            const dot = -(normal[0] * to_cam[0] + normal[1] * to_cam[1] + normal[2] * to_cam[2]);
            $mol_assert_ok(Math.abs(dot - 1) < 1e-6);
        },
        'node without billboard keeps its own yaw'() {
            const scene = new $bog_gamengine_scene;
            const cam = new $bog_gamengine_cam;
            cam.rot(new Float32Array([0, Math.PI / 2, 0]));
            scene.cam(cam);
            const node = new $bog_gamengine_node;
            scene.kids([node]);
            $mol_assert_ok(Math.abs(node.trans()[10] - 1) < 1e-6);
        },
        'tint of bare node defaults to opaque white through props'() {
            const node = new $bog_gamengine_node;
            $mol_assert_equal([...node_test_prop(node, 'tint').get()], [1, 1, 1, 1]);
            node_test_prop(node, 'tint').set([1, 0, 0, 0.5]);
            $mol_assert_equal([...node.tint()], [1, 0, 0, 0.5]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'props contain kind, color and power'() {
            const names = new $bog_gamengine_light().props().map(prop => prop.name);
            $mol_assert_ok(names.includes('kind'));
            $mol_assert_ok(names.includes('color'));
            $mol_assert_ok(names.includes('power'));
        },
        'defaults are white sun of power 1'() {
            const light = new $bog_gamengine_light;
            $mol_assert_equal(light.kind(), 'sun');
            $mol_assert_equal([...light.color()], [1, 1, 1]);
            $mol_assert_equal(light.power(), 1);
        },
        'spot rotated around Y by half pi shines to minus X'() {
            const light = new $bog_gamengine_light;
            light.kind('spot');
            light.rot(new Float32Array([0, Math.PI / 2, 0]));
            const dir = light.dir();
            $mol_assert_ok(Math.abs(dir[0] + 1) < 1e-6);
            $mol_assert_ok(Math.abs(dir[1]) < 1e-6);
            $mol_assert_ok(Math.abs(dir[2]) < 1e-6);
        },
        'direction follows parent rotation'() {
            const parent = new $bog_gamengine_node;
            parent.rot(new Float32Array([0, Math.PI / 2, 0]));
            const light = new $bog_gamengine_light;
            light.parent(parent);
            const dir = light.dir();
            $mol_assert_ok(Math.abs(dir[0] + 1) < 1e-6);
            $mol_assert_ok(Math.abs(dir[2]) < 1e-6);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'vert and frag have main'($) {
            const shader = new $bog_gamengine_shader_sprite;
            $mol_assert_ok(shader.vert().includes('main'));
            $mol_assert_ok(shader.frag().includes('main'));
        },
        'every input name is used in vert'($) {
            const shader = new $bog_gamengine_shader_sprite;
            const vert = shader.sources().vert;
            const face = shader.face();
            for (const name in face.input)
                $mol_assert_ok(vert.includes(name));
        },
        'every glob name is used in vert or frag'($) {
            const shader = new $bog_gamengine_shader_sprite;
            const both = shader.sources().vert + shader.sources().frag;
            const face = shader.face();
            for (const name in face.glob)
                $mol_assert_ok(both.includes(name));
        },
        'sources mix only glsl both'($) {
            const shader = new $bog_gamengine_shader_sprite;
            $mol_assert_equal(shader.sources().vert, $mol_3d_glsl_both + shader.vert());
            $mol_assert_equal(shader.sources().frag, $mol_3d_glsl_both + shader.frag());
        },
        'every pipe name is in both vert and frag'($) {
            const shader = new $bog_gamengine_shader_sprite;
            const face = shader.face();
            for (const name in face.pipe) {
                $mol_assert_ok(shader.vert().includes(name));
                $mol_assert_ok(shader.frag().includes(name));
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'vert and frag have main'($) {
            const shader = new $bog_gamengine_shader_flat;
            $mol_assert_ok(shader.vert().includes('main'));
            $mol_assert_ok(shader.frag().includes('main'));
        },
        'every input and glob name is used in vert'($) {
            const shader = new $bog_gamengine_shader_flat;
            const vert = shader.sources().vert;
            const face = shader.face();
            for (const name in face.input)
                $mol_assert_ok(vert.includes(name));
            for (const name in face.glob)
                $mol_assert_ok(vert.includes(name));
        },
        'sources mix only glsl both'($) {
            const shader = new $bog_gamengine_shader_flat;
            $mol_assert_equal(shader.sources().vert, $mol_3d_glsl_both + shader.vert());
            $mol_assert_equal(shader.sources().frag, $mol_3d_glsl_both + shader.frag());
        },
        'every pipe name is in both vert and frag'($) {
            const shader = new $bog_gamengine_shader_flat;
            const face = shader.face();
            for (const name in face.pipe) {
                $mol_assert_ok(shader.vert().includes(name));
                $mol_assert_ok(shader.frag().includes(name));
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'vert and frag have main'($) {
            const shader = new $bog_gamengine_shader_solid;
            $mol_assert_ok(shader.vert().includes('main'));
            $mol_assert_ok(shader.frag().includes('main'));
        },
        'every input name is used in vert'($) {
            const shader = new $bog_gamengine_shader_solid;
            const vert = shader.sources().vert;
            const face = shader.face();
            for (const name in face.input)
                $mol_assert_ok(vert.includes(name));
        },
        'every glob name is used in vert or frag'($) {
            const shader = new $bog_gamengine_shader_solid;
            const both = shader.sources().vert + shader.sources().frag;
            const face = shader.face();
            for (const name in face.glob)
                $mol_assert_ok(both.includes(name));
        },
        'sources mix only glsl both'($) {
            const shader = new $bog_gamengine_shader_solid;
            $mol_assert_equal(shader.sources().vert, $mol_3d_glsl_both + shader.vert());
            $mol_assert_equal(shader.sources().frag, $mol_3d_glsl_both + shader.frag());
        },
        'every pipe name is in both vert and frag'($) {
            const shader = new $bog_gamengine_shader_solid;
            const face = shader.face();
            for (const name in face.pipe) {
                $mol_assert_ok(shader.vert().includes(name));
                $mol_assert_ok(shader.frag().includes(name));
            }
        },
        'wireframe glob is float and used in both vert and frag'($) {
            const shader = new $bog_gamengine_shader_solid;
            $mol_assert_equal(shader.face().glob.wireframe, 'float');
            $mol_assert_ok(shader.vert().includes('wireframe'));
            $mol_assert_ok(shader.frag().includes('wireframe'));
        },
        'light uniforms are arrays of eight in face and used in frag'($) {
            const shader = new $bog_gamengine_shader_solid;
            const glob = shader.face().glob;
            $mol_assert_equal(glob.light_count, 'int');
            $mol_assert_equal(glob.light_pos, 'vec4[8]');
            $mol_assert_equal(glob.light_dir, 'vec4[8]');
            $mol_assert_equal(glob.light_color, 'vec4[8]');
            $mol_assert_equal(glob.ambient, 'vec3');
            $mol_assert_equal(glob.cam_pos, 'vec3');
            const frag = shader.frag();
            for (const name of ['light_count', 'light_pos', 'light_dir', 'light_color', 'ambient', 'cam_pos'])
                $mol_assert_ok(frag.includes(name));
        },
        'material and normal layer come per instance and reach frag'($) {
            const shader = new $bog_gamengine_shader_solid;
            $mol_assert_equal(shader.face().input.inst_material, 'vec4');
            $mol_assert_equal(shader.face().input.inst_normal_layer, 'float');
            $mol_assert_ok(shader.vert().includes('inst_material'));
            $mol_assert_ok(shader.frag().includes('pipe_material'));
            $mol_assert_ok(shader.frag().includes('pipe_normal_layer'));
        },
        'shadow uniforms are in face and frag has a pcf function over shadow_map'($) {
            const shader = new $bog_gamengine_shader_solid;
            const glob = shader.face().glob;
            $mol_assert_equal(glob.shadow_mat, 'mat4');
            $mol_assert_equal(glob.shadow_map, 'sampler2DShadow');
            $mol_assert_equal(glob.shadow_light, 'int');
            const frag = shader.frag();
            $mol_assert_ok(frag.includes('float shade( vec3 pos, vec3 normal, vec3 light )'));
            $mol_assert_ok(frag.includes('texture( shadow_map, coord + vec3( vec2( x, y ) * texel, 0.0 ) )'));
            $mol_assert_ok(frag.includes('return sum / 9.0;'));
        },
        'shadow multiplies only the light it was built for'($) {
            const frag = new $bog_gamengine_shader_solid().frag();
            $mol_assert_ok(frag.includes('float atten = i == shadow_light ? lit : 1.0;'));
            $mol_assert_not(frag.includes('break'));
        },
        'array uniform is declared with size after name'($) {
            const source = $bog_gamengine_gl_source({ glob: { light_pos: 'vec4[8]' } }, '', '');
            $mol_assert_ok(source.frag.includes('uniform vec4 light_pos[8];'));
        },
        'solid wants depth, flat does not'($) {
            $mol_assert_equal(new $bog_gamengine_shader_solid().depth(), true);
            $mol_assert_equal(new $bog_gamengine_shader_flat().depth(), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'plain solid has no atlas sampler in face and sources'($) {
            const shader = new $bog_gamengine_shader_solid_plain;
            const glob = shader.face().glob;
            $mol_assert_equal(glob.atlas, undefined);
            const both = shader.sources().vert + shader.sources().frag;
            $mol_assert_not(both.includes('sampler2DArray'));
            $mol_assert_not(both.includes('texture( atlas'));
        },
        'plain solid takes color from instance tint'($) {
            const shader = new $bog_gamengine_shader_solid_plain;
            $mol_assert_equal(shader.face().input.inst_tint, 'vec4');
            $mol_assert_ok(shader.vert().includes('pipe_tint = inst_tint;'));
            $mol_assert_ok(shader.frag().includes('vec3 albedo = pipe_tint.rgb;'));
        },
        'plain solid wants depth and lights like solid'($) {
            const shader = new $bog_gamengine_shader_solid_plain;
            $mol_assert_equal(shader.depth(), true);
            const glob = shader.face().glob;
            $mol_assert_equal(glob.light_count, 'int');
            $mol_assert_equal(glob.light_pos, 'vec4[8]');
            $mol_assert_ok(shader.frag().includes('bog_gamengine_pbr_brdf'));
        },
        'every input and pipe name of plain solid is used'($) {
            const shader = new $bog_gamengine_shader_solid_plain;
            const face = shader.face();
            const vert = shader.sources().vert;
            for (const name in face.input)
                $mol_assert_ok(vert.includes(name));
            for (const name in face.pipe) {
                $mol_assert_ok(shader.vert().includes(name));
                $mol_assert_ok(shader.frag().includes(name));
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'quad array lengths'($) {
            const quad = $bog_gamengine_shape_quad.make({ $ });
            $mol_assert_equal(quad.geometry().length, 12);
            $mol_assert_equal(quad.skin().length, 8);
            $mol_assert_equal(quad.normals().length, 12);
            $mol_assert_equal(quad.count(), 4);
        },
        'quad strip triangles are counter clockwise'($) {
            const geometry = $bog_gamengine_shape_quad.make({ $ }).geometry();
            const cross_z = (a, b, c) => {
                const ax = geometry[b * 3] - geometry[a * 3];
                const ay = geometry[b * 3 + 1] - geometry[a * 3 + 1];
                const bx = geometry[c * 3] - geometry[a * 3];
                const by = geometry[c * 3 + 1] - geometry[a * 3 + 1];
                return ax * by - ay * bx;
            };
            $mol_assert_ok(cross_z(0, 1, 2) > 0);
            $mol_assert_ok(cross_z(2, 1, 3) > 0);
        },
        'quad normals point to plus z'($) {
            const normals = $bog_gamengine_shape_quad.make({ $ }).normals();
            for (let i = 0; i < 4; ++i) {
                $mol_assert_equal(normals[i * 3], 0);
                $mol_assert_equal(normals[i * 3 + 1], 0);
                $mol_assert_equal(normals[i * 3 + 2], 1);
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_atlas_mock extends $bog_gamengine_atlas {
        sizes = {};
        image(uri) {
            const [width, height] = this.sizes[uri] ?? [64, 64];
            return { data: () => ({ width, height }) };
        }
    }
    class $bog_gamengine_atlas_wait_mock extends $bog_gamengine_atlas {
        image(uri) {
            return { data: () => $mol_fail_hidden(new Promise(() => { })) };
        }
    }
    class $bog_gamengine_atlas_blank_mock extends $bog_gamengine_atlas {
        image(uri) {
            return { data: () => ({ width: 512, height: 512, data: new Uint8ClampedArray(4) }) };
        }
    }
    function atlas_mock(uris, sizes = {}) {
        const atlas = new $bog_gamengine_atlas_mock;
        atlas.uris(uris);
        atlas.sizes = sizes;
        return atlas;
    }
    $mol_test({
        'layer index equals position of file in uris'() {
            const atlas = atlas_mock(['bog/gamengine/demo/atlas/coin.png', 'bog/gamengine/demo/atlas/hero.png']);
            $mol_assert_equal(atlas.layer('hero'), 1);
        },
        'image 64×32 in atlas 64 fails with file path'() {
            const uri = 'bog/gamengine/demo/atlas/hero.png';
            const atlas = atlas_mock([uri], { [uri]: [64, 32] });
            const error = $mol_assert_fail(() => atlas.images(), Error);
            $mol_assert_equal(error.message.includes(uri), true);
            $mol_assert_equal(error.message.includes('64×32'), true);
        },
        'unknown layer name fails'() {
            const atlas = atlas_mock(['bog/gamengine/demo/atlas/hero.png']);
            const error = $mol_assert_fail(() => atlas.layer('coin'), Error);
            $mol_assert_equal(error.message.includes('coin'), true);
            $mol_assert_equal(error.message.includes('hero'), true);
        },
        'two files with same name fail'() {
            const atlas = atlas_mock(['bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/tiles/hero.png']);
            const error = $mol_assert_fail(() => atlas.layer('hero'), Error);
            $mol_assert_equal(error.message.includes('atlas/hero.png'), true);
            $mol_assert_equal(error.message.includes('tiles/hero.png'), true);
        },
        'two atlases share one image per uri'($) {
            const uri = 'bog/gamengine/demo/atlas/hero.png';
            const left = new $bog_gamengine_atlas;
            const right = new $bog_gamengine_atlas;
            left.$ = $;
            right.$ = $;
            $mol_assert_equal(left.image(uri), right.image(uri));
            $mol_assert_equal(left.image(uri).uri(), uri);
        },
        'source layers follow layers of uris'() {
            const atlas = atlas_mock(['bog/gamengine/demo/atlas/hero.png']);
            atlas.sources([{ name: 'A', image: { width: 64, height: 64 } }]);
            $mol_assert_equal(atlas.layer('A'), 1);
            $mol_assert_equal(atlas.images().length, 2);
        },
        'ready is true when all images match size'() {
            const atlas = atlas_mock(['bog/gamengine/demo/atlas/hero.png']);
            $mol_assert_equal(atlas.ready(), true);
        },
        'ready is false while the image is still loading'() {
            const atlas = new $bog_gamengine_atlas_wait_mock;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            $mol_assert_equal(atlas.ready(), false);
        },
        'placeholder image gives no size error and keeps atlas not ready'() {
            const atlas = new $bog_gamengine_atlas_blank_mock;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            $mol_assert_equal(atlas.images().length, 1);
            $mol_assert_equal(atlas.ready(), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_cam_test_deep extends $bog_gamengine_cam {
        proj(aspect) {
            return $mol_3d_mat4.perspective(Math.PI / 3, aspect, 0.1, 100);
        }
    }
    function $bog_gamengine_cam_test_frustum() {
        return new $bog_gamengine_cam_test_deep().frustum(1, new Float32Array(24));
    }
    $mol_test({
        'sphere in front of camera is inside frustum'() {
            $mol_assert_ok($bog_gamengine_cam_frustum_sphere($bog_gamengine_cam_test_frustum(), 0, 0, -5, 1));
        },
        'sphere behind camera is outside frustum'() {
            $mol_assert_not($bog_gamengine_cam_frustum_sphere($bog_gamengine_cam_test_frustum(), 0, 0, 5, 1));
        },
        'sphere aside beyond fov is outside frustum'() {
            $mol_assert_not($bog_gamengine_cam_frustum_sphere($bog_gamengine_cam_test_frustum(), 10, 0, -5, 1));
        },
        'sphere crossing near plane from behind is inside frustum'() {
            $mol_assert_ok($bog_gamengine_cam_frustum_sphere($bog_gamengine_cam_test_frustum(), 0, 0, 0.5, 1));
        },
        'aabb behind camera is outside, aabb in front is inside'() {
            const frustum = $bog_gamengine_cam_test_frustum();
            const aabb = new Float32Array([-1, -1, 4, 1, 1, 6, -1, -1, -6, 1, 1, -4]);
            $mol_assert_not($bog_gamengine_cam_frustum_aabb(frustum, aabb, 0));
            $mol_assert_ok($bog_gamengine_cam_frustum_aabb(frustum, aabb, 6));
        },
        'frustum follows camera turned around'() {
            const cam = new $bog_gamengine_cam_test_deep;
            cam.rot(new Float32Array([0, Math.PI, 0]));
            const frustum = cam.frustum(1, new Float32Array(24));
            $mol_assert_ok($bog_gamengine_cam_frustum_sphere(frustum, 0, 0, 5, 1));
            $mol_assert_not($bog_gamengine_cam_frustum_sphere(frustum, 0, 0, -5, 1));
        },
        'view of camera shifted by (0, 0, 5) moves (0, 0, 5) to origin'() {
            const cam = new $bog_gamengine_cam;
            cam.pos(new Float32Array([0, 0, 5]));
            const view = cam.view();
            const point = [0, 0, 5, 1];
            const out = new Float32Array(4);
            for (let i = 0; i < 4; ++i) {
                out[i] = view[i] * point[0] + view[4 + i] * point[1] + view[8 + i] * point[2] + view[12 + i] * point[3];
            }
            $mol_assert_ok(Math.abs(out[0]) < 1e-6);
            $mol_assert_ok(Math.abs(out[1]) < 1e-6);
            $mol_assert_ok(Math.abs(out[2]) < 1e-6);
            $mol_assert_ok(Math.abs(out[3] - 1) < 1e-6);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'box array lengths'($) {
            const box = $bog_gamengine_shape_box.make({ $ });
            $mol_assert_equal(box.geometry().length, 102);
            $mol_assert_equal(box.skin().length, 68);
            $mol_assert_equal(box.normals().length, 102);
            $mol_assert_equal(box.size(), 34);
            $mol_assert_equal(box.count(), 24);
            $mol_assert_equal(box.mode(), 'strip');
        },
        'box has six different unit normals'($) {
            const normals = $bog_gamengine_shape_box.make({ $ }).normals();
            const seen = new Set();
            for (let i = 0; i < 34; ++i) {
                const x = normals[i * 3];
                const y = normals[i * 3 + 1];
                const z = normals[i * 3 + 2];
                $mol_assert_equal(x * x + y * y + z * z, 1);
                seen.add(`${x} ${y} ${z}`);
            }
            $mol_assert_equal(seen.size, 6);
        },
        'box faces are counter clockwise from outside'($) {
            const box = $bog_gamengine_shape_box.make({ $ });
            const geometry = box.geometry();
            const normals = box.normals();
            const winding = (a, b, c) => {
                const ax = geometry[b * 3] - geometry[a * 3];
                const ay = geometry[b * 3 + 1] - geometry[a * 3 + 1];
                const az = geometry[b * 3 + 2] - geometry[a * 3 + 2];
                const bx = geometry[c * 3] - geometry[a * 3];
                const by = geometry[c * 3 + 1] - geometry[a * 3 + 1];
                const bz = geometry[c * 3 + 2] - geometry[a * 3 + 2];
                const cx = ay * bz - az * by;
                const cy = az * bx - ax * bz;
                const cz = ax * by - ay * bx;
                return cx * normals[a * 3] + cy * normals[a * 3 + 1] + cz * normals[a * 3 + 2];
            };
            for (let face = 0; face < 6; ++face) {
                const v = face * 6;
                $mol_assert_ok(winding(v, v + 1, v + 2) > 0);
                $mol_assert_ok(winding(v + 2, v + 1, v + 3) > 0);
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_mesh_test_atlas extends $bog_gamengine_atlas {
        image(uri) {
            return { data: () => ({ width: 64, height: 64 }) };
        }
    }
    class $bog_gamengine_mesh_test_shape_loading extends $bog_gamengine_shape {
        geometry() {
            return $mol_fail(new Promise(() => { }));
        }
    }
    class $bog_gamengine_mesh_test_cam extends $bog_gamengine_cam {
        proj(aspect) {
            return $mol_3d_mat4.perspective(Math.PI / 3, aspect, 0.1, 100);
        }
    }
    function mesh_test_atlas(uris) {
        const atlas = new $bog_gamengine_mesh_test_atlas;
        atlas.uris(uris);
        return atlas;
    }
    function mesh_test_mesh(atlas, frame) {
        const mesh = new $bog_gamengine_mesh;
        mesh.atlas(atlas);
        mesh.frame(frame);
        return mesh;
    }
    $mol_test({
        'layer is taken from atlas by frame name'() {
            const atlas = mesh_test_atlas(['bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/atlas/floor.png']);
            $mol_assert_equal(mesh_test_mesh(atlas, 'floor').layer(), 1);
        },
        'layer without atlas is 0'() {
            $mol_assert_equal(mesh_test_mesh(null, 'floor').layer(), 0);
        },
        'uv is whole layer'() {
            $mol_assert_equal([...new $bog_gamengine_mesh().uv()], [0, 0, 1, 1]);
        },
        'size scales trans in three axes'() {
            const mesh = new $bog_gamengine_mesh;
            mesh.size(new Float32Array([2, 3, 4]));
            const trans = mesh.trans();
            $mol_assert_equal(trans[0], 2);
            $mol_assert_equal(trans[5], 3);
            $mol_assert_equal(trans[10], 4);
        },
        'default shape is box'() {
            $mol_assert_ok(new $bog_gamengine_mesh().shape() instanceof $bog_gamengine_shape_box);
        },
        'two meshes of different atlases give two batches'() {
            const first = mesh_test_atlas(['bog/gamengine/demo/atlas/wall.png']);
            const second = mesh_test_atlas(['bog/gamengine/demo/atlas/floor.png']);
            const shader = new $bog_gamengine_shader_solid;
            const parts = $bog_gamengine_batch_group([mesh_test_mesh(first, 'wall'), mesh_test_mesh(second, 'floor')], () => shader, node => node.shape());
            $mol_assert_equal(parts.length, 2);
            $mol_assert_equal(parts[0].atlas, first);
            $mol_assert_equal(parts[1].atlas, second);
        },
        'filled batch has layer and tint of mesh'() {
            const atlas = mesh_test_atlas(['bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/atlas/floor.png']);
            const mesh = mesh_test_mesh(atlas, 'floor');
            mesh.tint(new Float32Array([1, 0.5, 0.25, 1]));
            const batch = new $bog_gamengine_batch;
            batch.nodes([mesh]);
            batch.fill();
            $mol_assert_equal(batch.layer[0], 1);
            $mol_assert_equal([...batch.tint.subarray(0, 4)], [1, 0.5, 0.25, 1]);
        },
        'lods are empty by default and can be set'() {
            const mesh = new $bog_gamengine_mesh;
            $mol_assert_equal(mesh.lods().length, 0);
            const low = new $bog_gamengine_shape_quad;
            mesh.lods([{ dist: 6, shape: low }]);
            $mol_assert_equal(mesh.lods()[0].shape, low);
        },
        'radius of a loading shape is infinite and batch fill with frustum keeps the mesh'() {
            const mesh = new $bog_gamengine_mesh;
            mesh.shape(new $bog_gamengine_mesh_test_shape_loading);
            mesh.pos(new Float32Array([0, 0, 5]));
            $mol_assert_equal(mesh.radius(), Infinity);
            const batch = new $bog_gamengine_batch;
            batch.nodes([mesh]);
            const cam = new $bog_gamengine_mesh_test_cam;
            $mol_assert_equal(batch.fill(cam.frustum(1, new Float32Array(24))), 1);
        },
        'radius of box mesh is half diagonal of unit cube'() {
            $mol_assert_ok(Math.abs(new $bog_gamengine_mesh().radius() - Math.sqrt(3) / 2) < 1e-6);
        },
        'set through props changes size'() {
            const mesh = new $bog_gamengine_mesh;
            mesh.props().find(prop => prop.name === 'size').set(new Float32Array([2, 3, 4]));
            $mol_assert_equal([...mesh.size()], [2, 3, 4]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_batch_test_tinted extends $bog_gamengine_node {
        tint() {
            return new Float32Array([1, 0, 0, 0.5]);
        }
    }
    class $bog_gamengine_batch_test_layered extends $bog_gamengine_node {
        layer() {
            return 3;
        }
        uv() {
            return new Float32Array([1, 0, -1, 1]);
        }
    }
    function $bog_gamengine_batch_test_node(x, y, z) {
        const node = new $bog_gamengine_node;
        node.pos(new Float32Array([x, y, z]));
        return node;
    }
    function $bog_gamengine_batch_test_mesh(x, y, z) {
        const mesh = new $bog_gamengine_mesh;
        mesh.pos(new Float32Array([x, y, z]));
        return mesh;
    }
    class $bog_gamengine_batch_test_cam extends $bog_gamengine_cam {
        proj(aspect) {
            return $mol_3d_mat4.perspective(Math.PI / 3, aspect, 0.1, 100);
        }
    }
    function $bog_gamengine_batch_test_frustum() {
        return new $bog_gamengine_batch_test_cam().frustum(1, new Float32Array(24));
    }
    $mol_test({
        'mesh behind frustum is not counted, mesh in front is'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([
                $bog_gamengine_batch_test_mesh(0, 0, 5),
                $bog_gamengine_batch_test_mesh(0, 0, -5),
            ]);
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 1);
            $mol_assert_equal(batch.count, 1);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [0, 0, -5]);
        },
        'scaled mesh near frustum edge is kept by its grown radius'() {
            const mesh = $bog_gamengine_batch_test_mesh(4, 0, -5);
            mesh.scale(new Float32Array([4, 4, 4]));
            const batch = new $bog_gamengine_batch;
            batch.nodes([mesh]);
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 1);
            mesh.scale(new Float32Array([1, 1, 1]));
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 0);
        },
        'cull off keeps mesh behind frustum'() {
            const batch = new $bog_gamengine_batch;
            batch.cull(false);
            batch.nodes([$bog_gamengine_batch_test_mesh(0, 0, 5)]);
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 1);
        },
        'without frustum nothing is culled'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([$bog_gamengine_batch_test_mesh(0, 0, 5)]);
            $mol_assert_equal(batch.fill(), 1);
        },
        'source with aabb is compacted to instances inside frustum'() {
            const trans = new Float32Array(48);
            trans.set([1, 0, 5], 12);
            trans.set([2, 0, -5], 28);
            trans.set([3, 0, -8], 44);
            const aabb = new Float32Array([
                0, -1, 4, 2, 1, 6,
                1, -1, -6, 3, 1, -4,
                2, -1, -9, 4, 1, -7,
            ]);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 3, aabb });
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 2);
            $mol_assert_equal(batch.count, 2);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [2, 0, -5]);
            $mol_assert_equal([...batch.trans.subarray(28, 31)], [3, 0, -8]);
        },
        'source skip is applied before aabb culling'() {
            const trans = new Float32Array(32);
            trans.set([1, 0, -5], 12);
            trans.set([2, 0, -5], 28);
            const aabb = new Float32Array([0, -1, -6, 2, 1, -4, 1, -1, -6, 3, 1, -4]);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 2, aabb });
            batch.skip(1);
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 1);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [2, 0, -5]);
        },
        'near and far keep only nodes within distance to eye'() {
            const batch = new $bog_gamengine_batch;
            batch.near(2);
            batch.far(10);
            batch.nodes([
                $bog_gamengine_batch_test_node(0, 0, -1),
                $bog_gamengine_batch_test_node(0, 0, -5),
                $bog_gamengine_batch_test_node(0, 0, -20),
            ]);
            $mol_assert_equal(batch.fill(null, new Float32Array(3)), 1);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [0, 0, -5]);
        },
        'far is exclusive so two batches split nodes without overlap'() {
            const nodes = [
                $bog_gamengine_batch_test_node(0, 0, -3),
                $bog_gamengine_batch_test_node(0, 0, -6),
                $bog_gamengine_batch_test_node(0, 0, -9),
            ];
            const close = new $bog_gamengine_batch;
            close.far(6);
            close.nodes(nodes);
            const distant = new $bog_gamengine_batch;
            distant.near(6);
            distant.nodes(nodes);
            const eye = new Float32Array(3);
            $mol_assert_equal(close.fill(null, eye), 1);
            $mol_assert_equal(distant.fill(null, eye), 2);
        },
        'without eye near and far are ignored'() {
            const batch = new $bog_gamengine_batch;
            batch.near(2);
            batch.nodes([$bog_gamengine_batch_test_node(0, 0, -1)]);
            $mol_assert_equal(batch.fill(), 1);
        },
        'two nodes give count 2 and translations at offsets 12 and 28'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([
                $bog_gamengine_batch_test_node(1, 2, 3),
                $bog_gamengine_batch_test_node(4, 5, 6),
            ]);
            $mol_assert_equal(batch.fill(), 2);
            $mol_assert_equal(batch.count, 2);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [1, 2, 3]);
            $mol_assert_equal([...batch.trans.subarray(28, 31)], [4, 5, 6]);
        },
        'third node keeps buffers when cap suffices'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([
                $bog_gamengine_batch_test_node(1, 2, 3),
                $bog_gamengine_batch_test_node(4, 5, 6),
            ]);
            batch.fill();
            $mol_assert_ok(batch.cap >= 3);
            const trans = batch.trans;
            const tint = batch.tint;
            batch.nodes([
                $bog_gamengine_batch_test_node(1, 2, 3),
                $bog_gamengine_batch_test_node(4, 5, 6),
                $bog_gamengine_batch_test_node(7, 8, 9),
            ]);
            $mol_assert_equal(batch.fill(), 3);
            $mol_assert_equal(batch.trans, trans);
            $mol_assert_equal(batch.tint, tint);
            $mol_assert_equal([...batch.trans.subarray(44, 47)], [7, 8, 9]);
        },
        'grow doubles cap until it covers need'() {
            const batch = new $bog_gamengine_batch;
            batch.grow(1);
            $mol_assert_equal(batch.cap, 16);
            batch.grow(40);
            $mol_assert_equal(batch.cap, 64);
            $mol_assert_equal(batch.trans.length, 64 * 16);
            $mol_assert_equal(batch.tint.length, 64 * 4);
        },
        'tint defaults to opaque white'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([$bog_gamengine_batch_test_node(0, 0, 0)]);
            batch.fill();
            $mol_assert_equal([...batch.tint.subarray(0, 4)], [1, 1, 1, 1]);
        },
        'node with tint writes its color'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([
                $bog_gamengine_batch_test_node(0, 0, 0),
                new $bog_gamengine_batch_test_tinted,
            ]);
            batch.fill();
            $mol_assert_equal([...batch.tint.subarray(4, 8)], [1, 0, 0, 0.5]);
        },
        'node with layer and uv writes them, plain node gets 0 and whole uv'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([
                $bog_gamengine_batch_test_node(0, 0, 0),
                new $bog_gamengine_batch_test_layered,
            ]);
            batch.fill();
            $mol_assert_equal([...batch.layer.subarray(0, 2)], [0, 3]);
            $mol_assert_equal([...batch.uv.subarray(0, 8)], [0, 0, 1, 1, 1, 0, -1, 1]);
        },
        'material buffer is filled from mesh material, plain node gets default'() {
            const mesh = new $bog_gamengine_mesh;
            mesh.material(new Float32Array([0.75, 0.25, 0.5, 0]));
            const batch = new $bog_gamengine_batch;
            batch.nodes([$bog_gamengine_batch_test_node(0, 0, 0), mesh]);
            batch.fill();
            $mol_assert_equal(batch.material.subarray(0, 8), new Float32Array([0, 0.6, 0, 0, 0.75, 0.25, 0.5, 0]));
        },
        'normal layer is -1 without normal frame'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([$bog_gamengine_batch_test_node(0, 0, 0), new $bog_gamengine_mesh]);
            batch.fill();
            $mol_assert_equal([...batch.normal_layer.subarray(0, 2)], [-1, -1]);
        },
        'source fill gives default material'() {
            const batch = new $bog_gamengine_batch;
            batch.source({ trans: new Float32Array(16), count: 1 });
            batch.fill();
            $mol_assert_equal(batch.material.subarray(0, 4), new Float32Array([0, 0.6, 0, 0]));
            $mol_assert_equal(batch.normal_layer[0], -1);
        },
        'version grows on every fill'() {
            const batch = new $bog_gamengine_batch;
            const before = batch.version;
            batch.fill();
            batch.fill();
            $mol_assert_equal(batch.version, before + 2);
        },
        'source with two matrices gives count 2 and same translations'() {
            const trans = new Float32Array(32);
            trans.set([1, 2, 3], 12);
            trans.set([4, 5, 6], 28);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 2 });
            $mol_assert_equal(batch.fill(), 2);
            $mol_assert_equal(batch.count, 2);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [1, 2, 3]);
            $mol_assert_equal([...batch.trans.subarray(28, 31)], [4, 5, 6]);
            $mol_assert_equal([...batch.tint.subarray(4, 8)], [1, 1, 1, 1]);
            $mol_assert_equal([...batch.uv.subarray(4, 8)], [0, 0, 1, 1]);
        },
        'source tint, layer and uv are copied per instance'() {
            const trans = new Float32Array(32);
            const tint = new Float32Array([1, 1, 1, 1, 1, 0, 0, 0.5]);
            const layer = new Float32Array([2, 3]);
            const uv = new Float32Array([0, 0, 1, 1, 1, 0, -1, 1]);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 2, tint, layer, uv });
            $mol_assert_equal(batch.fill(), 2);
            $mol_assert_equal([...batch.tint.subarray(4, 8)], [1, 0, 0, 0.5]);
            $mol_assert_equal([...batch.layer.subarray(0, 2)], [2, 3]);
            $mol_assert_equal([...batch.uv.subarray(4, 8)], [1, 0, -1, 1]);
        },
        'source tint and layer are compacted with trans under frustum'() {
            const trans = new Float32Array(32);
            trans.set([1, 0, 5], 12);
            trans.set([2, 0, -5], 28);
            const aabb = new Float32Array([0, -1, 4, 2, 1, 6, 1, -1, -6, 3, 1, -4]);
            const tint = new Float32Array([1, 1, 1, 1, 0, 1, 0, 1]);
            const layer = new Float32Array([1, 2]);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 2, aabb, tint, layer });
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 1);
            $mol_assert_equal([...batch.tint.subarray(0, 4)], [0, 1, 0, 1]);
            $mol_assert_equal(batch.layer[0], 2);
        },
        'source with skip 1 drops the first matrix'() {
            const trans = new Float32Array(32);
            trans.set([1, 2, 3], 12);
            trans.set([4, 5, 6], 28);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 2 });
            batch.skip(1);
            $mol_assert_equal(batch.fill(), 1);
            $mol_assert_equal(batch.count, 1);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [4, 5, 6]);
        },
        'instances draw without nodes at the world origin'() {
            const batch = new $bog_gamengine_batch;
            batch.instances(1);
            $mol_assert_equal(batch.fill(), 1);
            $mol_assert_equal([...batch.trans.subarray(0, 16)], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            $mol_assert_equal([...batch.tint.subarray(0, 4)], [1, 1, 1, 1]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const uv_plain = new Float32Array([0, 0, 1, 1]);
    const uv_flip = new Float32Array([1, 0, -1, 1]);
    class $bog_gamengine_sprite extends $bog_gamengine_node {
        atlas(next) {
            return next ?? null;
        }
        frame(next = '') {
            return next;
        }
        clip(next = '') {
            return next;
        }
        fps(next = 8) {
            return next;
        }
        clock(next) {
            return next ?? null;
        }
        clips(next) {
            return next ?? {};
        }
        flip_x(next = false) {
            return next;
        }
        size(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        props() {
            return [
                ...super.props(),
                { name: 'frame', kind: 'frame', get: () => this.frame(), set: next => this.frame(next) },
                { name: 'flip_x', kind: 'flag', get: () => this.flip_x(), set: next => this.flip_x(next) },
                { name: 'size', kind: 'vec2', get: () => this.size(), set: next => this.size(next) },
                { name: 'clip', kind: 'text', get: () => this.clip(), set: next => this.clip(next) },
                { name: 'fps', kind: 'number', get: () => this.fps(), set: next => this.fps(next) },
                { name: 'billboard', kind: 'flag', get: () => this.billboard(), set: next => this.billboard(next) },
            ];
        }
        radius() {
            return Math.SQRT1_2;
        }
        frame_now() {
            const clip = this.clip();
            if (!clip)
                return this.frame();
            const list = this.clips()[clip];
            if (!list)
                return this.frame();
            const clock = this.clock();
            const time = clock ? clock.time() : 0;
            return list[Math.floor(time * this.fps()) % list.length];
        }
        layer() {
            const atlas = this.atlas();
            return atlas ? atlas.layer(this.frame_now()) : 0;
        }
        uv() {
            return this.flip_x() ? uv_flip : uv_plain;
        }
        trans() {
            const size = this.size();
            return $mol_3d_mat4.multiply(super.trans(), $mol_3d_mat4.scaling([size[0], size[1], 1]));
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "clip", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "fps", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "clock", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "clips", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "flip_x", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "uv", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "trans", null);
    $.$bog_gamengine_sprite = $bog_gamengine_sprite;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_sprite_test_atlas extends $bog_gamengine_atlas {
        image(uri) {
            return { data: () => ({ width: 64, height: 64 }) };
        }
    }
    function sprite_test_atlas(uris) {
        const atlas = new $bog_gamengine_sprite_test_atlas;
        atlas.uris(uris);
        return atlas;
    }
    function sprite_test_sprite(atlas, frame) {
        const sprite = new $bog_gamengine_sprite;
        sprite.atlas(atlas);
        sprite.frame(frame);
        return sprite;
    }
    class $bog_gamengine_sprite_test_clock extends $bog_gamengine_clock {
        at = 0;
        time() {
            return this.at;
        }
    }
    function sprite_test_walk(at) {
        const clock = new $bog_gamengine_sprite_test_clock;
        clock.at = at;
        const sprite = sprite_test_sprite(null, 'a');
        sprite.clock(clock);
        sprite.clips({ walk: ['a', 'b', 'c', 'd'] });
        sprite.fps(4);
        sprite.clip('walk');
        return sprite;
    }
    const sprite_test_shader = new $bog_gamengine_shader_sprite;
    const sprite_test_shape = new $bog_gamengine_shape_quad;
    function sprite_test_group(sprites) {
        const parts = $bog_gamengine_batch_group(sprites, () => sprite_test_shader, () => sprite_test_shape);
        return parts.map(part => {
            const batch = new $bog_gamengine_batch;
            batch.atlas(part.atlas);
            batch.nodes(part.nodes);
            return batch;
        });
    }
    $mol_test({
        'two sprites of different atlases give two batches'() {
            const first = sprite_test_atlas(['bog/gamengine/demo/atlas/hero.png']);
            const second = sprite_test_atlas(['bog/gamengine/demo/atlas/coin.png']);
            const batches = sprite_test_group([
                sprite_test_sprite(first, 'hero'),
                sprite_test_sprite(second, 'coin'),
            ]);
            $mol_assert_equal(batches.length, 2);
            $mol_assert_equal(batches[0].atlas(), first);
            $mol_assert_equal(batches[1].atlas(), second);
        },
        'two sprites of one atlas give one batch with both nodes'() {
            const atlas = sprite_test_atlas(['bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png']);
            const hero = sprite_test_sprite(atlas, 'hero');
            const coin = sprite_test_sprite(atlas, 'coin');
            const batches = sprite_test_group([hero, coin]);
            $mol_assert_equal(batches.length, 1);
            $mol_assert_equal(batches[0].nodes(), [hero, coin]);
        },
        'layer is taken from atlas by frame name'() {
            const atlas = sprite_test_atlas(['bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png']);
            $mol_assert_equal(sprite_test_sprite(atlas, 'coin').layer(), 1);
        },
        'layer without atlas is 0'() {
            $mol_assert_equal(sprite_test_sprite(null, 'coin').layer(), 0);
        },
        'clip frame at 0.5 s with fps 4 is third'() {
            $mol_assert_equal(sprite_test_walk(0.5).frame_now(), 'c');
        },
        'clip frame at 0.26 s with fps 4 is second'() {
            $mol_assert_equal(sprite_test_walk(0.26).frame_now(), 'b');
        },
        'frame_now without clip is frame'() {
            $mol_assert_equal(sprite_test_sprite(null, 'hero').frame_now(), 'hero');
        },
        'layer follows clip frame'() {
            const atlas = sprite_test_atlas(['atlas/a.png', 'atlas/b.png', 'atlas/c.png', 'atlas/d.png']);
            const sprite = sprite_test_walk(0.26);
            sprite.atlas(atlas);
            $mol_assert_equal(sprite.layer(), 1);
        },
        'flip_x mirrors uv'() {
            const sprite = new $bog_gamengine_sprite;
            $mol_assert_equal([...sprite.uv()], [0, 0, 1, 1]);
            sprite.flip_x(true);
            $mol_assert_equal([...sprite.uv()], [1, 0, -1, 1]);
        },
        'size scales trans'() {
            const sprite = new $bog_gamengine_sprite;
            sprite.size(new Float32Array([2, 3]));
            const trans = sprite.trans();
            $mol_assert_equal(trans[0], 2);
            $mol_assert_equal(trans[5], 3);
            $mol_assert_equal(trans[10], 1);
        },
        'filled batch has layer and uv of sprite'() {
            const atlas = sprite_test_atlas(['bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png']);
            const sprite = sprite_test_sprite(atlas, 'coin');
            sprite.flip_x(true);
            const batch = sprite_test_group([sprite])[0];
            batch.fill();
            $mol_assert_equal(batch.layer[0], 1);
            $mol_assert_equal([...batch.uv.subarray(0, 4)], [1, 0, -1, 1]);
        },
        'props contain frame and flip_x'() {
            const names = new $bog_gamengine_sprite().props().map(prop => prop.name);
            $mol_assert_ok(names.includes('frame'));
            $mol_assert_ok(names.includes('flip_x'));
        },
        'set through props changes flip_x'() {
            const sprite = new $bog_gamengine_sprite;
            sprite.props().find(prop => prop.name === 'flip_x').set(true);
            $mol_assert_equal(sprite.flip_x(), true);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'plane array lengths'($) {
            const plane = $bog_gamengine_shape_plane.make({ $ });
            $mol_assert_equal(plane.geometry().length, 12);
            $mol_assert_equal(plane.skin().length, 8);
            $mol_assert_equal(plane.normals().length, 12);
            $mol_assert_equal(plane.count(), 4);
        },
        'plane normals point up'($) {
            const normals = $bog_gamengine_shape_plane.make({ $ }).normals();
            for (let i = 0; i < 4; ++i) {
                $mol_assert_equal(normals[i * 3], 0);
                $mol_assert_equal(normals[i * 3 + 1], 1);
                $mol_assert_equal(normals[i * 3 + 2], 0);
            }
        },
        'plane strip is counter clockwise from above'($) {
            const geometry = $bog_gamengine_shape_plane.make({ $ }).geometry();
            const cross_y = (a, b, c) => {
                const ax = geometry[b * 3] - geometry[a * 3];
                const az = geometry[b * 3 + 2] - geometry[a * 3 + 2];
                const bx = geometry[c * 3] - geometry[a * 3];
                const bz = geometry[c * 3 + 2] - geometry[a * 3 + 2];
                return az * bx - ax * bz;
            };
            $mol_assert_ok(cross_y(0, 1, 2) > 0);
            $mol_assert_ok(cross_y(2, 1, 3) > 0);
        },
        'plane skin stretches by tile'($) {
            const plane = $bog_gamengine_shape_plane.make({ $ });
            $mol_assert_equal(Math.max(...plane.skin()), 1);
            plane.tile([4, 4]);
            $mol_assert_equal(Math.max(...plane.skin()), 4);
        },
        'plane skin tiles each axis on its own'($) {
            const plane = $bog_gamengine_shape_plane.make({ $ });
            plane.tile([4, 2]);
            const skin = plane.skin();
            $mol_assert_equal([skin[0], skin[1]], [0, 2]);
            $mol_assert_equal([skin[2], skin[3]], [4, 2]);
            $mol_assert_equal([skin[4], skin[5]], [0, 0]);
            $mol_assert_equal([skin[6], skin[7]], [4, 0]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function group_test_atlas(uris) {
        const atlas = new $bog_gamengine_atlas;
        atlas.uris(uris);
        return atlas;
    }
    function group_test_sprite(atlas) {
        const sprite = new $bog_gamengine_sprite;
        sprite.atlas(atlas);
        return sprite;
    }
    function group_test_mesh(atlas, shape) {
        const mesh = new $bog_gamengine_mesh;
        mesh.atlas(atlas);
        if (shape)
            mesh.shape(shape);
        return mesh;
    }
    const sprite_shader = new $bog_gamengine_shader_sprite;
    const solid_shader = new $bog_gamengine_shader_solid;
    const quad = new $bog_gamengine_shape_quad;
    function group_test_parts(nodes) {
        return $bog_gamengine_batch_group(nodes, node => node.shader?.() ?? (typeof node.normal_layer === 'function' ? solid_shader : sprite_shader), node => typeof node.shape === 'function' ? node.shape() : quad);
    }
    $mol_test({
        'two sprites of one atlas and a mesh with a box give two groups'() {
            const atlas = group_test_atlas(['bog/gamengine/demo/atlas/hero.png']);
            const first = group_test_sprite(atlas);
            const second = group_test_sprite(atlas);
            const mesh = group_test_mesh(atlas);
            const parts = group_test_parts([first, second, mesh]);
            $mol_assert_equal(parts.length, 2);
            $mol_assert_equal(parts[0].nodes, [first, second]);
            $mol_assert_equal(parts[1].nodes, [mesh]);
            $mol_assert_equal(parts[0].atlas, atlas);
            $mol_assert_equal(parts[1].atlas, atlas);
        },
        'two meshes of different shapes give two groups'() {
            const atlas = group_test_atlas(['bog/gamengine/demo/atlas/wall.png']);
            const box = group_test_mesh(atlas, new $bog_gamengine_shape_box);
            const plane = group_test_mesh(atlas, new $bog_gamengine_shape_plane);
            const parts = group_test_parts([box, plane]);
            $mol_assert_equal(parts.length, 2);
            $mol_assert_equal(parts[0].shape, box.shape());
            $mol_assert_equal(parts[1].shape, plane.shape());
        },
        'two meshes of different atlases give two groups'() {
            const first = group_test_atlas(['bog/gamengine/demo/atlas/wall.png']);
            const second = group_test_atlas(['bog/gamengine/demo/atlas/floor.png']);
            const shape = new $bog_gamengine_shape_box;
            const parts = group_test_parts([group_test_mesh(first, shape), group_test_mesh(second, shape)]);
            $mol_assert_equal(parts.length, 2);
            $mol_assert_equal(parts[0].atlas, first);
            $mol_assert_equal(parts[1].atlas, second);
        },
        'node with its own shader goes to its own group'() {
            const atlas = group_test_atlas(['bog/gamengine/demo/atlas/hero.png']);
            const plain = group_test_sprite(atlas);
            const own = group_test_sprite(atlas);
            own.shader(new $bog_gamengine_shader_flat);
            const parts = group_test_parts([plain, own]);
            $mol_assert_equal(parts.length, 2);
            $mol_assert_equal(parts[0].nodes, [plain]);
            $mol_assert_equal(parts[1].nodes, [own]);
            $mol_assert_equal(parts[1].shader, own.shader());
        },
        'group key is the same for the same triple and differs otherwise'() {
            const atlas = group_test_atlas(['bog/gamengine/demo/atlas/hero.png']);
            const shape = new $bog_gamengine_shape_box;
            const parts = group_test_parts([group_test_mesh(atlas, shape), group_test_mesh(atlas, shape)]);
            $mol_assert_equal(parts.length, 1);
            const again = group_test_parts([group_test_mesh(atlas, shape)]);
            $mol_assert_equal(parts[0].key, again[0].key);
        },
        'id of null is zero and id of an object is stable'() {
            const atlas = group_test_atlas(['bog/gamengine/demo/atlas/hero.png']);
            $mol_assert_equal($bog_gamengine_batch_group_id(null), '0');
            $mol_assert_equal($bog_gamengine_batch_group_id(atlas), $bog_gamengine_batch_group_id(atlas));
            $mol_assert_not($bog_gamengine_batch_group_id(atlas) === $bog_gamengine_batch_group_id(new $bog_gamengine_atlas));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'set through props changes still'() {
            const body = new $bog_gamengine_phys_body;
            body.props().find(prop => prop.name === 'still').set(true);
            $mol_assert_equal(body.still(), true);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_phys_tile_test_make() {
        const tile = new $bog_gamengine_phys_tile;
        tile.map('###\n#.#\n###');
        return tile;
    }
    function $bog_gamengine_phys_tile_test_level() {
        const tile = new $bog_gamengine_phys_tile;
        tile.map('..o..\n.###.\n.E...\n#####');
        return tile;
    }
    $mol_test({
        'ahead gives the char of the cell in the given direction'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            $mol_assert_equal(tile.ahead(0.5, -2.5, 1, 0, 1), 'E');
            $mol_assert_equal(tile.ahead(2.5, -0.5, 0, -1, 1), '#');
            $mol_assert_equal(tile.ahead(2.5, -0.5, 1, 0, 1), '.');
            $mol_assert_equal(tile.ahead(2.5, -0.5, 1, 0, 3), '');
        },
        'edge is true past the end of the platform and false above it'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            $mol_assert_equal(tile.edge(2.5, -0.5, 1, 0), false);
            $mol_assert_equal(tile.edge(3.5, -0.5, 1, 0), true);
            $mol_assert_equal(tile.edge(1.5, -0.5, -1, 0), true);
        },
        'edge is false when the cell ahead is solid'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            $mol_assert_equal(tile.edge(1.5, -1.5, 1, 0), false);
        },
        'spots gives every cell with the char'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            $mol_assert_equal(tile.spots('o').length, 1);
            $mol_assert_equal(tile.spots('o')[0][0], 2);
            $mol_assert_equal(tile.spots('o')[0][1], 0);
            $mol_assert_equal(tile.spots('E').length, 1);
            $mol_assert_equal(tile.spots('#').length, 8);
            $mol_assert_equal(tile.spots('x').length, 0);
        },
        'chars gives the set of chars of the map'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            const chars = tile.chars();
            $mol_assert_equal(chars.size, 4);
            $mol_assert_equal(chars.has('o'), true);
            $mol_assert_equal(chars.has('E'), true);
            $mol_assert_equal(chars.has('#'), true);
            $mol_assert_equal(chars.has('x'), false);
        },
        'spots follow the map'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            $mol_assert_equal(tile.spots('o').length, 1);
            tile.map('.....\n#####');
            $mol_assert_equal(tile.spots('o').length, 0);
            $mol_assert_equal(tile.chars().size, 2);
        },
        'cell pos is the center of the cell square'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            const pos = tile.cell_pos(2, 1, new Float32Array(3));
            $mol_assert_equal(pos[0], 2.5);
            $mol_assert_equal(pos[1], -1.5);
            $mol_assert_equal(pos[2], 0);
        },
        'cell at the center of a cell gives that cell back'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            const pos = tile.cell_pos(2, 1, new Float32Array(3));
            const at = tile.cell_at(pos[0], pos[1], new Int32Array(2));
            $mol_assert_equal(at[0], 2);
            $mol_assert_equal(at[1], 1);
        },
        'corners of a cell belong to it'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            const at = new Int32Array(2);
            tile.cell_at(2, -1, at);
            $mol_assert_equal(at[0], 2);
            $mol_assert_equal(at[1], 1);
            tile.cell_at(2.999, -1.001, at);
            $mol_assert_equal(at[0], 2);
            $mol_assert_equal(at[1], 1);
        },
        'cell at a point outside the map is outside its bounds'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            const at = tile.cell_at(-0.5, 0.5, new Int32Array(2));
            $mol_assert_equal(at[0], -1);
            $mol_assert_equal(at[1], -1);
            $mol_assert_equal(tile.cell(at[0], at[1]), true);
        },
        'solid at a point uses the same cell as cell at'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            const pos = tile.cell_pos(1, 1, new Float32Array(3));
            $mol_assert_equal(tile.solid_at(pos[0], pos[1]), false);
            const wall = tile.cell_pos(0, 1, new Float32Array(3));
            $mol_assert_equal(tile.solid_at(wall[0], wall[1]), true);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const map = '####\n#..#\n####';
    const room = '#####\n#...#\n#...#\n#...#\n#####';
    class Probe extends $bog_gamengine_phys_body {
        hits = [];
        normals = [];
        hit(other, normal) {
            this.hits.push(other);
            this.normals.push(normal ? [normal[0], normal[1]] : []);
        }
        last_normal() {
            return this.normals[this.normals.length - 1];
        }
    }
    function room_phys(body, gy) {
        const tile = new $bog_gamengine_phys_tile;
        tile.map(room);
        const phys = new $bog_gamengine_phys;
        phys.tile(tile);
        phys.gravity(new Float32Array([0, gy]));
        phys.bodies([body]);
        return phys;
    }
    function falling(steps) {
        const body = new Probe;
        body.pos(new Float32Array([2.5, -1.5, 0]));
        const phys = room_phys(body, -10);
        for (let i = 0; i < steps; ++i)
            phys.step(0.1);
        return body;
    }
    function flying() {
        const body = new Probe;
        body.pos(new Float32Array([1.5, -1.5, 0]));
        body.vel(new Float32Array([10, 0, 0]));
        const tile = new $bog_gamengine_phys_tile;
        tile.map(map);
        const phys = new $bog_gamengine_phys;
        phys.tile(tile);
        phys.bodies([body]);
        phys.step(0.1);
        return body;
    }
    function pair(a_still) {
        const a = new Probe;
        a.still(a_still);
        const b = new Probe;
        b.pos(new Float32Array([0.5, 0, 0]));
        const phys = new $bog_gamengine_phys;
        phys.bodies([a, b]);
        phys.step(0.1);
        return [a, b];
    }
    $mol_test({
        'body flying into tile wall stops at its face'() {
            const body = flying();
            $mol_assert_ok(Math.abs(body.pos()[0] - 2.5) < 1e-6);
        },
        'body flying into tile wall loses velocity along that axis'() {
            $mol_assert_equal(flying().vel()[0], 0);
        },
        'body flying into tile wall gets hit with null'() {
            $mol_assert_equal(flying().hits, [null]);
        },
        'two moving bodies push apart equally'() {
            const [a, b] = pair(false);
            $mol_assert_equal(a.pos()[0], -0.25);
            $mol_assert_equal(b.pos()[0], 0.75);
        },
        'two moving bodies hit each other'() {
            const [a, b] = pair(false);
            $mol_assert_equal(a.hits, [b]);
            $mol_assert_equal(b.hits, [a]);
        },
        'moving body is pushed out of still one entirely'() {
            const [a, b] = pair(true);
            $mol_assert_equal(a.pos()[0], 0);
            $mol_assert_equal(b.pos()[0], 1);
        },
        'moving body passes through ghost and both get hit'() {
            const ghost = new Probe;
            ghost.ghost(true);
            const mover = new Probe;
            mover.pos(new Float32Array([0.5, 0, 0]));
            mover.vel(new Float32Array([1, 0, 0]));
            const phys = new $bog_gamengine_phys;
            phys.bodies([ghost, mover]);
            phys.step(0.1);
            $mol_assert_equal(ghost.pos()[0], 0);
            $mol_assert_ok(Math.abs(mover.pos()[0] - 0.6) < 1e-6);
            $mol_assert_equal(ghost.hits, [mover]);
            $mol_assert_equal(mover.hits, [ghost]);
        },
        'ghost inside tile wall is not pushed out'() {
            const ghost = new Probe;
            ghost.ghost(true);
            ghost.pos(new Float32Array([0.5, -0.5, 0]));
            const tile = new $bog_gamengine_phys_tile;
            tile.map(map);
            const phys = new $bog_gamengine_phys;
            phys.tile(tile);
            phys.bodies([ghost]);
            phys.step(0.1);
            $mol_assert_equal(ghost.pos()[0], 0.5);
            $mol_assert_equal(ghost.pos()[1], -0.5);
            $mol_assert_equal(ghost.hits, []);
        },
        'gravity drops the body onto the tile floor'() {
            $mol_assert_equal(falling(8).pos()[1], -3.5);
        },
        'landed body stands on ground'() {
            const body = falling(8);
            $mol_assert_equal(body.on_ground(), true);
            $mol_assert_equal(body.touched & $bog_gamengine_phys_body.side_down, $bog_gamengine_phys_body.side_down);
        },
        'landed body gets hit with the normal up'() {
            $mol_assert_equal(falling(8).last_normal(), [0, 1]);
        },
        'jump up stops at the ceiling'() {
            const body = new Probe;
            body.pos(new Float32Array([2.5, -3.5, 0]));
            body.vel(new Float32Array([0, 10, 0]));
            const phys = room_phys(body, -10);
            for (let i = 0; i < 3; ++i)
                phys.step(0.1);
            $mol_assert_equal(body.pos()[1], -1.5);
            $mol_assert_equal(body.on_ceil(), true);
            $mol_assert_equal(body.last_normal(), [0, -1]);
        },
        'body running into a wall touches it aside'() {
            const body = new Probe;
            body.pos(new Float32Array([2.5, -2.5, 0]));
            body.vel(new Float32Array([10, 0, 0]));
            const phys = room_phys(body, 0);
            phys.step(0.1);
            $mol_assert_equal(body.on_wall(), true);
            $mol_assert_equal(body.on_ground(), false);
            $mol_assert_equal(body.last_normal(), [-1, 0]);
        },
        'gravity does not move a ghost'() {
            const body = new Probe;
            body.ghost(true);
            body.pos(new Float32Array([2.5, -1.5, 0]));
            const phys = room_phys(body, -10);
            phys.step(0.1);
            $mol_assert_equal(body.pos()[1], -1.5);
            $mol_assert_equal(body.vel()[1], 0);
        },
        'gravity does not move a still body'() {
            const body = new Probe;
            body.still(true);
            body.pos(new Float32Array([2.5, -1.5, 0]));
            const phys = room_phys(body, -10);
            phys.step(0.1);
            $mol_assert_equal(body.pos()[1], -1.5);
            $mol_assert_equal(body.vel()[1], 0);
        },
        'body with read-only pos fails by name'() {
            class Stuck extends $bog_gamengine_phys_body {
                fixed = new Float32Array([2.5, -1.5, 0]);
                pos() {
                    return this.fixed;
                }
            }
            const body = new Stuck;
            body.vel(new Float32Array([1, 0, 0]));
            const phys = new $bog_gamengine_phys;
            phys.bodies([body]);
            $mol_assert_fail(() => phys.step(0.1), 'Stuck: pos is read-only, declare it as `pos? <=>`');
        },
        'tile cell beyond map edge is solid'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map(map);
            $mol_assert_equal(tile.cell(-1, 1), true);
            $mol_assert_equal(tile.cell(4, 1), true);
            $mol_assert_equal(tile.cell(1, 3), true);
        },
        'tile solid_at reads free world point'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map(map);
            $mol_assert_equal(tile.solid_at(1.5, -1.5), false);
        },
        'tile solid_at reads wall world point'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map(map);
            $mol_assert_equal(tile.solid_at(0.5, -0.5), true);
        },
        'step_ms is zero before the first step and a time after it'() {
            const phys = new $bog_gamengine_phys;
            $mol_assert_equal(phys.step_ms(), 0);
            phys.step(1 / 60);
            $mol_assert_equal(phys.samples, 1);
            $mol_assert_ok(phys.step_ms() >= 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'add writes sum into out'() {
            const out = new Float32Array(2);
            const res = $bog_gamengine_vec_add(out, new Float32Array([1, 2]), new Float32Array([3, 5]));
            $mol_assert_equal(res, out);
            $mol_assert_equal([...out], [4, 7]);
        },
        'sub writes difference into out shared with a'() {
            const a = new Float32Array([5, 7, 9]);
            const res = $bog_gamengine_vec_sub(a, a, new Float32Array([1, 2, 3]));
            $mol_assert_equal(res, a);
            $mol_assert_equal([...a], [4, 5, 6]);
        },
        'scale multiplies by scalar'() {
            const out = new Float32Array(3);
            const res = $bog_gamengine_vec_scale(out, new Float32Array([1, -2, 3]), 2);
            $mol_assert_equal(res, out);
            $mol_assert_equal([...out], [2, -4, 6]);
        },
        'len is euclidean length'() {
            $mol_assert_equal($bog_gamengine_vec_len(new Float32Array([3, 4])), 5);
            $mol_assert_equal($bog_gamengine_vec_len(new Float32Array([2, 3, 6])), 7);
        },
        'norm gives unit vector'() {
            const out = new Float32Array(2);
            const res = $bog_gamengine_vec_norm(out, new Float32Array([0, -5]));
            $mol_assert_equal(res, out);
            $mol_assert_equal([...out], [0, -1]);
        },
        'dot is scalar product'() {
            $mol_assert_equal($bog_gamengine_vec_dot(new Float32Array([1, 2, 3]), new Float32Array([4, 5, 6])), 32);
        },
        'cross of x and y is z'() {
            const out = new Float32Array(3);
            const res = $bog_gamengine_vec_cross(out, new Float32Array([1, 0, 0]), new Float32Array([0, 1, 0]));
            $mol_assert_equal(res, out);
            $mol_assert_equal([...out], [0, 0, 1]);
        },
        'lerp interpolates into out shared with b'() {
            const b = new Float32Array([10, 20]);
            const res = $bog_gamengine_vec_lerp(b, new Float32Array([0, 0]), b, 0.25);
            $mol_assert_equal(res, b);
            $mol_assert_equal([...b], [2.5, 5]);
        },
        'mat4_apply multiplies column-major matrix by vec4'() {
            const out = new Float32Array(4);
            const m = $mol_3d_mat4.translation([10, 20, 30]);
            const res = $bog_gamengine_vec_mat4_apply(out, m, new Float32Array([1, 2, 3, 1]));
            $mol_assert_equal(res, out);
            $mol_assert_equal([...out], [11, 22, 33, 1]);
        },
        'quat_rotate by half pi around Y sends x to minus z'() {
            const q = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 1, 0]), Math.PI / 2);
            const out = $bog_gamengine_vec_quat_rotate(new Float32Array(3), q, new Float32Array([1, 0, 0]));
            $mol_assert_ok(Math.abs(out[0]) < 1e-6);
            $mol_assert_ok(Math.abs(out[1]) < 1e-6);
            $mol_assert_ok(Math.abs(out[2] + 1) < 1e-6);
        },
        'quat_mul of two quarter turns around Y is a half turn'() {
            const q = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 1, 0]), Math.PI / 2);
            const qq = $bog_gamengine_vec_quat_mul(new Float32Array(4), q, q);
            const out = $bog_gamengine_vec_quat_rotate(new Float32Array(3), qq, new Float32Array([1, 0, 0]));
            $mol_assert_ok(Math.abs(out[0] + 1) < 1e-6);
            $mol_assert_ok(Math.abs(out[2]) < 1e-6);
        },
        'quat_identity leaves vector as is'() {
            const q = $bog_gamengine_vec_quat_identity(new Float32Array(4));
            const out = $bog_gamengine_vec_quat_rotate(new Float32Array(3), q, new Float32Array([1, 2, 3]));
            $mol_assert_equal([...out], [1, 2, 3]);
        },
        'quat_normalize gives unit length'() {
            const out = $bog_gamengine_vec_quat_normalize(new Float32Array(4), new Float32Array([0, 3, 0, 4]));
            $mol_assert_ok(Math.abs(out[1] - 0.6) < 1e-6);
            $mol_assert_ok(Math.abs(out[3] - 0.8) < 1e-6);
        },
        'quat_from_euler to_mat4 matches mat4 translation rotation ZYX scaling for random angles'() {
            for (let trial = 0; trial < 20; ++trial) {
                const x = (Math.random() - 0.5) * 6;
                const y = (Math.random() - 0.5) * 6;
                const z = (Math.random() - 0.5) * 6;
                const pos = new Float32Array([1, 2, 3]);
                const scale = new Float32Array([1, 2, 0.5]);
                const q = $bog_gamengine_vec_quat_from_euler(new Float32Array(4), x, y, z);
                const out = $bog_gamengine_vec_quat_to_mat4(new Float32Array(16), q, pos, scale);
                const ref = $mol_3d_mat4.multiply($mol_3d_mat4.translation(pos), $mol_3d_mat4.rotation([0, 0, 1], z), $mol_3d_mat4.rotation([0, 1, 0], y), $mol_3d_mat4.rotation([1, 0, 0], x), $mol_3d_mat4.scaling(scale));
                for (let i = 0; i < 16; ++i)
                    $mol_assert_ok(Math.abs(out[i] - ref[i]) < 1e-5);
            }
        },
        'quat_to_euler inverts from_euler'() {
            const q = $bog_gamengine_vec_quat_from_euler(new Float32Array(4), 0.3, -0.5, 1.2);
            const out = $bog_gamengine_vec_quat_to_euler(new Float32Array(3), q);
            $mol_assert_ok(Math.abs(out[0] - 0.3) < 1e-6);
            $mol_assert_ok(Math.abs(out[1] + 0.5) < 1e-6);
            $mol_assert_ok(Math.abs(out[2] - 1.2) < 1e-6);
        },
        'quat_integrate one second at half pi around Y turns x to minus z'() {
            const q = $bog_gamengine_vec_quat_identity(new Float32Array(4));
            const ang = new Float32Array([0, Math.PI / 2, 0]);
            for (let i = 0; i < 60; ++i)
                $bog_gamengine_vec_quat_integrate(q, q, ang, 1 / 60);
            const out = $bog_gamengine_vec_quat_rotate(new Float32Array(3), q, new Float32Array([1, 0, 0]));
            $mol_assert_ok(Math.abs(out[0]) < 1e-3);
            $mol_assert_ok(Math.abs(out[2] + 1) < 1e-3);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function box(world, mass, x, y, z) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), mass, new Float32Array([x, y, z])));
    }
    $mol_test({
        'add two bodies gives indices 0 and 1 and count 2'() {
            const world = new $bog_gamengine_phys3;
            $mol_assert_equal(box(world, 1, 0, 0, 0), 0);
            $mol_assert_equal(box(world, 1, 0, 0, 0), 1);
            $mol_assert_equal(world.count, 2);
        },
        'remove first moves second into its place and returns 1'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 1, 1, 1);
            box(world, 2, 5, 6, 7);
            $mol_assert_equal(world.remove(world.handle_of(0)), true);
            $mol_assert_equal(world.count, 1);
            $mol_assert_equal([...world.pos.subarray(0, 3)], [5, 6, 7]);
            $mol_assert_equal(world.mass[0], 2);
            $mol_assert_equal([...world.trans.subarray(12, 15)], [5, 6, 7]);
        },
        'handle of a neighbour survives removal of the body between them'() {
            const world = new $bog_gamengine_phys3;
            const a = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array([1, 0, 0]));
            const b = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array([2, 0, 0]));
            const c = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array([3, 0, 0]));
            $mol_assert_equal(world.remove(b), true);
            $mol_assert_equal(world.count, 2);
            $mol_assert_equal(world.index_of(b), -1);
            $mol_assert_equal(world.pos_of(a)[0], 1);
            $mol_assert_equal(world.pos_of(c)[0], 3);
            $mol_assert_equal(world.handle_of(world.index_of(c)), c);
        },
        'removed handle is not answered twice'() {
            const world = new $bog_gamengine_phys3;
            const a = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array(3));
            $mol_assert_equal(world.remove(a), true);
            $mol_assert_equal(world.remove(a), false);
            $mol_assert_equal(world.pos_of(a), null);
        },
        'move updates bounds and trans within the same step'() {
            const world = new $bog_gamengine_phys3;
            const a = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 0, new Float32Array(3));
            world.move(a, new Float32Array([5, 0, 0]));
            const i = world.index_of(a);
            $mol_assert_equal([...world.aabb.subarray(i * 6, i * 6 + 6)], [4.5, -0.5, -0.5, 5.5, 0.5, 0.5]);
            $mol_assert_equal([...world.trans.subarray(i * 16 + 12, i * 16 + 15)], [5, 0, 0]);
        },
        'kinematic body carries a box along and does not fall'() {
            const world = new $bog_gamengine_phys3;
            const plate = world.add($bog_gamengine_phys3.shape_box, new Float32Array([2, 0.25, 2]), 0, new Float32Array(3));
            world.kinematic_of(plate, true);
            const cargo = box(world, 1, 0, 0.76, 0);
            world.vel[world.index_of(plate) * 3] = 1;
            for (let k = 0; k < 60; ++k)
                world.step(1 / 60);
            const at = world.pos_of(plate);
            $mol_assert_ok(Math.abs(at[0] - 1) < 0.05);
            $mol_assert_equal(at[1], 0);
            $mol_assert_ok(world.pos[cargo * 3] > 0.5);
        },
        'body with mass falls about 4.9 in one second'() {
            const world = new $bog_gamengine_phys3;
            const i = box(world, 1, 0, 0, 0);
            for (let k = 0; k < 60; ++k)
                world.step(1 / 60);
            $mol_assert_ok(Math.abs(world.pos[i * 3 + 1] + 4.9) < 0.2);
        },
        'body without mass stays still under gravity'() {
            const world = new $bog_gamengine_phys3;
            const i = box(world, 0, 1, 2, 3);
            for (let k = 0; k < 60; ++k)
                world.step(1 / 60);
            $mol_assert_equal([...world.pos.subarray(i * 3, i * 3 + 3)], [1, 2, 3]);
            $mol_assert_equal(world.inv_mass[i], 0);
        },
        'trans of body at (1,2,3) keeps translation in 12 to 14'() {
            const world = new $bog_gamengine_phys3;
            const i = box(world, 1, 1, 2, 3);
            $mol_assert_equal([...world.trans.subarray(i * 16 + 12, i * 16 + 15)], [1, 2, 3]);
        },
        'trans scales unit box to full size'() {
            const world = new $bog_gamengine_phys3;
            const i = world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([1, 2, 3]), 1, new Float32Array(3)));
            $mol_assert_equal(world.trans[i * 16], 2);
            $mol_assert_equal(world.trans[i * 16 + 5], 4);
            $mol_assert_equal(world.trans[i * 16 + 10], 6);
        },
        'angular velocity turns body a quarter around Y in one second'() {
            const world = new $bog_gamengine_phys3;
            const i = box(world, 1, 0, 0, 0);
            world.gravity(new Float32Array(3));
            world.ang[i * 3 + 1] = Math.PI / 2;
            for (let k = 0; k < 60; ++k)
                world.step(1 / 60);
            const out = $bog_gamengine_vec_quat_rotate(new Float32Array(3), world.rot.subarray(i * 4, i * 4 + 4), new Float32Array([1, 0, 0]));
            $mol_assert_ok(Math.abs(out[2] + 1) < 1e-3);
        },
        'sleeping body is skipped'() {
            const world = new $bog_gamengine_phys3;
            const i = box(world, 1, 0, 0, 0);
            world.flags[i] |= $bog_gamengine_phys3.flag_sleep;
            world.step(1);
            $mol_assert_equal(world.pos[i * 3 + 1], 0);
        },
        'growing cap keeps data'() {
            const world = new $bog_gamengine_phys3;
            for (let k = 0; k < 20; ++k)
                box(world, k + 1, k, 0, 0);
            $mol_assert_equal(world.cap, 32);
            $mol_assert_equal(world.pos[3 * 3], 3);
            $mol_assert_equal(world.mass[17], 18);
            $mol_assert_equal(world.rot[17 * 4 + 3], 1);
            $mol_assert_equal(world.trans[17 * 16 + 12], 17);
        },
        'sphere and box inverse inertia follow standard formulas'() {
            const world = new $bog_gamengine_phys3;
            const s = world.index_of(world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([2, 0, 0]), 5, new Float32Array(3)));
            $mol_assert_ok(Math.abs(world.inv_inertia[s * 3] - 1 / (0.4 * 5 * 4)) < 1e-6);
            const b = world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([1, 2, 3]), 3, new Float32Array(3)));
            $mol_assert_ok(Math.abs(world.inv_inertia[b * 3] - 1 / (3 / 12 * (16 + 36))) < 1e-6);
        },
        'hull_points stores points with offset and count per body'() {
            const world = new $bog_gamengine_phys3;
            const a = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array(3), 1, new Float32Array(3)));
            const b = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array(3), 1, new Float32Array(3)));
            world.hull_points(a, new Float32Array([0, 0, 0, 1, 0, 0]));
            world.hull_points(b, new Float32Array([0, 1, 0, 0, 0, 1, 1, 1, 1]));
            $mol_assert_equal(world.hull_off[b], 6);
            $mol_assert_equal(world.hull_count[b], 3);
            $mol_assert_equal([...world.hull.subarray(6, 9)], [0, 1, 0]);
        },
        'hull of four tetrahedron points gives aabb by these points'() {
            const world = new $bog_gamengine_phys3;
            const a = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array(3), 1, new Float32Array(3)));
            const b = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array(3), 1, new Float32Array([10, 20, 30])));
            world.hull_points(a, new Float32Array([5, 5, 5, 6, 6, 6]));
            world.hull_points(b, new Float32Array([0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3]));
            $mol_assert_equal([...world.aabb.subarray(b * 6, b * 6 + 6)], [10, 20, 30, 11, 22, 33]);
        },
        'step of 0.1 equals six steps of 1/60 for a box over the floor'() {
            const one = new $bog_gamengine_phys3;
            const six = new $bog_gamengine_phys3;
            for (const world of [one, six]) {
                world.max_steps = 6;
                world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3));
                box(world, 1, 0, 0.6, 0);
            }
            one.step(0.1);
            for (let k = 0; k < 6; ++k)
                six.step(1 / 60);
            $mol_assert_equal(one.steps_done, 6);
            for (let n = 0; n < 6; ++n)
                $mol_assert_ok(Math.abs(one.pos[n] - six.pos[n]) < 1e-6);
            for (let n = 0; n < 6; ++n)
                $mol_assert_ok(Math.abs(one.vel[n] - six.vel[n]) < 1e-6);
        },
        'step of 1 makes at most four substeps and drops the debt'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            world.step(1);
            $mol_assert_equal(world.steps_done, 4);
            world.step(0);
            $mol_assert_equal(world.steps_done, 1);
            world.step(0);
            $mol_assert_equal(world.steps_done, 0);
        },
        'step_ms is zero before the first step and a time after it'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            $mol_assert_equal(world.step_ms(), 0);
            world.step(1 / 60);
            $mol_assert_equal(world.samples, 1);
            $mol_assert_ok(world.step_ms() >= 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_particle_pool extends $mol_object2 {
        cap(next = 1000) {
            return next;
        }
        count = 0;
        pos = new Float32Array(0);
        vel = new Float32Array(0);
        age = new Float32Array(0);
        life = new Float32Array(0);
        size = new Float32Array(0);
        seed = new Float32Array(0);
        trans = new Float32Array(0);
        tint = new Float32Array(0);
        layer = new Float32Array(0);
        uv = new Float32Array(0);
        aabb = new Float32Array(0);
        fit() {
            const cap = this.cap();
            if (this.age.length === cap)
                return cap;
            this.pos = new Float32Array(cap * 3);
            this.vel = new Float32Array(cap * 3);
            this.age = new Float32Array(cap);
            this.life = new Float32Array(cap);
            this.size = new Float32Array(cap);
            this.seed = new Float32Array(cap);
            this.trans = new Float32Array(cap * 16);
            this.tint = new Float32Array(cap * 4);
            this.layer = new Float32Array(cap);
            this.uv = new Float32Array(cap * 4);
            this.aabb = new Float32Array(cap * 6);
            const uv = this.uv;
            for (let i = 0; i < cap; ++i) {
                uv[i * 4 + 2] = 1;
                uv[i * 4 + 3] = 1;
            }
            this.count = 0;
            return cap;
        }
        kill(index) {
            const last = --this.count;
            if (index === last)
                return;
            this.pos.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.vel.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.age[index] = this.age[last];
            this.life[index] = this.life[last];
            this.size[index] = this.size[last];
            this.seed[index] = this.seed[last];
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle_pool.prototype, "cap", null);
    $.$bog_gamengine_particle_pool = $bog_gamengine_particle_pool;
    class $bog_gamengine_particle extends $bog_gamengine_node {
        pool(next) {
            return next ?? new $bog_gamengine_particle_pool;
        }
        atlas(next) {
            return next ?? null;
        }
        is_source() {
            return true;
        }
        source() {
            return this.pool();
        }
        rate(next = 0) {
            return next;
        }
        life(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        speed(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        spread(next = 0) {
            return next;
        }
        dir(next) {
            return next ? $bog_gamengine_node_vec(next) : null;
        }
        gravity(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0, 0]);
        }
        size(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        color(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1, 1, 1, 1, 1, 1]);
        }
        frame(next = '') {
            return next;
        }
        frames(next) {
            return next ?? [];
        }
        world_space(next = true) {
            return next;
        }
        seed(next = 1) {
            return next;
        }
        props() {
            return [
                ...super.props(),
                { name: 'rate', kind: 'number', get: () => this.rate(), set: next => this.rate(next) },
                { name: 'life', kind: 'vec2', get: () => this.life(), set: next => this.life(next) },
                { name: 'speed', kind: 'vec2', get: () => this.speed(), set: next => this.speed(next) },
                { name: 'spread', kind: 'number', get: () => this.spread(), set: next => this.spread(next) },
                { name: 'gravity', kind: 'vec3', get: () => this.gravity(), set: next => this.gravity(next) },
                { name: 'size', kind: 'vec2', get: () => this.size(), set: next => this.size(next) },
                { name: 'frame', kind: 'frame', get: () => this.frame(), set: next => this.frame(next) },
                { name: 'billboard', kind: 'flag', get: () => this.billboard(), set: next => this.billboard(next) },
                { name: 'world_space', kind: 'flag', get: () => this.world_space(), set: next => this.world_space(next) },
            ];
        }
        layers() {
            const atlas = this.atlas();
            const frames = this.frames();
            const frame = this.frame();
            const list = new Float32Array(Math.max(1, frames.length));
            if (!atlas)
                return list;
            if (frames.length) {
                for (let i = 0; i < frames.length; ++i)
                    list[i] = atlas.layer(frames[i]);
            }
            else if (frame) {
                list[0] = atlas.layer(frame);
            }
            return list;
        }
        rand_state = 0;
        rand_seed = NaN;
        accum = 0;
        origin = new Float32Array(3);
        axis = new Float32Array(3);
        side = new Float32Array(3);
        up = new Float32Array(3);
        basis = new Float32Array(9);
        local = new Float32Array(16);
        rand() {
            const seed = this.seed();
            if (seed !== this.rand_seed) {
                this.rand_seed = seed;
                this.rand_state = seed | 0;
            }
            let t = this.rand_state = (this.rand_state + 0x6D2B79F5) | 0;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        }
        frame_of(world) {
            const axis = this.axis;
            const dir = this.dir();
            if (this.world_space()) {
                if (dir) {
                    axis[0] = world[0] * dir[0] + world[4] * dir[1] + world[8] * dir[2];
                    axis[1] = world[1] * dir[0] + world[5] * dir[1] + world[9] * dir[2];
                    axis[2] = world[2] * dir[0] + world[6] * dir[1] + world[10] * dir[2];
                }
                else {
                    axis[0] = -world[8];
                    axis[1] = -world[9];
                    axis[2] = -world[10];
                }
            }
            else if (dir) {
                axis[0] = dir[0];
                axis[1] = dir[1];
                axis[2] = dir[2];
            }
            else {
                axis[0] = 0;
                axis[1] = 0;
                axis[2] = -1;
            }
            $bog_gamengine_vec_norm(axis, axis);
            const side = this.side;
            const up = this.up;
            const ax = Math.abs(axis[0]);
            up[0] = ax < 0.9 ? 1 : 0;
            up[1] = ax < 0.9 ? 0 : 1;
            up[2] = 0;
            $bog_gamengine_vec_cross(side, up, axis);
            $bog_gamengine_vec_norm(side, side);
            $bog_gamengine_vec_cross(up, axis, side);
        }
        spawn(n, at = null) {
            const pool = this.pool();
            const cap = pool.fit();
            const world = this.world();
            const origin = this.origin;
            if (at) {
                origin[0] = at[0];
                origin[1] = at[1];
                origin[2] = at[2];
            }
            else if (this.world_space()) {
                origin[0] = world[12];
                origin[1] = world[13];
                origin[2] = world[14];
            }
            else {
                origin[0] = 0;
                origin[1] = 0;
                origin[2] = 0;
            }
            this.frame_of(world);
            const axis = this.axis;
            const side = this.side;
            const up = this.up;
            const life = this.life();
            const speed = this.speed();
            const size = this.size();
            const cos_min = Math.cos(Math.min(Math.PI, this.spread()));
            const pos = pool.pos;
            const vel = pool.vel;
            const seed = pool.seed;
            let count = pool.count;
            for (let k = 0; k < n && count < cap; ++k) {
                const i = count++;
                const phi = this.rand() * Math.PI * 2;
                const cos = cos_min + (1 - cos_min) * this.rand();
                const sin = Math.sqrt(Math.max(0, 1 - cos * cos));
                const v = speed[0] + (speed[1] - speed[0]) * this.rand();
                const sx = Math.cos(phi) * sin;
                const sy = Math.sin(phi) * sin;
                pos[i * 3] = origin[0];
                pos[i * 3 + 1] = origin[1];
                pos[i * 3 + 2] = origin[2];
                vel[i * 3] = (axis[0] * cos + side[0] * sx + up[0] * sy) * v;
                vel[i * 3 + 1] = (axis[1] * cos + side[1] * sx + up[1] * sy) * v;
                vel[i * 3 + 2] = (axis[2] * cos + side[2] * sx + up[2] * sy) * v;
                pool.age[i] = 0;
                pool.life[i] = life[0] + (life[1] - life[0]) * this.rand();
                pool.size[i] = size[0];
                seed[i] = this.rand();
            }
            pool.count = count;
            return count;
        }
        burst(n, at = null) {
            this.spawn(n, at);
            this.emit();
            return this.pool().count;
        }
        integrate(dt) {
            const pool = this.pool();
            const gravity = this.gravity();
            const gx = gravity[0] * dt;
            const gy = gravity[1] * dt;
            const gz = gravity[2] * dt;
            const pos = pool.pos;
            const vel = pool.vel;
            const age = pool.age;
            const life = pool.life;
            for (let i = 0; i < pool.count; ++i) {
                age[i] += dt;
                if (age[i] >= life[i]) {
                    pool.kill(i);
                    --i;
                    continue;
                }
                vel[i * 3] += gx;
                vel[i * 3 + 1] += gy;
                vel[i * 3 + 2] += gz;
                pos[i * 3] += vel[i * 3] * dt;
                pos[i * 3 + 1] += vel[i * 3 + 1] * dt;
                pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
            }
        }
        emit() {
            const pool = this.pool();
            const world_space = this.world_space();
            const world = this.world();
            const size = this.size();
            const color = this.color();
            const layers = this.layers();
            const basis = this.basis;
            const cam = this.billboard() ? this.scene()?.cam() ?? null : null;
            if (cam) {
                const view = cam.world();
                for (let c = 0; c < 3; ++c) {
                    const x = view[c * 4];
                    const y = view[c * 4 + 1];
                    const z = view[c * 4 + 2];
                    const k = 1 / (Math.sqrt(x * x + y * y + z * z) || 1);
                    basis[c * 3] = x * k;
                    basis[c * 3 + 1] = y * k;
                    basis[c * 3 + 2] = z * k;
                }
            }
            else {
                basis.fill(0);
                basis[0] = 1;
                basis[4] = 1;
                basis[8] = 1;
            }
            const local = this.local;
            const scale_world = world_space ? 1 : $bog_gamengine_batch_scale_max(world);
            const trans = pool.trans;
            const tint = pool.tint;
            const layer = pool.layer;
            const aabb = pool.aabb;
            const pos = pool.pos;
            const age = pool.age;
            const life = pool.life;
            const sizes = pool.size;
            const last = layers.length - 1;
            for (let i = 0; i < pool.count; ++i) {
                const t = life[i] > 0 ? Math.min(1, age[i] / life[i]) : 1;
                const s = size[0] + (size[1] - size[0]) * t;
                sizes[i] = s;
                for (let k = 0; k < 4; ++k)
                    tint[i * 4 + k] = color[k] + (color[4 + k] - color[k]) * t;
                layer[i] = layers[Math.min(last, Math.floor(t * layers.length))];
                const out = world_space ? trans : local;
                const at = world_space ? i * 16 : 0;
                for (let c = 0; c < 3; ++c) {
                    out[at + c * 4] = basis[c * 3] * s;
                    out[at + c * 4 + 1] = basis[c * 3 + 1] * s;
                    out[at + c * 4 + 2] = basis[c * 3 + 2] * s;
                    out[at + c * 4 + 3] = 0;
                }
                out[at + 12] = pos[i * 3];
                out[at + 13] = pos[i * 3 + 1];
                out[at + 14] = pos[i * 3 + 2];
                out[at + 15] = 1;
                if (!world_space)
                    $bog_gamengine_particle_mat_mul(trans, i * 16, world, local);
                const r = s * scale_world * Math.SQRT1_2;
                const x = trans[i * 16 + 12];
                const y = trans[i * 16 + 13];
                const z = trans[i * 16 + 14];
                aabb[i * 6] = x - r;
                aabb[i * 6 + 1] = y - r;
                aabb[i * 6 + 2] = z - r;
                aabb[i * 6 + 3] = x + r;
                aabb[i * 6 + 4] = y + r;
                aabb[i * 6 + 5] = z + r;
            }
        }
        step(dt) {
            const pool = this.pool();
            pool.fit();
            this.accum += this.rate() * dt;
            const born = Math.floor(this.accum);
            if (born > 0) {
                this.accum -= born;
                this.spawn(born);
            }
            this.integrate(dt);
            this.emit();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "pool", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "rate", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "life", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "speed", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "spread", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "dir", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "gravity", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "color", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "frames", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "world_space", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "seed", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "layers", null);
    $.$bog_gamengine_particle = $bog_gamengine_particle;
    function $bog_gamengine_particle_mat_mul(out, at, a, b) {
        for (let c = 0; c < 4; ++c) {
            const b0 = b[c * 4];
            const b1 = b[c * 4 + 1];
            const b2 = b[c * 4 + 2];
            const b3 = b[c * 4 + 3];
            for (let r = 0; r < 4; ++r) {
                out[at + c * 4 + r] = a[r] * b0 + a[4 + r] * b1 + a[8 + r] * b2 + a[12 + r] * b3;
            }
        }
        return out;
    }
    $.$bog_gamengine_particle_mat_mul = $bog_gamengine_particle_mat_mul;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_particle_test_emitter(rate, life) {
        const emitter = new $bog_gamengine_particle;
        emitter.rate(rate);
        emitter.life(new Float32Array([life, life]));
        return emitter;
    }
    function $bog_gamengine_particle_test_run(emitter, seconds, steps = 60) {
        const dt = 1 / steps;
        for (let i = 0; i < Math.round(seconds * steps); ++i)
            emitter.step(dt);
        return emitter.pool().count;
    }
    $mol_test({
        'rate 100 for a second with life 2 keeps about 100 alive'() {
            const count = $bog_gamengine_particle_test_run($bog_gamengine_particle_test_emitter(100, 2), 1);
            $mol_assert_ok(count >= 95 && count <= 105);
        },
        'rate 100 for a second with life 0.5 keeps about 50 alive'() {
            const count = $bog_gamengine_particle_test_run($bog_gamengine_particle_test_emitter(100, 0.5), 1);
            $mol_assert_ok(count >= 45 && count <= 55);
        },
        'burst of 20 gives 20 at once'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 1);
            $mol_assert_equal(emitter.burst(20), 20);
            $mol_assert_equal(emitter.pool().count, 20);
        },
        'particles die by age so after life count drops to zero'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 0.5);
            emitter.burst(10);
            $bog_gamengine_particle_test_run(emitter, 0.6);
            $mol_assert_equal(emitter.pool().count, 0);
        },
        'gravity lowers the mean position'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 10);
            emitter.speed(new Float32Array([0, 0]));
            emitter.gravity(new Float32Array([0, -10, 0]));
            emitter.burst(50);
            $bog_gamengine_particle_test_run(emitter, 0.5);
            const pool = emitter.pool();
            let sum = 0;
            for (let i = 0; i < pool.count; ++i)
                sum += pool.pos[i * 3 + 1];
            $mol_assert_ok(sum / pool.count < -1);
        },
        'color and size are halfway at half life'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 1);
            emitter.speed(new Float32Array([0, 0]));
            emitter.color(new Float32Array([1, 0, 0, 1, 0, 0, 1, 0]));
            emitter.size(new Float32Array([1, 0]));
            emitter.burst(1);
            emitter.step(0.5);
            const pool = emitter.pool();
            $mol_assert_equal([...pool.tint.subarray(0, 4)], [0.5, 0, 0.5, 0.5]);
            $mol_assert_equal(pool.trans[0], 0.5);
            $mol_assert_equal(pool.trans[5], 0.5);
            $mol_assert_equal(pool.size[0], 0.5);
        },
        'aabb covers every particle'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 10);
            emitter.spread(Math.PI);
            emitter.speed(new Float32Array([1, 3]));
            emitter.burst(100);
            $bog_gamengine_particle_test_run(emitter, 0.5);
            const pool = emitter.pool();
            for (let i = 0; i < pool.count; ++i) {
                for (let k = 0; k < 3; ++k) {
                    const at = pool.pos[i * 3 + k];
                    $mol_assert_ok(at >= pool.aabb[i * 6 + k] && at <= pool.aabb[i * 6 + 3 + k]);
                }
            }
        },
        'count never exceeds cap'() {
            const emitter = $bog_gamengine_particle_test_emitter(1000, 10);
            emitter.pool().cap(10);
            emitter.burst(50);
            $mol_assert_equal(emitter.pool().count, 10);
            $bog_gamengine_particle_test_run(emitter, 1);
            $mol_assert_equal(emitter.pool().count, 10);
        },
        'frames switch layer by age through the atlas'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['x/a.png', 'x/b.png']);
            const emitter = $bog_gamengine_particle_test_emitter(0, 1);
            emitter.atlas(atlas);
            emitter.frames(['a', 'b']);
            emitter.burst(1);
            emitter.step(0.25);
            $mol_assert_equal(emitter.pool().layer[0], 0);
            emitter.step(0.5);
            $mol_assert_equal(emitter.pool().layer[0], 1);
        },
        'local space particles follow the emitter, world space ones stay'() {
            const local = $bog_gamengine_particle_test_emitter(0, 10);
            local.world_space(false);
            local.speed(new Float32Array([0, 0]));
            local.pos(new Float32Array([5, 0, 0]));
            local.burst(1);
            local.pos(new Float32Array([7, 0, 0]));
            local.step(0);
            $mol_assert_equal(local.pool().trans[12], 7);
            const world = $bog_gamengine_particle_test_emitter(0, 10);
            world.speed(new Float32Array([0, 0]));
            world.pos(new Float32Array([5, 0, 0]));
            world.burst(1);
            world.pos(new Float32Array([7, 0, 0]));
            world.step(0);
            $mol_assert_equal(world.pool().trans[12], 5);
        },
        'billboard takes rotation from the scene camera'() {
            const scene = new $bog_gamengine_scene;
            const cam = new $bog_gamengine_cam;
            cam.rot(new Float32Array([0, Math.PI / 2, 0]));
            scene.cam(cam);
            const emitter = $bog_gamengine_particle_test_emitter(0, 10);
            emitter.billboard(true);
            emitter.speed(new Float32Array([0, 0]));
            scene.kids([emitter]);
            emitter.burst(1);
            const trans = emitter.pool().trans;
            $mol_assert_ok(Math.abs(trans[0]) < 1e-6);
            $mol_assert_equal(Math.round(trans[2] * 1e6) / 1e6, -1);
            $mol_assert_equal(Math.round(trans[5] * 1e6) / 1e6, 1);
        },
        'spread zero sends every particle along minus z of the emitter'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 10);
            emitter.speed(new Float32Array([2, 2]));
            emitter.burst(5);
            const vel = emitter.pool().vel;
            for (let i = 0; i < 5; ++i) {
                $mol_assert_ok(Math.abs(vel[i * 3]) < 1e-6);
                $mol_assert_ok(Math.abs(vel[i * 3 + 1]) < 1e-6);
                $mol_assert_ok(Math.abs(vel[i * 3 + 2] + 2) < 1e-6);
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_tilemap_pool extends $mol_object2 {
        cap = 0;
        count = 0;
        trans = new Float32Array(0);
        tint = new Float32Array(0);
        layer = new Float32Array(0);
        uv = new Float32Array(0);
        aabb = new Float32Array(0);
        fit(need) {
            if (need <= this.cap)
                return this.cap;
            let cap = Math.max(this.cap, 16);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.trans = new Float32Array(cap * 16);
            this.tint = new Float32Array(cap * 4);
            this.layer = new Float32Array(cap);
            this.uv = new Float32Array(cap * 4);
            this.aabb = new Float32Array(cap * 6);
            const uv = this.uv;
            for (let i = 0; i < cap; ++i) {
                uv[i * 4 + 2] = 1;
                uv[i * 4 + 3] = 1;
            }
            return cap;
        }
    }
    $.$bog_gamengine_tilemap_pool = $bog_gamengine_tilemap_pool;
    class $bog_gamengine_tilemap extends $bog_gamengine_node {
        pool(next) {
            return next ?? new $bog_gamengine_tilemap_pool;
        }
        is_source() {
            return true;
        }
        source() {
            return this.pool();
        }
        tile(next) {
            return next ?? null;
        }
        palette(next) {
            return next ?? {};
        }
        atlas(next) {
            return next ?? null;
        }
        size(next = 1) {
            return next;
        }
        props() {
            return [
                ...super.props(),
                { name: 'size', kind: 'number', get: () => this.size(), set: next => this.size(next) },
            ];
        }
        done_map = null;
        done_size = NaN;
        done_palette = null;
        done_world = new Float32Array(16);
        done_tint = new Float32Array(4);
        fresh(map, world, size, palette, tint) {
            let same = map === this.done_map && size === this.done_size && palette === this.done_palette;
            const done_world = this.done_world;
            for (let i = 0; i < 16; ++i) {
                if (world[i] !== done_world[i])
                    same = false;
                done_world[i] = world[i];
            }
            const done_tint = this.done_tint;
            for (let i = 0; i < 4; ++i) {
                if (tint[i] !== done_tint[i])
                    same = false;
                done_tint[i] = tint[i];
            }
            this.done_map = map;
            this.done_size = size;
            this.done_palette = palette;
            return same;
        }
        cell = new Float32Array(3);
        emit() {
            const pool = this.pool();
            const tile = this.tile();
            const world = this.world();
            const size = this.size();
            const palette = this.palette();
            const tint = this.tint();
            const atlas = this.atlas();
            if (!tile) {
                pool.count = 0;
                return 0;
            }
            if (this.fresh(tile.map(), world, size, palette, tint))
                return pool.count;
            const rows = tile.rows();
            let need = 0;
            for (let y = 0; y < rows.length; ++y) {
                const row = rows[y];
                for (let x = 0; x < row.length; ++x) {
                    if (palette[row[x]] !== undefined)
                        ++need;
                }
            }
            pool.fit(need);
            const trans = pool.trans;
            const tints = pool.tint;
            const layer = pool.layer;
            const aabb = pool.aabb;
            const cell = this.cell;
            const radius = size * $bog_gamengine_batch_scale_max(world) * Math.SQRT1_2;
            let count = 0;
            for (let y = 0; y < rows.length; ++y) {
                const row = rows[y];
                for (let x = 0; x < row.length; ++x) {
                    const frame = palette[row[x]];
                    if (frame === undefined)
                        continue;
                    tile.cell_pos(x, y, cell);
                    const at = count * 16;
                    for (let r = 0; r < 4; ++r) {
                        trans[at + r] = world[r] * size;
                        trans[at + 4 + r] = world[4 + r] * size;
                        trans[at + 8 + r] = world[8 + r];
                        trans[at + 12 + r] = world[12 + r] + world[r] * cell[0] + world[4 + r] * cell[1];
                    }
                    for (let k = 0; k < 4; ++k)
                        tints[count * 4 + k] = tint[k];
                    layer[count] = atlas ? atlas.layer(frame) : 0;
                    const wx = trans[at + 12];
                    const wy = trans[at + 13];
                    const wz = trans[at + 14];
                    aabb[count * 6] = wx - radius;
                    aabb[count * 6 + 1] = wy - radius;
                    aabb[count * 6 + 2] = wz - radius;
                    aabb[count * 6 + 3] = wx + radius;
                    aabb[count * 6 + 4] = wy + radius;
                    aabb[count * 6 + 5] = wz + radius;
                    ++count;
                }
            }
            pool.count = count;
            return count;
        }
        box = new Float32Array(6);
        aabb() {
            const box = this.box;
            const tile = this.tile();
            if (!tile) {
                box.fill(0);
                return box;
            }
            const world = this.world();
            const size = this.size();
            const half = size / 2;
            const left = 0.5 - half;
            const right = tile.width() - 0.5 + half;
            const top = -0.5 + half;
            const bottom = -tile.height() + 0.5 - half;
            for (let k = 0; k < 3; ++k) {
                box[k] = Infinity;
                box[k + 3] = -Infinity;
            }
            for (let i = 0; i < 4; ++i) {
                const x = i & 1 ? right : left;
                const y = i & 2 ? top : bottom;
                for (let k = 0; k < 3; ++k) {
                    const value = world[12 + k] + world[k] * x + world[4 + k] * y;
                    if (value < box[k])
                        box[k] = value;
                    if (value > box[k + 3])
                        box[k + 3] = value;
                }
            }
            return box;
        }
        step(dt) {
            this.emit();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_tilemap.prototype, "pool", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_tilemap.prototype, "tile", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_tilemap.prototype, "palette", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_tilemap.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_tilemap.prototype, "size", null);
    $.$bog_gamengine_tilemap = $bog_gamengine_tilemap;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_tilemap_test_atlas() {
        const atlas = new $bog_gamengine_atlas;
        atlas.sources(['wall', 'floor'].map(name => ({ name, image: { width: 64, height: 64 } })));
        return atlas;
    }
    function $bog_gamengine_tilemap_test_make(map = '#.#\n..#') {
        const tile = new $bog_gamengine_phys_tile;
        tile.map(map);
        const node = new $bog_gamengine_tilemap;
        node.tile(tile);
        node.atlas($bog_gamengine_tilemap_test_atlas());
        node.palette({ '#': 'wall', '.': 'floor' });
        node.emit();
        return node;
    }
    $mol_test({
        'map of three by two gives an instance per cell'() {
            const node = $bog_gamengine_tilemap_test_make();
            $mol_assert_equal(node.pool().count, 6);
        },
        'cell kinds take their layers from the atlas'() {
            const node = $bog_gamengine_tilemap_test_make();
            const layer = node.pool().layer;
            $mol_assert_equal(layer[0], 0);
            $mol_assert_equal(layer[1], 1);
        },
        'char outside the palette is skipped'() {
            const node = $bog_gamengine_tilemap_test_make('#x#\n..#');
            $mol_assert_equal(node.pool().count, 5);
        },
        'first cell sits in the center the tile gives it'() {
            const node = $bog_gamengine_tilemap_test_make();
            const pos = node.tile().cell_pos(0, 0, new Float32Array(3));
            const trans = node.pool().trans;
            $mol_assert_equal(trans[12], pos[0]);
            $mol_assert_equal(trans[13], pos[1]);
            $mol_assert_equal(trans[14], pos[2]);
        },
        'edit of the map refills the pool'() {
            const node = $bog_gamengine_tilemap_test_make();
            node.tile().map('##\n##\n##\n##');
            node.emit();
            $mol_assert_equal(node.pool().count, 8);
        },
        'aabb covers the whole map'() {
            const node = $bog_gamengine_tilemap_test_make();
            const tile = node.tile();
            const box = node.aabb();
            $mol_assert_equal(box[0], 0);
            $mol_assert_equal(box[1], -tile.height());
            $mol_assert_equal(box[3], tile.width());
            $mol_assert_equal(box[4], 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function box(world, mass, x, y, z, rot) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), mass, new Float32Array([x, y, z]), rot));
    }
    function sphere(world, r, x) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([r, 0, 0]), 1, new Float32Array([x, 0, 0])));
    }
    function pairs_of(broad) {
        return [...broad.pairs.subarray(0, broad.pair_count * 2)];
    }
    $mol_test({
        'two boxes side by side give one pair'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            box(world, 1, 0.9, 0, 0);
            $mol_assert_equal(world.broad.find(world), 1);
            $mol_assert_equal(pairs_of(world.broad), [0, 1]);
        },
        'two boxes apart give no pairs'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            box(world, 1, 3, 0, 0);
            $mol_assert_equal(world.broad.find(world), 0);
        },
        'boxes overlapping in X but apart in Y give no pairs'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            box(world, 1, 0.5, 3, 0);
            $mol_assert_equal(world.broad.find(world), 0);
        },
        'hundred spheres of radius 1 with step 3 give no pairs'() {
            const world = new $bog_gamengine_phys3;
            for (let k = 0; k < 100; ++k)
                sphere(world, 1, k * 3);
            $mol_assert_equal(world.broad.find(world), 0);
        },
        'hundred spheres of radius 2 with step 3 give 99 pairs'() {
            const world = new $bog_gamengine_phys3;
            for (let k = 0; k < 100; ++k)
                sphere(world, 2, k * 3);
            $mol_assert_equal(world.broad.find(world), 99);
        },
        'two statics give no pairs'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0, 0, 0, 0);
            box(world, 0, 0.5, 0, 0);
            $mol_assert_equal(world.broad.find(world), 0);
        },
        'two sleeping bodies give no pairs'() {
            const world = new $bog_gamengine_phys3;
            const a = box(world, 1, 0, 0, 0);
            const b = box(world, 1, 0.5, 0, 0);
            world.flags[a] |= $bog_gamengine_phys3.flag_sleep;
            world.flags[b] |= $bog_gamengine_phys3.flag_sleep;
            $mol_assert_equal(world.broad.find(world), 0);
        },
        'ghost pairs with moving body'() {
            const world = new $bog_gamengine_phys3;
            const ghost = box(world, 0, 0, 0, 0);
            world.flags[ghost] |= $bog_gamengine_phys3.flag_ghost;
            box(world, 1, 0.5, 0, 0);
            $mol_assert_equal(world.broad.find(world), 1);
        },
        'plane pairs with every moving body and no static'() {
            const world = new $bog_gamengine_phys3;
            world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3));
            box(world, 1, 10, 0, 0);
            box(world, 1, 20, 0, 0);
            box(world, 0, 30, 0, 0);
            $mol_assert_equal(world.broad.find(world), 2);
            $mol_assert_equal(pairs_of(world.broad), [0, 1, 0, 2]);
        },
        'bounds of unit box turned 45 degrees around Y has half size about 0.707'() {
            const world = new $bog_gamengine_phys3;
            const rot = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 1, 0]), Math.PI / 4);
            const i = box(world, 1, 0, 0, 0, rot);
            world.bounds();
            const half = (world.aabb[i * 6 + 3] - world.aabb[i * 6]) / 2;
            $mol_assert_ok(Math.abs(half - Math.SQRT1_2) < 1e-3);
            $mol_assert_ok(Math.abs(world.aabb[i * 6 + 4] - 0.5) < 1e-6);
        },
        'bounds of capsule is sphere of radius plus half height'() {
            const world = new $bog_gamengine_phys3;
            const i = world.index_of(world.add($bog_gamengine_phys3.shape_capsule, new Float32Array([0.5, 1, 0]), 1, new Float32Array([1, 2, 3])));
            $mol_assert_equal([...world.aabb.subarray(i * 6, i * 6 + 6)], [-0.5, 0.5, 1.5, 2.5, 3.5, 4.5]);
        },
        'bounds of hull follows rotated points'() {
            const world = new $bog_gamengine_phys3;
            const rot = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 0, 1]), Math.PI / 2);
            const i = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array(3), 1, new Float32Array(3), rot));
            world.hull_points(i, new Float32Array([0, 0, 0, 2, 0, 0, 0, 1, 0]));
            $mol_assert_ok(Math.abs(world.aabb[i * 6] + 1) < 1e-6);
            $mol_assert_ok(Math.abs(world.aabb[i * 6 + 4] - 2) < 1e-6);
        },
        'second find without motion gives the same list'() {
            const world = new $bog_gamengine_phys3;
            for (let k = 0; k < 20; ++k)
                box(world, 1, (k * 7) % 20 * 0.8, 0, 0);
            world.broad.find(world);
            const first = pairs_of(world.broad);
            $mol_assert_ok(first.length > 0);
            world.broad.find(world);
            $mol_assert_equal(pairs_of(world.broad), first);
        },
        'step refreshes bounds and pairs'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            world.timestep = 1;
            box(world, 1, 0, 0, 0);
            const i = box(world, 1, 3, 0, 0);
            world.vel[i * 3] = -2;
            world.step(1);
            world.step(1);
            $mol_assert_equal(world.aabb[i * 6], 0.5);
            $mol_assert_equal(world.broad.pair_count, 1);
        },
        'remove keeps pairs of the moved body'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            box(world, 1, 10, 0, 0);
            box(world, 1, 0.5, 0, 0);
            world.broad.find(world);
            world.remove(world.handle_of(1));
            $mol_assert_equal(world.broad.find(world), 1);
            $mol_assert_equal(pairs_of(world.broad), [0, 1]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function near(actual, expected) {
        if (Math.abs(actual - expected) < 1e-4)
            return;
        $mol_fail(new Error(`${actual} ≠ ${expected}`));
    }
    function sphere(world, r, x, y, z) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([r, 0, 0]), 1, new Float32Array([x, y, z])));
    }
    function box(world, h, x, y, z, rot) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([h, h, h]), 1, new Float32Array([x, y, z]), rot));
    }
    function capsule(world, r, h, x, y, z, rot) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_capsule, new Float32Array([r, h, 0]), 1, new Float32Array([x, y, z]), rot));
    }
    function floor(world) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3)));
    }
    function tetra(world, x, y, z) {
        const i = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array([1, 1, 1]), 1, new Float32Array([x, y, z])));
        world.hull_points(i, new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]));
        return i;
    }
    function around_z(angle) {
        return $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 0, 1]), angle);
    }
    function collide(world) {
        const narrow = new $bog_gamengine_phys3_narrow;
        narrow.collide(world, new Uint32Array([0, 1]), 1);
        return narrow;
    }
    function normal_is(narrow, k, x, y, z) {
        near(narrow.contact_normal[k * 3], x);
        near(narrow.contact_normal[k * 3 + 1], y);
        near(narrow.contact_normal[k * 3 + 2], z);
    }
    $mol_test({
        'two spheres of radius 1 at distance 1.5 give depth 0.5 along the center line'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 1, 0, 0, 0);
            sphere(world, 1, 1.5, 0, 0);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            $mol_assert_equal(narrow.contact_a[0], 0);
            $mol_assert_equal(narrow.contact_b[0], 1);
            near(narrow.contact_depth[0], 0.5);
            normal_is(narrow, 0, 1, 0, 0);
            near(narrow.contact_point[0], 0.75);
        },
        'sphere above plane gives no contact'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 1, 0, 1.5, 0);
            floor(world);
            $mol_assert_equal(collide(world).contact_count, 0);
        },
        'sphere sunk 0.2 into plane gives depth 0.2 and plane normal'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 1, 0, 0.8, 0);
            floor(world);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            near(narrow.contact_depth[0], 0.2);
            normal_is(narrow, 0, 0, -1, 0);
        },
        'plane first in pair gives normal from plane to sphere'() {
            const world = new $bog_gamengine_phys3;
            floor(world);
            sphere(world, 1, 0, 0.8, 0);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            $mol_assert_equal(narrow.contact_a[0], 0);
            $mol_assert_equal(narrow.contact_b[0], 1);
            normal_is(narrow, 0, 0, 1, 0);
        },
        'unit box centered 0.4 above plane gives four points of depth 0.1'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0.5, 0, 0.4, 0);
            floor(world);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 4);
            for (let k = 0; k < 4; ++k) {
                near(narrow.contact_depth[k], 0.1);
                normal_is(narrow, k, 0, -1, 0);
                near(narrow.contact_point[k * 3 + 1], -0.05);
            }
        },
        'boxes overlapping 0.2 along X give four points with normal X and depth 0.2'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0.5, 0, 0, 0);
            box(world, 0.5, 0.8, 0, 0);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 4);
            for (let k = 0; k < 4; ++k) {
                near(narrow.contact_depth[k], 0.2);
                normal_is(narrow, k, 1, 0, 0);
                near(narrow.contact_point[k * 3], 0.4);
            }
        },
        'box rotated 45 degrees standing on an edge gives two points'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0.5, 0, 0.6, 0, around_z(Math.PI / 4));
            floor(world);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 2);
            near(narrow.contact_depth[0], Math.SQRT1_2 - 0.6);
            near(narrow.contact_depth[1], Math.SQRT1_2 - 0.6);
            normal_is(narrow, 0, 0, -1, 0);
        },
        'rotated boxes meeting edge to edge give one point'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0.5, 0, 0, 0, around_z(Math.PI / 4));
            box(world, 0.5, 0, 1.3, 0, $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([1, 0, 0]), Math.PI / 4));
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            near(narrow.contact_depth[0], Math.SQRT2 - 1.3);
            normal_is(narrow, 0, 0, 1, 0);
            near(narrow.contact_point[0], 0);
            near(narrow.contact_point[2], 0);
        },
        'sphere against box face'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 0.5, 0.9, 0, 0);
            box(world, 0.5, 0, 0, 0);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            near(narrow.contact_depth[0], 0.1);
            normal_is(narrow, 0, -1, 0, 0);
            near(narrow.contact_point[0], 0.45);
        },
        'sphere against box corner'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0.5, 0, 0, 0);
            sphere(world, 0.5, 0.7, 0.7, 0.7);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            near(narrow.contact_depth[0], 0.5 - 0.2 * Math.sqrt(3));
            const k = 1 / Math.sqrt(3);
            normal_is(narrow, 0, k, k, k);
        },
        'capsule lying on plane gives two points'() {
            const world = new $bog_gamengine_phys3;
            capsule(world, 0.3, 0.5, 0, 0.2, 0, around_z(Math.PI / 2));
            floor(world);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 2);
            near(narrow.contact_depth[0], 0.1);
            near(narrow.contact_depth[1], 0.1);
            normal_is(narrow, 0, 0, -1, 0);
            near(Math.abs(narrow.contact_point[0]), 0.5);
        },
        'crossed capsules give one point at the crossing'() {
            const world = new $bog_gamengine_phys3;
            capsule(world, 0.3, 1, 0, 0, 0);
            capsule(world, 0.3, 1, 0.5, 0, 0, $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([1, 0, 0]), Math.PI / 2));
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            near(narrow.contact_depth[0], 0.1);
            normal_is(narrow, 0, 1, 0, 0);
            near(narrow.contact_point[0], 0.25);
        },
        'separated tetrahedra give no contact'() {
            const world = new $bog_gamengine_phys3;
            tetra(world, 0, 0, 0);
            tetra(world, 3, 3, 3);
            $mol_assert_equal(collide(world).contact_count, 0);
        },
        'overlapping tetrahedra give depth and normal from a to b'() {
            const world = new $bog_gamengine_phys3;
            tetra(world, 0, 0, 0);
            tetra(world, 0.5, 0, 0);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            const k = 1 / Math.sqrt(3);
            near(narrow.contact_depth[0], 0.5 * k);
            normal_is(narrow, 0, k, k, k);
        },
        'ghost body still gets a contact'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 1, 0, 0, 0);
            const g = sphere(world, 1, 1.5, 0, 0);
            world.flags[g] = $bog_gamengine_phys3.flag_ghost;
            $mol_assert_equal(collide(world).contact_count, 1);
        },
        'contacts of a second collide overwrite the first'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 1, 0, 0, 0);
            sphere(world, 1, 1.5, 0, 0);
            const narrow = collide(world);
            narrow.collide(world, new Uint32Array([0, 1]), 1);
            $mol_assert_equal(narrow.contact_count, 1);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const dt = 1 / 60;
    function floor(world, nx = 0, ny = 1, nz = 0) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_plane, new Float32Array([nx, ny, nz]), 0, new Float32Array(3)));
    }
    function box(world, x, y, z, rot) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array([x, y, z]), rot));
    }
    function sphere(world, x, y, z) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([0.5, 0, 0]), 1, new Float32Array([x, y, z])));
    }
    function run(world, seconds) {
        const steps = Math.round(seconds / dt);
        for (let k = 0; k < steps; ++k)
            world.step(dt);
    }
    function speed(world, i) {
        return $bog_gamengine_vec_len(world.vel.subarray(i * 3, i * 3 + 3));
    }
    function slope(angle) {
        const world = new $bog_gamengine_phys3;
        const rot = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 0, 1]), angle);
        const nx = -Math.sin(angle), ny = Math.cos(angle);
        floor(world, nx, ny, 0);
        const i = box(world, nx * 0.5, ny * 0.5, 0, rot);
        return { world, i };
    }
    $mol_test({
        'box dropped from 2 rests on the plane after 3 s and sleeps'() {
            const world = new $bog_gamengine_phys3;
            floor(world);
            const i = box(world, 0, 2, 0);
            run(world, 3);
            $mol_assert_ok(Math.abs(world.pos[i * 3 + 1] - 0.5) < 0.01);
            $mol_assert_ok(speed(world, i) < 0.01);
            $mol_assert_ok(world.flags[i] & $bog_gamengine_phys3.flag_sleep);
        },
        'box on a 20 degree slope with friction 0.5 stays'() {
            const { world, i } = slope(20 * Math.PI / 180);
            const x0 = world.pos[i * 3], y0 = world.pos[i * 3 + 1];
            run(world, 2);
            $mol_assert_ok(Math.abs(world.pos[i * 3] - x0) < 0.02);
            $mol_assert_ok(Math.abs(world.pos[i * 3 + 1] - y0) < 0.02);
        },
        'box on a 40 degree slope slides faster and faster'() {
            const { world, i } = slope(40 * Math.PI / 180);
            run(world, 0.5);
            const first = speed(world, i);
            run(world, 0.5);
            const second = speed(world, i);
            $mol_assert_ok(first > 0.5);
            $mol_assert_ok(second > first + 0.5);
        },
        'bouncy sphere dropped from 1 rises above 0.5'() {
            const world = new $bog_gamengine_phys3;
            world.restitution(0.8);
            floor(world);
            const i = sphere(world, 0, 1.5, 0);
            let top = 0, bounced = false;
            for (let k = 0; k < 120; ++k) {
                world.step(dt);
                if (world.vel[i * 3 + 1] > 0)
                    bounced = true;
                if (bounced && world.pos[i * 3 + 1] > top)
                    top = world.pos[i * 3 + 1];
            }
            $mol_assert_ok(top - 0.5 > 0.5);
        },
        'stack of three boxes stands 3 s without drifting'() {
            const world = new $bog_gamengine_phys3;
            floor(world);
            const ids = [box(world, 0, 0.5, 0), box(world, 0, 1.51, 0), box(world, 0, 2.52, 0)];
            run(world, 3);
            for (const i of ids) {
                $mol_assert_ok(Math.abs(world.pos[i * 3]) < 0.02);
                $mol_assert_ok(Math.abs(world.pos[i * 3 + 2]) < 0.02);
            }
            $mol_assert_ok(world.pos[ids[2] * 3 + 1] > 2.4);
        },
        'ghost neither pushes nor is pushed but has a contact'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const a = sphere(world, 0, 0, 0);
            const g = sphere(world, 0.8, 0, 0);
            world.flags[g] |= $bog_gamengine_phys3.flag_ghost;
            world.vel[a * 3] = 1;
            world.step(dt);
            $mol_assert_equal(world.narrow.contact_count, 1);
            $mol_assert_equal(world.vel[a * 3], 1);
            $mol_assert_equal(world.vel[g * 3], 0);
        },
        'two boxes collide head-on and keep total momentum'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            world.restitution(1);
            const a = box(world, -1.5, 0, 0);
            const b = box(world, 1.5, 0, 0);
            world.vel[a * 3] = 6;
            world.vel[b * 3] = -2;
            run(world, 1);
            $mol_assert_ok(world.vel[a * 3] < 0);
            $mol_assert_ok(world.vel[b * 3] > 0);
            $mol_assert_ok(Math.abs(world.vel[a * 3] + world.vel[b * 3] - 4) < 0.2);
        },
        'warm start keeps the normal impulse of a resting box between frames'() {
            const world = new $bog_gamengine_phys3;
            floor(world);
            box(world, 0, 0.497, 0);
            world.step(dt);
            world.step(dt);
            let sum = 0;
            for (let k = 0; k < world.solve.prev_count; ++k)
                sum += world.solve.prev_pn[k];
            $mol_assert_ok(Math.abs(sum - 9.81 * dt) < 1e-3);
        },
        'thousand boxes in a 10x10x10 pile settle above the plane within 20 ms per step'() {
            const world = new $bog_gamengine_phys3;
            floor(world);
            for (let x = 0; x < 10; ++x)
                for (let y = 0; y < 10; ++y)
                    for (let z = 0; z < 10; ++z) {
                        box(world, x * 1.1 - 5, y * 1.1 + 0.6, z * 1.1 - 5);
                    }
            const steps = Math.round(3 / dt);
            let total = 0;
            for (let k = 0; k < steps; ++k) {
                const start = performance.now();
                world.step(dt);
                total += performance.now() - start;
            }
            for (let i = 1; i < world.count; ++i)
                $mol_assert_ok(world.pos[i * 3 + 1] > 0.4);
            $mol_assert_ok(total / steps < 20);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const dt = 1 / 60;
    function ground(world) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array([0, -100, 0])));
    }
    function box(world, x, y, z, half = 0.5, mass = 1) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([half, half, half]), mass, new Float32Array([x, y, z])));
    }
    function run(world, seconds) {
        const steps = Math.round(seconds / dt);
        for (let k = 0; k < steps; ++k)
            world.step(dt);
    }
    function anchor_world(world, i, local) {
        const out = new Float32Array(3);
        $bog_gamengine_vec_quat_rotate(out, world.rot_view[i], local);
        return $bog_gamengine_vec_add(out, out, world.pos_view[i]);
    }
    function gap(world, a, b, anchor_a, anchor_b) {
        const pa = anchor_world(world, a, anchor_a), pb = anchor_world(world, b, anchor_b);
        return $bog_gamengine_vec_len($bog_gamengine_vec_sub(pa, pa, pb));
    }
    function speed(world, i) {
        return $bog_gamengine_vec_len(world.vel.subarray(i * 3, i * 3 + 3));
    }
    function angle_y(world, i) {
        const out = new Float32Array(3);
        $bog_gamengine_vec_quat_to_euler(out, world.rot_view[i]);
        return out[1];
    }
    $mol_test({
        'box on a point joint 2 m below the anchor hangs there after 3 s'() {
            const world = new $bog_gamengine_phys3;
            const g = ground(world);
            const i = box(world, 0, 4, 0);
            const local = new Float32Array([0, 2, 0]);
            world.joint.add($bog_gamengine_phys3_joint.type_point, i, g, local, new Float32Array([0, 106, 0]));
            run(world, 3);
            const dx = world.pos[i * 3], dy = world.pos[i * 3 + 1] - 6, dz = world.pos[i * 3 + 2];
            $mol_assert_ok(Math.abs(Math.sqrt(dx * dx + dy * dy + dz * dz) - 2) < 0.05);
            $mol_assert_ok(dy < 0);
            $mol_assert_ok(speed(world, i) < 0.05);
        },
        'swinging box on a point joint keeps its distance to the anchor'() {
            const world = new $bog_gamengine_phys3;
            const g = ground(world);
            const i = box(world, 2, 6, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_point, i, g, new Float32Array([-2, 0, 0]), new Float32Array([0, 106, 0]));
            let worst = 0;
            for (let k = 0; k < 180; ++k) {
                world.step(dt);
                const dx = world.pos[i * 3], dy = world.pos[i * 3 + 1] - 6, dz = world.pos[i * 3 + 2];
                const err = Math.abs(Math.sqrt(dx * dx + dy * dy + dz * dz) - 2);
                if (err > worst)
                    worst = err;
            }
            $mol_assert_ok(worst < 0.05);
        },
        'chain of five boxes on hinges does not tear after 3 s'() {
            const world = new $bog_gamengine_phys3;
            const g = ground(world);
            const axis = new Float32Array([0, 0, 1]);
            const ids = [];
            for (let n = 0; n < 5; ++n)
                ids.push(box(world, 0.55 + n * 1.1, 6, 0));
            world.joint.add($bog_gamengine_phys3_joint.type_point, ids[0], g, new Float32Array([-0.55, 0, 0]), new Float32Array([0, 106, 0]));
            for (let n = 1; n < 5; ++n) {
                world.joint.add($bog_gamengine_phys3_joint.type_hinge, ids[n], ids[n - 1], new Float32Array([-0.55, 0, 0]), new Float32Array([0.55, 0, 0]), axis);
            }
            run(world, 3);
            for (let n = 1; n < 5; ++n) {
                $mol_assert_ok(gap(world, ids[n], ids[n - 1], new Float32Array([-0.55, 0, 0]), new Float32Array([0.55, 0, 0])) <= 0.05);
            }
            $mol_assert_ok(world.pos[ids[4] * 3 + 1] < 3);
        },
        'hinge with limits stops the door at the limit'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const g = ground(world);
            const i = box(world, 0.6, 0, 0);
            const limit = Math.PI / 2;
            world.joint.add($bog_gamengine_phys3_joint.type_hinge, g, i, new Float32Array([0, 100, 0]), new Float32Array([-0.6, 0, 0]), new Float32Array([0, 1, 0]), new Float32Array([-limit, limit]));
            world.ang[i * 3 + 1] = 6;
            let worst = 0;
            for (let k = 0; k < 120; ++k) {
                world.step(dt);
                const angle = Math.abs(angle_y(world, i));
                if (angle > worst)
                    worst = angle;
            }
            $mol_assert_ok(worst > limit - 0.1);
            $mol_assert_ok(worst <= limit + 0.02);
        },
        'hinge keeps its axis while the body spins'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const g = ground(world);
            const i = box(world, 0.6, 0, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_hinge, g, i, new Float32Array([0, 100, 0]), new Float32Array([-0.6, 0, 0]), new Float32Array([0, 1, 0]));
            world.ang[i * 3] = 3;
            world.ang[i * 3 + 1] = 3;
            run(world, 1);
            const out = new Float32Array(3);
            $bog_gamengine_vec_quat_rotate(out, world.rot_view[i], new Float32Array([0, 1, 0]));
            $mol_assert_ok(out[1] > 0.99);
            $mol_assert_ok(Math.abs(world.ang[i * 3 + 1]) > 0.5);
        },
        'slider moves only along its axis and stops at the limit'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const g = ground(world);
            const i = box(world, 0, 0, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_slider, g, i, new Float32Array([0, 100, 0]), new Float32Array(3), new Float32Array([1, 0, 0]), new Float32Array([-1, 1]));
            world.vel[i * 3] = 4;
            world.vel[i * 3 + 1] = 2;
            world.ang[i * 3 + 2] = 2;
            let worst = 0;
            for (let k = 0; k < 90; ++k) {
                world.step(dt);
                const side = Math.hypot(world.pos[i * 3 + 1], world.pos[i * 3 + 2]);
                if (side > worst)
                    worst = side;
            }
            $mol_assert_ok(worst <= 0.01);
            $mol_assert_ok(world.pos[i * 3] > 0.95);
            $mol_assert_ok(world.pos[i * 3] <= 1.01);
            $mol_assert_ok(Math.abs(angle_y(world, i)) < 0.01);
        },
        'spring oscillates around its rest length and settles in 5 s'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const g = ground(world);
            const i = box(world, 3, 0, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_spring, g, i, new Float32Array([0, 100, 0]), new Float32Array(3), undefined, new Float32Array([2, 20, 2]));
            let nearest = Infinity;
            for (let k = 0; k < 300; ++k) {
                world.step(dt);
                if (world.pos[i * 3] < nearest)
                    nearest = world.pos[i * 3];
            }
            $mol_assert_ok(nearest < 1.9);
            $mol_assert_ok(Math.abs(world.pos[i * 3] - 2) < 0.05);
        },
        'sleeping box joined to a moving one wakes up'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const a = box(world, 0, 0, 0);
            const b = box(world, 2, 0, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_point, a, b, new Float32Array([1, 0, 0]), new Float32Array([-1, 0, 0]));
            world.flags[a] |= $bog_gamengine_phys3.flag_sleep;
            world.vel[b * 3 + 1] = 2;
            world.step(dt);
            $mol_assert_equal(world.flags[a] & $bog_gamengine_phys3.flag_sleep, 0);
            $mol_assert_ok(world.vel[a * 3 + 1] > 0.1);
        },
        'removing a body drops its joints and renumbers the moved one'() {
            const world = new $bog_gamengine_phys3;
            const a = box(world, 0, 0, 0);
            const b = box(world, 2, 0, 0);
            const c = box(world, 4, 0, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_point, a, b, new Float32Array(3), new Float32Array(3));
            world.joint.add($bog_gamengine_phys3_joint.type_point, b, c, new Float32Array(3), new Float32Array(3));
            world.remove(world.handle_of(a));
            $mol_assert_equal(world.joint.count, 1);
            $mol_assert_equal(world.joint.a[0], b);
            $mol_assert_equal(world.joint.b[0], a);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_scene_time_mock extends $mol_state_time {
        static stamp(next = 0) {
            return next;
        }
        static now(precision) {
            return this.stamp();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene_time_mock, "stamp", null);
    class $bog_gamengine_scene_mover extends $bog_gamengine_node {
        step(dt) {
            const pos = this.pos();
            this.pos(new Float32Array([pos[0] + dt, pos[1], pos[2]]));
        }
    }
    class $bog_gamengine_scene_named extends $bog_gamengine_node {
        kids(next = []) {
            return next;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene_named.prototype, "kids", null);
    class $bog_gamengine_scene_test_cam extends $bog_gamengine_cam {
        proj(aspect) {
            return $mol_3d_mat4.perspective(Math.PI / 3, aspect, 0.1, 100);
        }
    }
    class $bog_gamengine_scene_generated extends $bog_gamengine_scene {
        extra = new $bog_gamengine_scene_mover;
        auto_nodes() {
            return [this.extra];
        }
    }
    class $bog_gamengine_scene_input_mock extends $bog_gamengine_input {
        polls = 0;
        poll() {
            ++this.polls;
        }
    }
    $mol_test({
        'phys set by code survives a recompute within the frame'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const body = new $bog_gamengine_phys_body;
            body.vel(new Float32Array([1, 0, 0]));
            const phys = new $bog_gamengine_phys;
            phys.bodies([body]);
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.phys(phys);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            scene.aspect(2);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(32);
            scene.step();
            $mol_assert_ok(Math.abs(body.pos()[0] - 0.032) < 1e-6);
        },
        'scene polls input once per frame'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const input = new $bog_gamengine_scene_input_mock;
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.input(input);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            scene.aspect(2);
            scene.step();
            $mol_assert_equal(input.polls, 2);
        },
        'three ticks of 16 ms move node by 0.048'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const mover = new $bog_gamengine_scene_mover;
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.kids = () => [mover];
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(32);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(48);
            scene.step();
            $mol_assert_ok(Math.abs(mover.pos()[0] - 0.048) < 1e-9);
        },
        'scene steps phys body by its velocity'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const body = new $bog_gamengine_phys_body;
            body.vel(new Float32Array([1, 0, 0]));
            const phys = new $bog_gamengine_phys;
            phys.bodies([body]);
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.phys(phys);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            $mol_assert_ok(Math.abs(body.pos()[0] - 0.016) < 1e-6);
        },
        'step recomputed within one frame moves node once'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const mover = new $bog_gamengine_scene_mover;
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.kids = () => [mover];
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            scene.aspect(2);
            scene.step();
            $mol_assert_ok(Math.abs(mover.pos()[0] - 0.016) < 1e-9);
        },
        'gravity of phys set by code lives through two frames'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const body = new $bog_gamengine_phys_body;
            const phys = new $bog_gamengine_phys;
            phys.bodies([body]);
            phys.gravity(new Float32Array([0, -10]));
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.phys(phys);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            scene.aspect(2);
            scene.step();
            $mol_wire_fiber.sync();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(32);
            scene.step();
            $mol_assert_equal([...phys.gravity()], [0, -10]);
            $mol_assert_ok(body.vel()[1] < -0.3);
        },
        'scene steps phys3 body by its velocity'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const i = world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array(3)));
            world.vel[i * 3] = 1;
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.phys3(world);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(17);
            scene.step();
            $mol_assert_ok(Math.abs(world.pos[i * 3] - world.timestep) < 1e-6);
        },
        'cam is null by default and can be set'() {
            const scene = new $bog_gamengine_scene;
            $mol_assert_equal(scene.cam(), null);
            const cam = new $bog_gamengine_scene_test_cam;
            scene.cam(cam);
            $mol_assert_equal(scene.cam(), cam);
        },
        'scene with cam drops mesh behind it from batch count'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const front = new $bog_gamengine_mesh;
            front.pos(new Float32Array([0, 0, -5]));
            const behind = new $bog_gamengine_mesh;
            behind.pos(new Float32Array([0, 0, 5]));
            const batch = new $bog_gamengine_batch;
            batch.nodes([front, behind]);
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.batches([batch]);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $mol_assert_equal(batch.count, 2);
            scene.cam(new $bog_gamengine_scene_test_cam);
            scene.step();
            $mol_assert_equal(batch.count, 1);
        },
        'auto batches group scene nodes by shader, shape and atlas'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const hero = new $bog_gamengine_sprite;
            hero.atlas(atlas);
            const coin = new $bog_gamengine_sprite;
            coin.atlas(atlas);
            const mesh = new $bog_gamengine_mesh;
            mesh.atlas(atlas);
            const scene = new $bog_gamengine_scene;
            scene.kids([hero, coin, mesh]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 2);
            $mol_assert_equal(batches[0].nodes(), [hero, coin]);
            $mol_assert_equal(batches[1].nodes(), [mesh]);
            $mol_assert_ok(batches[0].shader() instanceof $bog_gamengine_shader_sprite);
            $mol_assert_ok(batches[0].shape() instanceof $bog_gamengine_shape_quad);
            $mol_assert_ok(batches[1].shader() instanceof $bog_gamengine_shader_solid);
            $mol_assert_equal(batches[1].shape(), mesh.shape());
            $mol_assert_equal(batches[1].atlas(), atlas);
        },
        'batches fall back to auto batches and explicit batches win'() {
            const sprite = new $bog_gamengine_sprite;
            const scene = new $bog_gamengine_scene;
            scene.kids([sprite]);
            $mol_assert_equal(scene.batches(), scene.auto_batches());
            $mol_assert_equal(scene.batches().length, 1);
            const own = new $bog_gamengine_batch;
            scene.batches([own]);
            $mol_assert_equal(scene.batches(), [own]);
        },
        'mesh without atlas gets the plain solid shader'() {
            const mesh = new $bog_gamengine_mesh;
            const scene = new $bog_gamengine_scene;
            scene.kids([mesh]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 1);
            $mol_assert_ok(batches[0].shader() instanceof $bog_gamengine_shader_solid_plain);
            $mol_assert_equal(batches[0].atlas(), null);
        },
        'node shader set by hand takes its own batch'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const plain = new $bog_gamengine_sprite;
            plain.atlas(atlas);
            const own = new $bog_gamengine_sprite;
            own.atlas(atlas);
            own.shader(new $bog_gamengine_shader_flat);
            const scene = new $bog_gamengine_scene;
            scene.kids([plain, own]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 2);
            $mol_assert_equal(batches[1].shader(), own.shader());
        },
        'source node gets its own batch without uv'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const spark = new $bog_gamengine_particle;
            spark.atlas(atlas);
            const scene = new $bog_gamengine_scene;
            scene.kids([spark]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 1);
            $mol_assert_equal(batches[0].source(), spark.pool());
            $mol_assert_equal(batches[0].nodes(), []);
            $mol_assert_equal(batches[0].atlas(), atlas);
            $mol_assert_ok(batches[0].shader() instanceof $bog_gamengine_shader_sprite);
        },
        'auto batches keep the order the nodes are listed in'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const map = new $bog_gamengine_tilemap;
            map.atlas(atlas);
            const hero = new $bog_gamengine_sprite;
            hero.atlas(atlas);
            const spark = new $bog_gamengine_particle;
            spark.atlas(atlas);
            const scene = new $bog_gamengine_scene;
            scene.kids([map, hero, spark]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 3);
            $mol_assert_equal(batches[0].source(), map.pool());
            $mol_assert_equal(batches[1].nodes(), [hero]);
            $mol_assert_equal(batches[2].source(), spark.pool());
        },
        'nodes without layer and uv stay out of auto batches'() {
            const bare = new $bog_gamengine_node;
            const scene = new $bog_gamengine_scene;
            scene.kids([bare]);
            $mol_assert_equal(scene.auto_batches().length, 0);
        },
        'auto batch of the same group survives a nodes recompute'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const first = new $bog_gamengine_sprite;
            first.atlas(atlas);
            const second = new $bog_gamengine_sprite;
            second.atlas(atlas);
            const scene = new $bog_gamengine_scene;
            scene.kids([first]);
            const before = scene.auto_batches()[0];
            scene.kids([first, second]);
            const after = scene.auto_batches()[0];
            $mol_assert_equal(before, after);
            $mol_assert_equal(after.nodes(), [first, second]);
        },
        'nodes lists tree depth first with parent before kids'() {
            const a = new $bog_gamengine_scene_named;
            const b = new $bog_gamengine_scene_named;
            const c = new $bog_gamengine_scene_named;
            a.kids([b]);
            const scene = new $bog_gamengine_scene;
            scene.kids = () => [a, c];
            $mol_assert_equal(scene.nodes(), [a, b, c]);
        },
        'nodes see kids given through setter'() {
            const a = new $bog_gamengine_node;
            const b = new $bog_gamengine_node;
            const scene = new $bog_gamengine_scene;
            scene.kids([a, b]);
            $mol_assert_equal(scene.nodes(), [a, b]);
        },
        'node in scene kids sees scene, its input and clock'() {
            const a = new $bog_gamengine_node;
            const scene = new $bog_gamengine_scene;
            const input = new $bog_gamengine_input;
            scene.input(input);
            scene.kids([a]);
            $mol_assert_equal(a.scene(), scene);
            $mol_assert_equal(a.input(), input);
            $mol_assert_equal(a.clock(), scene.clock());
        },
        'generated nodes live alongside the tree ones'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const kid = new $bog_gamengine_scene_mover;
            const scene = new $bog_gamengine_scene_generated;
            scene.$ = $;
            scene.kids([kid]);
            $mol_assert_equal(scene.nodes(), [kid, scene.extra]);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            $mol_assert_ok(Math.abs(kid.pos()[0] - 0.016) < 1e-9);
            $mol_assert_ok(Math.abs(scene.extra.pos()[0] - 0.016) < 1e-9);
            $mol_assert_equal(kid.parent(), scene);
            $mol_assert_equal(scene.extra.parent(), scene);
        },
        'auto batches take generated nodes too'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const sprite = new $bog_gamengine_sprite;
            sprite.atlas(atlas);
            const scene = new $bog_gamengine_scene;
            scene.auto_nodes([sprite]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 1);
            $mol_assert_equal(batches[0].nodes(), [sprite]);
        },
        'grandchild of overridden kids sees scene after nodes walk'() {
            const a = new $bog_gamengine_scene_named;
            const b = new $bog_gamengine_node;
            a.kids([b]);
            const scene = new $bog_gamengine_scene;
            scene.kids = () => [a];
            $mol_assert_equal(a.scene(), null);
            scene.nodes();
            $mol_assert_equal(a.scene(), scene);
            $mol_assert_equal(b.scene(), scene);
            $mol_assert_equal(b.clock(), scene.clock());
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'face gives source sampler, uv pipe and color output'($) {
            const shader = new $bog_gamengine_shader_post;
            const face = shader.face();
            $mol_assert_equal(face.glob.source, 'sampler2D');
            $mol_assert_equal(face.pipe.pipe_uv, 'vec2');
            $mol_assert_equal(face.output.color, 'vec4');
        },
        'both entries have main'($) {
            const shader = new $bog_gamengine_shader_post;
            $mol_assert_ok(shader.vert().includes('void main()'));
            $mol_assert_ok(shader.frag().includes('void main()'));
        },
        'vert makes the quad out of gl_VertexID without attributes'($) {
            const shader = new $bog_gamengine_shader_post;
            $mol_assert_ok(shader.vert().includes('gl_VertexID'));
            $mol_assert_not('input' in shader.face());
        },
        'source declares the sampler and mixes only glsl both'($) {
            const shader = new $bog_gamengine_shader_post;
            const source = $bog_gamengine_gl_source(shader.face(), shader.vert(), shader.frag());
            $mol_assert_ok(source.frag.includes('uniform sampler2D source;'));
            $mol_assert_ok(source.frag.includes('out vec4 color;'));
            $mol_assert_equal(shader.sources().vert, $mol_3d_glsl_both + shader.vert());
        },
        'one step reads the pass input at full size'($) {
            const shader = new $bog_gamengine_shader_post;
            const steps = shader.steps();
            $mol_assert_equal(steps.length, 1);
            $mol_assert_equal(steps[0].shader, shader);
            $mol_assert_equal(steps[0].scale, 1);
            $mol_assert_equal(steps[0].from, 'in');
            $mol_assert_equal(steps[0].extra, null);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function $bog_gamengine_shape_gltf_test_glb(normals, indices) {
        const pos = [0, 0, 0, 1, 0, 0, 0, 1, 0];
        const norm = [0, 0, 1, 0, 0, 1, 0, 0, 1];
        const tex = [0, 0, 1, 0, 0, 1];
        const floats = [...pos, ...(normals ? norm : []), ...tex];
        const bin_size = floats.length * 4 + (indices ? 8 : 0);
        const bin = new ArrayBuffer(bin_size);
        const view = new DataView(bin);
        for (let i = 0; i < floats.length; ++i)
            view.setFloat32(i * 4, floats[i], true);
        if (indices)
            for (let i = 0; i < 3; ++i)
                view.setUint16(floats.length * 4 + i * 2, i, true);
        const views = [];
        const accessors = [];
        const attributes = {};
        let offset = 0;
        const add = (name, count, type, size, componentType, unit) => {
            views.push({ buffer: 0, byteOffset: offset, byteLength: count * size * unit });
            accessors.push({ bufferView: views.length - 1, componentType, count, type });
            attributes[name] = accessors.length - 1;
            offset += count * size * unit;
        };
        add('POSITION', 3, 'VEC3', 3, 5126, 4);
        if (normals)
            add('NORMAL', 3, 'VEC3', 3, 5126, 4);
        add('TEXCOORD_0', 3, 'VEC2', 2, 5126, 4);
        if (indices)
            add('indices', 3, 'SCALAR', 1, 5123, 2);
        const primitive = { attributes: { ...attributes } };
        if (indices) {
            primitive.indices = attributes.indices;
            delete primitive.attributes.indices;
        }
        const doc = { asset: { version: '2.0' }, meshes: [{ primitives: [primitive] }], accessors, bufferViews: views, buffers: [{ byteLength: bin_size }] };
        return $bog_gamengine_shape_gltf_test_wrap(doc, bin);
    }
    function $bog_gamengine_shape_gltf_test_wrap(doc, bin) {
        const bin_size = bin.byteLength;
        let json = new TextEncoder().encode(JSON.stringify(doc));
        while (json.length % 4)
            json = new Uint8Array([...json, 0x20]);
        const total = 12 + 8 + json.length + 8 + bin_size;
        const glb = new ArrayBuffer(total);
        const out = new DataView(glb);
        out.setUint32(0, 0x46546C67, true);
        out.setUint32(4, 2, true);
        out.setUint32(8, total, true);
        out.setUint32(12, json.length, true);
        out.setUint32(16, 0x4E4F534A, true);
        new Uint8Array(glb, 20, json.length).set(json);
        out.setUint32(20 + json.length, bin_size, true);
        out.setUint32(24 + json.length, 0x004E4942, true);
        new Uint8Array(glb, 28 + json.length, bin_size).set(new Uint8Array(bin));
        return glb;
    }
    function $bog_gamengine_shape_gltf_test_skin_glb() {
        const parts = [
            { data: [0, 0, 0, 1, 0, 0, 0, 1, 0], kind: 'f32', type: 'VEC3' },
            { data: [0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0], kind: 'u8', type: 'VEC4' },
            { data: [1, 0, 0, 0, 0.5, 0.5, 0, 0, 0.25, 0.75, 0, 0], kind: 'f32', type: 'VEC4' },
            { data: [2, 1, 0], kind: 'u16', type: 'SCALAR' },
            { data: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1, 0, 1], kind: 'f32', type: 'MAT4' },
            { data: [0, 0.75], kind: 'f32', type: 'SCALAR' },
            { data: [0, 0, 0, 1, 0, 0, 1, 0], kind: 'f32', type: 'VEC4' },
        ];
        const dims = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
        const units = { f32: 4, u8: 1, u16: 2 };
        const codes = { f32: 5126, u8: 5121, u16: 5123 };
        const align = (size) => size + (4 - size % 4) % 4;
        let bin_size = 0;
        for (const part of parts)
            bin_size += align(part.data.length * units[part.kind]);
        const bin = new ArrayBuffer(bin_size);
        const view = new DataView(bin);
        const views = [];
        const accessors = [];
        let at = 0;
        for (const part of parts) {
            const unit = units[part.kind];
            for (let i = 0; i < part.data.length; ++i) {
                const to = at + i * unit;
                if (part.kind === 'f32')
                    view.setFloat32(to, part.data[i], true);
                else if (part.kind === 'u16')
                    view.setUint16(to, part.data[i], true);
                else
                    view.setUint8(to, part.data[i]);
            }
            views.push({ buffer: 0, byteOffset: at, byteLength: part.data.length * unit });
            accessors.push({
                bufferView: views.length - 1,
                componentType: codes[part.kind],
                count: part.data.length / dims[part.type],
                type: part.type,
            });
            at += align(part.data.length * unit);
        }
        const doc = {
            asset: { version: '2.0' },
            nodes: [
                { name: 'root', translation: [0, 0, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1], children: [1] },
                { name: 'tip', translation: [0, 1, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] },
                { name: 'arm', mesh: 0, skin: 0 },
            ],
            meshes: [{ primitives: [{ attributes: { POSITION: 0, JOINTS_0: 1, WEIGHTS_0: 2 }, indices: 3 }] }],
            skins: [{ joints: [0, 1], inverseBindMatrices: 4 }],
            animations: [
                {
                    name: 'wave',
                    channels: [{ sampler: 0, target: { node: 1, path: 'rotation' } }],
                    samplers: [{ input: 5, output: 6, interpolation: 'LINEAR' }],
                },
                {
                    name: 'hold',
                    channels: [{ sampler: 0, target: { node: 1, path: 'rotation' } }],
                    samplers: [{ input: 5, output: 6, interpolation: 'STEP' }],
                },
            ],
            accessors,
            bufferViews: views,
            buffers: [{ byteLength: bin_size }],
        };
        return $bog_gamengine_shape_gltf_test_wrap(doc, bin);
    }
    $mol_test({
        'glb triangle gives positions, normals and flipped uv'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_glb(true, true) });
            $mol_assert_equal(shape.size(), 3);
            $mol_assert_equal(shape.mode(), 'triangles');
            $mol_assert_equal([...shape.geometry()], [0, 0, 0, 1, 0, 0, 0, 1, 0]);
            $mol_assert_equal([...shape.normals()], [0, 0, 1, 0, 0, 1, 0, 0, 1]);
            $mol_assert_equal([...shape.skin()], [0, 1, 1, 1, 0, 0]);
        },
        'glb without normals gets flat normal from ccw triangle'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_glb(false, true) });
            $mol_assert_equal([...shape.normals()], [0, 0, 1, 0, 0, 1, 0, 0, 1]);
        },
        'glb without indices takes vertices in order'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_glb(true, false) });
            $mol_assert_equal(shape.size(), 3);
            $mol_assert_equal([...shape.geometry()], [0, 0, 0, 1, 0, 0, 0, 1, 0]);
        },
        'glb skin unrolls joints and weights by index'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_skin_glb() });
            $mol_assert_equal(shape.size(), 3);
            $mol_assert_equal([...shape.joints()], [1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]);
            $mol_assert_equal([...shape.weights()], [0.25, 0.75, 0, 0, 0.5, 0.5, 0, 0, 1, 0, 0, 0]);
        },
        'glb skeleton keeps parents, base pose and inverse binds'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_skin_glb() });
            const skeleton = shape.skeleton();
            $mol_assert_equal(skeleton.count, 2);
            $mol_assert_equal([...skeleton.names], ['root', 'tip']);
            $mol_assert_equal([...skeleton.parents], [-1, 0]);
            $mol_assert_equal([...skeleton.order], [0, 1]);
            $mol_assert_equal([...skeleton.base.subarray(10, 20)], [0, 1, 0, 0, 0, 0, 1, 1, 1, 1]);
            $mol_assert_equal(skeleton.binds[16 + 13], -1);
        },
        'glb clip with two keys takes duration from the last key'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_skin_glb() });
            const clip = shape.clips().get('wave');
            $mol_assert_equal(clip.duration, 0.75);
            $mol_assert_equal(clip.channels.length, 1);
            $mol_assert_equal(clip.channels[0].joint, 1);
            $mol_assert_equal(clip.channels[0].path, 'rotation');
        },
        'glb marks a step sampler as step and a linear one as not'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_skin_glb() });
            $mol_assert_equal(shape.clips().get('hold').channels[0].step, true);
            $mol_assert_equal(shape.clips().get('wave').channels[0].step, false);
        },
        'glb cubic spline animation fails with message'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, json: () => ({
                    nodes: [{ name: 'root' }],
                    skins: [{ joints: [0] }],
                    animations: [{
                            name: 'jump',
                            channels: [{ sampler: 0, target: { node: 0, path: 'rotation' } }],
                            samplers: [{ input: 0, output: 1, interpolation: 'CUBICSPLINE' }],
                        }],
                }) });
            $mol_assert_fail(() => shape.clips(), 'glTF animation interpolation CUBICSPLINE is not supported');
        },
        'glb without skin gives no skeleton and no clips'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_glb(true, true) });
            $mol_assert_equal(shape.skeleton(), null);
            $mol_assert_equal(shape.clips().size, 0);
            $mol_assert_equal(shape.joints().length, 0);
        },
        'glb without position fails with message'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, json: () => ({ meshes: [{ primitives: [{ attributes: {} }] }] }) });
            $mol_assert_fail(() => shape.geometry(), 'glTF primitive has no POSITION');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function $bog_gamengine_skin_test_skeleton() {
        return {
            count: 2,
            names: ['root', 'tip'],
            parents: new Int32Array([-1, 0]),
            order: new Int32Array([0, 1]),
            base: new Float32Array([
                0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
                0, 1, 0, 0, 0, 0, 1, 1, 1, 1,
            ]),
            binds: new Float32Array([
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1, 0, 1,
            ]),
        };
    }
    function $bog_gamengine_skin_test_clips() {
        const quarter = Math.PI / 2;
        return new Map([
            ['turn', {
                    name: 'turn',
                    duration: 1,
                    channels: [{
                            joint: 1,
                            path: 'rotation',
                            step: false,
                            times: new Float32Array([0, 1]),
                            values: new Float32Array([0, 0, 0, 1, 0, 0, Math.sin(quarter / 2), Math.cos(quarter / 2)]),
                        }],
                }],
            ['here', {
                    name: 'here',
                    duration: 1,
                    channels: [{
                            joint: 0,
                            path: 'translation',
                            step: false,
                            times: new Float32Array([0, 1]),
                            values: new Float32Array([0, 0, 0, 0, 0, 0]),
                        }],
                }],
            ['there', {
                    name: 'there',
                    duration: 1,
                    channels: [{
                            joint: 0,
                            path: 'translation',
                            step: false,
                            times: new Float32Array([0, 1]),
                            values: new Float32Array([2, 0, 0, 2, 0, 0]),
                        }],
                }],
            ['jump', {
                    name: 'jump',
                    duration: 1,
                    channels: [{
                            joint: 0,
                            path: 'translation',
                            step: true,
                            times: new Float32Array([0, 1]),
                            values: new Float32Array([0, 0, 0, 4, 0, 0]),
                        }],
                }],
        ]);
    }
    function $bog_gamengine_skin_test_make($, clip) {
        const skeleton = $bog_gamengine_skin_test_skeleton();
        const clips = $bog_gamengine_skin_test_clips();
        const shape = $bog_gamengine_shape_gltf.make({ $, skeleton: () => skeleton, clips: () => clips });
        const skin = new $bog_gamengine_skin;
        skin.shape(shape);
        skin.clip(clip);
        return skin;
    }
    $mol_test({
        'pose at time zero keeps the bind pose'($) {
            const skin = $bog_gamengine_skin_test_make($, 'turn');
            const bones = skin.pose();
            for (let i = 0; i < 2; ++i) {
                for (let k = 0; k < 16; ++k) {
                    $mol_assert_ok(Math.abs(bones[i * 16 + k] - (k % 5 ? 0 : 1)) < 1e-4);
                }
            }
        },
        'pose in the middle of a clip turns the bone'($) {
            const skin = $bog_gamengine_skin_test_make($, 'turn');
            skin.time(0.5);
            const bones = skin.pose();
            const cos = Math.cos(Math.PI / 4);
            const sin = Math.sin(Math.PI / 4);
            $mol_assert_ok(Math.abs(bones[16] - cos) < 1e-4);
            $mol_assert_ok(Math.abs(bones[17] - sin) < 1e-4);
            $mol_assert_ok(Math.abs(bones[20] + sin) < 1e-4);
            $mol_assert_ok(Math.abs(bones[28] - sin) < 1e-4);
            $mol_assert_ok(Math.abs(bones[29] - (1 - cos)) < 1e-4);
            $mol_assert_ok(Math.abs(bones[0] - 1) < 1e-4);
        },
        'blend of two clips with half weight gives the middle'($) {
            const skin = $bog_gamengine_skin_test_make($, 'here');
            skin.blend('there', 0.5);
            const bones = skin.pose();
            $mol_assert_ok(Math.abs(bones[12] - 1) < 1e-4);
            $mol_assert_ok(Math.abs(bones[13]) < 1e-4);
        },
        'step interpolation holds the previous key'($) {
            const skin = $bog_gamengine_skin_test_make($, 'jump');
            skin.time(0.9);
            $mol_assert_ok(Math.abs(skin.pose()[12]) < 1e-4);
            skin.time(1);
            $mol_assert_ok(Math.abs(skin.pose()[12] - 4) < 1e-4);
        },
        'time runs by step and loops over the duration'($) {
            const skin = $bog_gamengine_skin_test_make($, 'turn');
            skin.step(0.6);
            $mol_assert_ok(Math.abs(skin.time() - 0.6) < 1e-6);
            skin.step(0.6);
            $mol_assert_ok(Math.abs(skin.time() - 0.2) < 1e-6);
        },
        'time stops at the end without loop'($) {
            const skin = $bog_gamengine_skin_test_make($, 'turn');
            skin.loop(false);
            skin.step(0.8);
            skin.step(0.8);
            $mol_assert_equal(skin.time(), 1);
        },
        'pose without a skeleton stays identity'($) {
            const skin = new $bog_gamengine_skin;
            const bones = skin.pose();
            $mol_assert_equal(bones.length, $bog_gamengine_skin_max * 16);
            $mol_assert_equal([...bones.subarray(0, 16)], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        },
        'pose keeps the same buffer and bumps version only on change'($) {
            const skin = $bog_gamengine_skin_test_make($, 'turn');
            const first = skin.pose();
            const was = skin.version;
            $mol_assert_equal(skin.pose(), first);
            $mol_assert_equal(skin.version, was);
            skin.time(0.5);
            $mol_assert_equal(skin.pose(), first);
            $mol_assert_equal(skin.version, was + 1);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_post_bloom_bright extends $bog_gamengine_shader_post {
        frag() {
            return `
				void main() {
					vec3 base = max( texture( source, pipe_uv ).rgb, vec3( 0.0 ) );
					float power = max( max( base.r, base.g ), base.b );
					float over = max( power - 0.4, 0.0 );
					color = vec4( base * ( over / max( power, 0.0001 ) ), 1.0 );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_post_bloom_bright = $bog_gamengine_shader_post_bloom_bright;
    class $bog_gamengine_shader_post_bloom_blur extends $bog_gamengine_shader_post {
        across() {
            return false;
        }
        frag() {
            return `
				void main() {
					vec2 hop = vec2( ${this.across() ? '0.0, 1.0' : '1.0, 0.0'} ) * texel;
					vec3 sum = texture( source, pipe_uv ).rgb * 0.227027;
					sum += ( texture( source, pipe_uv + hop * 1.384615 ).rgb + texture( source, pipe_uv - hop * 1.384615 ).rgb ) * 0.316216;
					sum += ( texture( source, pipe_uv + hop * 3.230769 ).rgb + texture( source, pipe_uv - hop * 3.230769 ).rgb ) * 0.070270;
					color = vec4( sum, 1.0 );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_post_bloom_blur = $bog_gamengine_shader_post_bloom_blur;
    class $bog_gamengine_shader_post_bloom_blur_across extends $bog_gamengine_shader_post_bloom_blur {
        across() {
            return true;
        }
    }
    $.$bog_gamengine_shader_post_bloom_blur_across = $bog_gamengine_shader_post_bloom_blur_across;
    class $bog_gamengine_shader_post_bloom extends $bog_gamengine_shader_post {
        bright = new $bog_gamengine_shader_post_bloom_bright;
        blur_along = new $bog_gamengine_shader_post_bloom_blur;
        blur_across = new $bog_gamengine_shader_post_bloom_blur_across;
        face() {
            return {
                glob: {
                    source: 'sampler2D',
                    texel: 'vec2',
                    extra: 'sampler2D',
                },
                pipe: {
                    pipe_uv: 'vec2',
                },
                output: { color: 'vec4' },
            };
        }
        frag() {
            return `
				void main() {
					vec4 base = texture( source, pipe_uv );
					vec3 glow = texture( extra, pipe_uv ).rgb;
					color = vec4( base.rgb + glow * 1.3, base.a );
				}
			`;
        }
        steps() {
            return [
                { shader: this.bright, scale: 2, from: 'in', extra: null },
                { shader: this.blur_along, scale: 2, from: 'prev', extra: null },
                { shader: this.blur_across, scale: 2, from: 'prev', extra: null },
                { shader: this, scale: 1, from: 'in', extra: 'prev' },
            ];
        }
    }
    $.$bog_gamengine_shader_post_bloom = $bog_gamengine_shader_post_bloom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'both entries have main'($) {
            const shader = new $bog_gamengine_shader_post_bloom;
            $mol_assert_ok(shader.vert().includes('void main()'));
            $mol_assert_ok(shader.frag().includes('void main()'));
        },
        'mix face adds the blurred sampler next to the source'($) {
            const face = new $bog_gamengine_shader_post_bloom().face();
            $mol_assert_equal(face.glob.source, 'sampler2D');
            $mol_assert_equal(face.glob.extra, 'sampler2D');
        },
        'chain is bright, two blurs at half size and a mix at full'($) {
            const shader = new $bog_gamengine_shader_post_bloom;
            const steps = shader.steps();
            $mol_assert_equal(steps.map(step => step.scale), [2, 2, 2, 1]);
            $mol_assert_equal(steps.map(step => step.from), ['in', 'prev', 'prev', 'in']);
            $mol_assert_equal(steps.map(step => step.extra), [null, null, null, 'prev']);
            $mol_assert_equal(steps[3].shader, shader);
        },
        'blurs walk different axes'($) {
            const along = new $bog_gamengine_shader_post_bloom_blur;
            const across = new $bog_gamengine_shader_post_bloom_blur_across;
            $mol_assert_ok(along.frag().includes('vec2( 1.0, 0.0 ) * texel'));
            $mol_assert_ok(across.frag().includes('vec2( 0.0, 1.0 ) * texel'));
        },
        'bright pass keeps only what is over the threshold'($) {
            const frag = new $bog_gamengine_shader_post_bloom_bright().frag();
            $mol_assert_ok(frag.includes('power - 0.4'));
        },
        'source of the mix declares both samplers'($) {
            const shader = new $bog_gamengine_shader_post_bloom;
            const source = $bog_gamengine_gl_source(shader.face(), shader.vert(), shader.frag());
            $mol_assert_ok(source.frag.includes('uniform sampler2D source;'));
            $mol_assert_ok(source.frag.includes('uniform sampler2D extra;'));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'both entries have main'($) {
            const shader = new $bog_gamengine_shader_post_tone;
            $mol_assert_ok(shader.vert().includes('void main()'));
            $mol_assert_ok(shader.frag().includes('void main()'));
        },
        'face keeps source sampler of the base pass'($) {
            const shader = new $bog_gamengine_shader_post_tone;
            $mol_assert_equal(shader.face().glob.source, 'sampler2D');
        },
        'frag rolls the tone off and keeps white white'($) {
            const shader = new $bog_gamengine_shader_post_tone;
            const frag = shader.frag();
            $mol_assert_ok(frag.includes('aces'));
            $mol_assert_ok(frag.includes('vec3 white = aces( vec3( 1.0 ) )'));
        },
        'source declares the sampler and the color output'($) {
            const shader = new $bog_gamengine_shader_post_tone;
            const source = $bog_gamengine_gl_source(shader.face(), shader.vert(), shader.frag());
            $mol_assert_ok(source.frag.includes('uniform sampler2D source;'));
            $mol_assert_ok(source.frag.includes('out vec4 color;'));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'vert has main and frag is empty main'($) {
            const shader = new $bog_gamengine_shader_depth;
            $mol_assert_ok(shader.vert().includes('void main()'));
            $mol_assert_equal(shader.frag().trim(), 'void main() {}');
        },
        'vert uses shadow_mat, inst_trans and vertex'($) {
            const shader = new $bog_gamengine_shader_depth;
            const vert = shader.vert();
            $mol_assert_ok(vert.includes('shadow_mat'));
            $mol_assert_ok(vert.includes('inst_trans'));
            $mol_assert_ok(vert.includes('vertex'));
        },
        'inputs match solid inputs in order so the same vao fits both programs'($) {
            const depth = Object.keys(new $bog_gamengine_shader_depth().face().input);
            const solid = Object.keys(new $bog_gamengine_shader_solid().face().input);
            $mol_assert_equal(depth, solid);
        },
        'sources mix only glsl both'($) {
            const shader = new $bog_gamengine_shader_depth;
            $mol_assert_equal(shader.sources().vert, $mol_3d_glsl_both + shader.vert());
            $mol_assert_equal(shader.sources().frag, $mol_3d_glsl_both + shader.frag());
        },
        'source declares shadow_mat uniform and no outputs'($) {
            const shader = new $bog_gamengine_shader_depth;
            const source = $bog_gamengine_gl_source(shader.face(), shader.vert(), shader.frag());
            $mol_assert_ok(source.vert.includes('uniform mat4 shadow_mat;'));
            $mol_assert_not(source.frag.includes('out '));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_draw_time_mock extends $mol_state_time {
        static stamp(next = 0) {
            return next;
        }
        static now(precision) {
            return this.stamp();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_draw_time_mock, "stamp", null);
    class $bog_gamengine_draw_gl_mock extends Object {
        deleted = [];
        createTexture() {
            return 'bones';
        }
        bindTexture() { }
        texStorage2D() { }
        texParameteri() { }
        deleteVertexArray(vao) {
            this.deleted.push(vao);
        }
        deleteBuffer(buffer) {
            this.deleted.push(buffer);
        }
        deleteTexture(texture) {
            this.deleted.push(texture);
        }
    }
    class $bog_gamengine_draw_mock extends $$.$bog_gamengine_draw {
        gl = new $bog_gamengine_draw_gl_mock;
        scene_mock = new $bog_gamengine_scene;
        passes_mock = null;
        context() {
            return this.gl;
        }
        scene() {
            return this.scene_mock;
        }
        passes() {
            return this.passes_mock ?? super.passes();
        }
        slot(batch) {
            const found = this.slots_all.get(batch);
            if (found)
                return found;
            const slot = new $$.$bog_gamengine_draw_slot;
            slot.batch = batch;
            slot.vao = `vao ${batch}`;
            slot.buffers = [{ native: `buffer ${batch}` }];
            this.slots_all.set(batch, slot);
            return slot;
        }
    }
    $mol_test({
        'slot of a vanished batch frees vao and buffers, the kept one stays'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            const kept = new $bog_gamengine_batch;
            kept[Symbol.toStringTag] = 'kept';
            const gone = new $bog_gamengine_batch;
            gone[Symbol.toStringTag] = 'gone';
            draw.scene().batches([kept, gone]);
            draw.slots();
            draw.scene().batches([kept]);
            draw.slots();
            $mol_assert_equal(draw.gl.deleted, ['buffer gone', 'vao gone']);
        },
        'slot with bones frees its bone texture as well'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            const gone = new $bog_gamengine_batch;
            gone[Symbol.toStringTag] = 'gone';
            draw.scene().batches([gone]);
            draw.slots()[0].bones_tex = $bog_gamengine_skin_gl_bones(draw.context());
            draw.scene().batches([]);
            draw.slots();
            $mol_assert_equal(draw.gl.deleted, ['buffer gone', 'vao gone', 'bones']);
        },
        'clear colour is the dark default until it is set'($) {
            const draw = new $$.$bog_gamengine_draw;
            draw.$ = $;
            $mol_assert_equal(draw.clear(), new Float32Array([0.08, 0.08, 0.1, 1]));
            draw.clear([0.5, 0.7, 1, 1]);
            $mol_assert_equal(draw.clear(), new Float32Array([0.5, 0.7, 1, 1]));
        },
        'report of a ready slot with bones counts its instance'($) {
            $.$mol_state_time = $bog_gamengine_draw_time_mock;
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            const slot = new $$.$bog_gamengine_draw_slot;
            slot.batch = new $bog_gamengine_batch;
            slot.batch.count = 1;
            slot.batch.cap = 1;
            slot.ready = true;
            slot.tris = 12;
            slot.bytes = 512;
            slot.bones_tex = $bog_gamengine_skin_gl_bones(draw.context());
            draw.count_fill([slot]);
            draw.measure(0, 1, 1, 2, 3, 4, 5);
            $mol_assert_equal(draw.report().instances, 1);
            $mol_assert_equal(draw.report().triangles, 12);
            $mol_assert_equal(draw.report().bytes, 512);
        },
        'light matrix puts a point on the sphere border into ±1'($) {
            const mat = $$.$bog_gamengine_draw_shadow_mat(new Float32Array([0, -1, 0]), 0, new Float32Array([1, 2, 3]), 10, new Float32Array(16));
            const round = (value) => Math.round(value * 1e6) / 1e6 + 0;
            const at = (x, y, z) => [
                round(mat[0] * x + mat[4] * y + mat[8] * z + mat[12]),
                round(mat[1] * x + mat[5] * y + mat[9] * z + mat[13]),
                round(mat[2] * x + mat[6] * y + mat[10] * z + mat[14]),
            ];
            $mol_assert_equal(at(1, 2, 3), [0, 0, 0]);
            $mol_assert_equal(at(11, 2, 3), [1, 0, 0]);
            $mol_assert_equal(at(1, 2, 13), [0, 1, 0]);
            $mol_assert_equal(at(1, -8, 3), [0, 0, 1]);
            $mol_assert_equal(at(1, 12, 3), [0, 0, -1]);
        },
        'stat without context is a string'($) {
            $.$mol_state_time = $bog_gamengine_draw_time_mock;
            const draw = new $bog_gamengine_draw;
            draw.$ = $;
            $mol_assert_equal(draw.stat(), 'frame 1 | 0.0 ms | tick 0.0 ms');
        },
        'report without context is all zeros'($) {
            $.$mol_state_time = $bog_gamengine_draw_time_mock;
            const draw = new $bog_gamengine_draw;
            draw.$ = $;
            $mol_assert_equal(draw.report(), {
                tick: 0, fill: 0, shadow: 0, main: 0, post: 0,
                batches: 0, instances: 0, draws: 0, triangles: 0, bytes: 0,
            });
        },
        'counters sum instances and triangles of ready slots only'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            const slot = (count, ready) => {
                const made = new $$.$bog_gamengine_draw_slot;
                made.batch = new $bog_gamengine_batch;
                made.batch.count = count;
                made.batch.cap = count;
                made.ready = ready;
                made.tris = 2;
                made.stride = 100;
                made.bytes = 100 * count;
                return made;
            };
            draw.count_fill([slot(3, true), slot(5, true), slot(7, false)]);
            $mol_assert_equal(draw.count_batches, 2);
            $mol_assert_equal(draw.count_instances, 8);
            $mol_assert_equal(draw.count_triangles, 16);
            $mol_assert_equal(draw.count_bytes, 800);
        },
        'chain of one pass draws straight to the screen'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            const plan = draw.post_plan();
            $mol_assert_equal(plan.length, 1);
            $mol_assert_equal(plan[0].from, 'scene');
            $mol_assert_equal(plan[0].out, null);
        },
        'bloom before tone ping-pongs half size targets and ends on the screen'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            draw.passes_mock = [new $bog_gamengine_shader_post_bloom, new $bog_gamengine_shader_post_tone];
            const plan = draw.post_plan();
            $mol_assert_equal(plan.map(step => step.from), ['scene', '2_0', '2_1', 'scene', '1_0']);
            $mol_assert_equal(plan.map(step => step.out), ['2_0', '2_1', '2_0', '1_0', null]);
            $mol_assert_equal(plan.map(step => step.extra), [null, null, null, '2_0', null]);
        },
        'chain is empty when post is off'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            draw.post(false);
            $mol_assert_equal(draw.post_plan().length, 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push(context => {
        class $mol_state_arg_mock extends $mol_state_arg {
            static $ = context;
            static href(next) { return next || ''; }
            static go(next) {
                this.href(this.link(next));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_state_arg_mock, "href", null);
        __decorate([
            $mol_action
        ], $mol_state_arg_mock, "go", null);
        context.$mol_state_arg = $mol_state_arg_mock;
    });
    $mol_test({
        'args as dictionary'($) {
            $.$mol_state_arg.href('#!foo=bar/xxx');
            $mol_assert_equal($.$mol_state_arg.dict(), { foo: 'bar', xxx: '' });
            $.$mol_state_arg.dict({ foo: null, yyy: '', lol: '123' });
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!yyy/lol=123');
        },
        'one value from args'($) {
            $.$mol_state_arg.href('#!foo=bar/xxx');
            $mol_assert_equal($.$mol_state_arg.value('foo'), 'bar');
            $mol_assert_equal($.$mol_state_arg.value('xxx'), '');
            $.$mol_state_arg.value('foo', 'lol');
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!foo=lol/xxx');
            $.$mol_state_arg.value('foo', '');
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!foo/xxx');
            $.$mol_state_arg.value('foo', null);
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!xxx');
        },
        'nested args'($) {
            const base = new $.$mol_state_arg('nested.');
            class Nested extends $mol_state_arg {
                constructor(prefix) {
                    super(base.prefix + prefix);
                }
                static value = (key, next) => base.value(key, next);
            }
            $.$mol_state_arg.href('#!foo=bar/nested.xxx=123');
            $mol_assert_equal(Nested.value('foo'), null);
            $mol_assert_equal(Nested.value('xxx'), '123');
            Nested.value('foo', 'lol');
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!foo=bar/nested.xxx=123/nested.foo=lol');
        },
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
var $;
(function ($) {
    $mol_test({
        'safe tag'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("div", null, "foo")])[0]), $mol_dom_serialize($mol_jsx("div", null, "foo")));
        },
        'bad tag'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("script", null, "alert('ahtung!')")])[0]), $mol_dom_serialize($mol_jsx($mol_jsx_frag, null, "alert('ahtung!')")));
        },
        'common attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { id: "foo" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", { id: "foo" }, "foo")));
        },
        'safe attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { href: "https://example.org/" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", { href: "https://example.org/" }, "foo")));
        },
        'bad attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { onclick: "alert('ahtung!')" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", null, "foo")));
        },
        'danger attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { href: "javascript:alert('ahtung!')" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", { href: "about:blank#javascript:alert('ahtung!')" }, "foo")));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'local get set delete'() {
            var key = '$mol_state_local_test:' + Math.random();
            $mol_assert_equal($mol_state_local.value(key), null);
            $mol_state_local.value(key, 123);
            $mol_assert_equal($mol_state_local.value(key), 123);
            $mol_state_local.value(key, null);
            $mol_assert_equal($mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test_mocks.push(context => {
        class $mol_state_local_mock extends $mol_state_local {
            static state = {};
            static value(key, next = this.state[key]) {
                return this.state[key] = (next || null);
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_state_local_mock, "value", null);
        context.$mol_state_local = $mol_state_local_mock;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class TestClass extends Uint8Array {
    }
    $mol_test({
        'Uint8Array vs itself'() {
            $mol_assert_ok($mol_compare_array(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_array(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_array(new Uint8Array([0]), new Uint8Array([1])));
        },
        'Uint8Array vs subclassed array'() {
            $mol_assert_not($mol_compare_array(new Uint8Array, new TestClass));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'decode utf8 string'() {
            const str = 'Hello, ΧΨΩЫ';
            const encoded = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171]);
            $mol_assert_equal($mol_charset_decode(encoded), str);
            $mol_assert_equal($mol_charset_decode(encoded, 'utf8'), str);
        },
        'decode empty string'() {
            const encoded = new Uint8Array([]);
            $mol_assert_equal($mol_charset_decode(encoded), '');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'encode empty'() {
            $mol_assert_equal($mol_charset_encode(''), new Uint8Array([]));
        },
        'encode 1 octet'() {
            $mol_assert_equal($mol_charset_encode('F'), new Uint8Array([0x46]));
        },
        'encode 2 octet'() {
            $mol_assert_equal($mol_charset_encode('Б'), new Uint8Array([0xd0, 0x91]));
        },
        'encode 3 octet'() {
            $mol_assert_equal($mol_charset_encode('ह'), new Uint8Array([0xe0, 0xa4, 0xb9]));
        },
        'encode 4 octet'() {
            $mol_assert_equal($mol_charset_encode('𐍈'), new Uint8Array([0xf0, 0x90, 0x8d, 0x88]));
        },
        'encode surrogate pair'() {
            $mol_assert_equal($mol_charset_encode('😀'), new Uint8Array([0xf0, 0x9f, 0x98, 0x80]));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'auto name'() {
            class Invalid extends $mol_error_mix {
            }
            const mix = new Invalid('foo');
            $mol_assert_equal(mix.name, 'Invalid_Error');
        },
        'simpe mix'() {
            const mix = new $mol_error_mix('foo', {}, new Error('bar'), new Error('lol'));
            $mol_assert_equal(mix.message, 'foo');
            $mol_assert_equal(mix.errors.map(e => e.message), ['bar', 'lol']);
        },
        'provide additional info'() {
            class Invalid extends $mol_error_mix {
            }
            const mix = new $mol_error_mix('Wrong password', {}, new Invalid('Too short', { value: 'p@ssw0rd', hint: '> 8 letters' }), new Invalid('Too simple', { value: 'p@ssw0rd', hint: 'need capital letter' }));
            const hints = [];
            if (mix instanceof $mol_error_mix) {
                for (const er of mix.errors) {
                    if (er instanceof Invalid) {
                        hints.push(er.cause?.hint ?? '');
                    }
                }
            }
            $mol_assert_equal(hints, ['> 8 letters', 'need capital letter']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            async "Get and parse"($) {
                $mol_assert_equal(await $mol_wire_async($mol_fetch).text('data:text/plain,foo'), 'foo');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $mol_locale_mock extends $mol_locale {
            lang(next = 'en') { return next; }
            static source(lang) {
                return {};
            }
        }
        __decorate([
            $mol_mem
        ], $mol_locale_mock.prototype, "lang", null);
        __decorate([
            $mol_mem_key
        ], $mol_locale_mock, "source", null);
        $.$mol_locale = $mol_locale_mock;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function project(proj, point) {
        const out = new Float32Array(4);
        for (let i = 0; i < 4; ++i) {
            out[i] = proj[i] * point[0] + proj[4 + i] * point[1] + proj[8 + i] * point[2] + proj[12 + i] * point[3];
        }
        return out;
    }
    $mol_test({
        'deep camera maps near plane to z = -1'() {
            const cam = new $bog_gamengine_cam_deep;
            const out = project(cam.proj(1), [0, 0, -cam.near(), 1]);
            $mol_assert_ok(Math.abs(out[2] / out[3] + 1) < 1e-6);
        },
        'deep camera maps far plane to z = 1'() {
            const cam = new $bog_gamengine_cam_deep;
            const out = project(cam.proj(1), [0, 0, -cam.far(), 1]);
            $mol_assert_ok(Math.abs(out[2] / out[3] - 1) < 1e-6);
        },
        'follow puts the camera over the node with its turn'() {
            const node = new $bog_gamengine_node;
            node.pos(new Float32Array([2, 1, -3]));
            node.rot(new Float32Array([0.25, 0.5, 0]));
            const cam = new $bog_gamengine_cam_deep;
            cam.follow(node);
            cam.lift(0.5);
            cam.step(1 / 60);
            $mol_assert_equal(Array.from(cam.pos()), [2, 1.5, -3]);
            $mol_assert_equal(Array.from(cam.rot()), [0.25, 0.5, 0]);
        },
        'follow of nothing leaves the camera alone'() {
            const cam = new $bog_gamengine_cam_deep;
            const pos = cam.pos();
            cam.step(1 / 60);
            $mol_assert_equal(cam.pos(), pos);
        },
    });
})($ || ($ = {}));


//# sourceMappingURL=web.test.js.map
