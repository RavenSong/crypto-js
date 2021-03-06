YUI.add('lib-wordarray-test', function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'WordArray',

        testInit0: function () {
            Y.Assert.areEqual('', C.lib.WordArray.create());
        },

        testInit1: function () {
            Y.Assert.areEqual('12345678', C.lib.WordArray.create([0x12345678]));
        },

        testInit2: function () {
            Y.Assert.areEqual('1234', C.lib.WordArray.create([0x12345678], 2));
        },

        testToStringPassedEncoder: function () {
            Y.Assert.areEqual('\x12\x34\x56\x78', C.lib.WordArray.create([0x12345678]).toString(C.enc.Latin1));
        },

        testToStringDefaultEncoder: function () {
            Y.Assert.areEqual('12345678', C.lib.WordArray.create([0x12345678]));
        },

        testConcat3: function () {
            var wordArray1 = C.lib.WordArray.create([0x12345678], 3);
            var wordArray2 = C.lib.WordArray.create([0x12345678], 3);

            Y.Assert.areEqual('123456123456', wordArray1.concat(wordArray2));
            Y.Assert.areEqual('123456123456', wordArray1);
        },

        testConcat4: function () {
            var wordArray1 = C.lib.WordArray.create([0x12345678], 4);
            var wordArray2 = C.lib.WordArray.create([0x12345678], 3);

            Y.Assert.areEqual('12345678123456', wordArray1.concat(wordArray2));
            Y.Assert.areEqual('12345678123456', wordArray1);
        },

        testConcat5: function () {
            var wordArray1 = C.lib.WordArray.create([0x12345678], 5);
            var wordArray2 = C.lib.WordArray.create([0x12345678], 3);

            Y.Assert.areEqual('1234567800123456', wordArray1.concat(wordArray2));
            Y.Assert.areEqual('1234567800123456', wordArray1);
        },

        testClamp: function () {
            var wordArray = C.lib.WordArray.create([0x12345678, 0x12345678], 3);
            wordArray.clamp();

            Y.Assert.areEqual([0x12345600].toString(), wordArray.words);
        },

        testClone: function () {
            var wordArray = C.lib.WordArray.create([0x12345678]);
            var clone = wordArray.clone();
            clone.words[0] = 0;

            Y.Assert.areNotEqual(wordArray.toString(), clone);
        },

        testRandom: function () {
            Y.Assert.areNotEqual(C.lib.WordArray.random(8).toString(), C.lib.WordArray.random(8).toString());
            Y.Assert.areEqual(8, C.lib.WordArray.random(8).sigBytes);
        }
    }));
}, '$Rev$');
