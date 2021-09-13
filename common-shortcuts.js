// ==UserScript==
// @name            Common ShortCuts
// @namespace       shortcut-js
// @version         1.xx
// @description     Try to take over the world!
// @author          Michael Gao
// @include         http*
// @grant           none
// ==/UserScript==
;
console.info('Monkey ShortCuts0721');
const KEYCODEMAP = {
	'8': 'BackSpace BackSpace',
	'9': 'Tab Tab',
	'12': 'Clear',
	'13': 'Enter',
	'16': 'Shift_L',
	'17': 'Control_L',
	'18': 'Alt_L',
	'19': 'Pause',
	'20': 'Caps_Lock',
	'27': 'Escape Escape',
	'32': 'space',
	'33': 'Prior',
	'34': 'Next',
	'35': 'End',
	'36': 'Home',
	'37': 'Left',
	'38': 'Up',
	'39': 'Right',
	'40': 'Down',
	'41': 'Select',
	'42': 'Print',
	'43': 'Execute',
	'45': 'Insert',
	'46': 'Delete',
	'47': 'Help',
	'48': '0 equal braceright',
	'49': '1 exclam onesuperior',
	'50': '2 quotedbl twosuperior',
	'51': '3 section threesuperior',
	'52': '4 dollar',
	'53': '5 percent',
	'54': '6 ampersand',
	'55': '7 slash braceleft',
	'56': '8 parenleft bracketleft',
	'57': '9 parenright bracketright',
	'65': 'a A',
	'66': 'b B',
	'67': 'c C',
	'68': 'd D',
	'69': 'e E EuroSign',
	'70': 'f F',
	'71': 'g G',
	'72': 'h H',
	'73': 'i I',
	'74': 'j J',
	'75': 'k K',
	'76': 'l L',
	'77': 'm M mu',
	'78': 'n N',
	'79': 'o O',
	'80': 'p P',
	'81': 'q Q at',
	'82': 'r R',
	'83': 's S',
	'84': 't T',
	'85': 'u U',
	'86': 'v V',
	'87': 'w W',
	'88': 'x X',
	'89': 'y Y',
	'90': 'z Z',
	'96': 'KP_0 KP_0',
	'97': 'KP_1 KP_1',
	'98': 'KP_2 KP_2',
	'99': 'KP_3 KP_3',
	'100': 'KP_4 KP_4',
	'101': 'KP_5 KP_5',
	'102': 'KP_6 KP_6',
	'103': 'KP_7 KP_7',
	'104': 'KP_8 KP_8',
	'105': 'KP_9 KP_9',
	'106': 'KP_Multiply KP_Multiply',
	'107': 'KP_Add KP_Add',
	'108': 'KP_Separator KP_Separator',
	'109': 'KP_Subtract KP_Subtract',
	'110': 'KP_Decimal KP_Decimal',
	'111': 'KP_Divide KP_Divide',
	'112': 'F1',
	'113': 'F2',
	'114': 'F3',
	'115': 'F4',
	'116': 'F5',
	'117': 'F6',
	'118': 'F7',
	'119': 'F8',
	'120': 'F9',
	'121': 'F10',
	'122': 'F11',
	'123': 'F12',
	'124': 'F13',
	'125': 'F14',
	'126': 'F15',
	'127': 'F16',
	'128': 'F17',
	'129': 'F18',
	'130': 'F19',
	'131': 'F20',
	'132': 'F21',
	'133': 'F22',
	'134': 'F23',
	'135': 'F24',
	'136': 'Num_Lock',
	'137': 'Scroll_Lock',
	'187': 'acute grave',
	'188': 'comma semicolon',
	'189': 'minus underscore',
	'190': 'period colon',
	'192': 'numbersign apostrophe',
	'210': 'plusminus hyphen macron',
	'212': 'copyright registered',
	'213': 'guillemotleft guillemotright',
	'214': 'masculine ordfeminine',
	'215': 'ae AE',
	'216': 'cent yen',
	'217': 'questiondown exclamdown',
	'218': 'onequarter onehalf threequarters',
	'220': 'less greater bar',
	'221': 'plus asterisk asciitilde',
	'227': 'multiply division',
	'228': 'acircumflex Acircumflex',
	'229': 'ecircumflex Ecircumflex',
	'230': 'icircumflex Icircumflex',
	'231': 'ocircumflex Ocircumflex',
	'232': 'ucircumflex Ucircumflex',
	'233': 'ntilde Ntilde',
	'234': 'yacute Yacute',
	'235': 'oslash Ooblique',
	'236': 'aring Aring',
	'237': 'ccedilla Ccedilla',
	'238': 'thorn THORN',
	'239': 'eth ETH',
	'240': 'diaeresis cedilla currency',
	'241': 'agrave Agrave atilde Atilde',
	'242': 'egrave Egrave',
	'243': 'igrave Igrave',
	'244': 'ograve Ograve otilde Otilde',
	'245': 'ugrave Ugrave',
	'246': 'adiaeresis Adiaeresis',
	'247': 'ediaeresis Ediaeresis',
	'248': 'idiaeresis Idiaeresis',
	'249': 'odiaeresis Odiaeresis',
	'250': 'udiaeresis Udiaeresis',
	'251': 'ssharp question backslash',
	'252': 'asciicircum degree',
	'253': '3 sterling',
	'254': 'Mode_switch',
};
const HREF = window.location.href;
const ISDAM = HREF.indexOf('huawei.com/assets.html') >= 0;
const ISAEM = HREF.indexOf('huawei.com/sites.html') >= 0;
const ISAEMDAM = ISDAM || ISAEM;
const ISEDIT = HREF.indexOf('huawei.com/editor.html') >= 0;
let ssStorage = window.sessionStorage || (window.UserDataStorage && new UserDataStorage()) || new cookieStorage();
let mousePos = {
	x: 0,
	y: 0,
};

function Throttle(fn, wait = 1000, options = {}) {
	let timer;
	let previous = 0;
	let throttled = function () {
		let now = +new Date();
		// remaining 不触发下一次函数的剩余时间
		if (!previous && options.leading === false) previous = now;
		let remaining = wait - (now - previous);
		if (remaining < 0) {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			previous = now;
			fn.apply(this, arguments)
		} else if (!timer && options.trailing !== false) {
			timer = setTimeout(() => {
				previous = options.leading === false ? 0 : new Date().getTime();
				timer = null;
				fn.apply(this, arguments);
			}, remaining);
		}
	}
	return throttled;
}

function UpdateMousePos(e) {
	mousePos.x = e.clientX || e.offsetX || e.layerX;
	mousePos.y = e.clientY || e.offsetY || e.layerY;
}

function HandleKey(e, s, c) {
	let isShift, isAlt, isCtrl, pressedAlt, pressedCtrl, pressedShift, kc, rKeys, rKey, isKey;
	kc = e.keyCode || e.which || e.charCode;
	rKeys = s.split('+');
	rKey = rKeys[rKeys.length - 1];
	pressedAlt = e.altKey;
	pressedCtrl = e.ctrlKey;
	pressedShift = e.shiftKey;
	isAlt = rKeys.indexOf('alt') > -1 ? true : false;
	isCtrl = rKeys.indexOf('ctrl') > -1 ? true : false;
	isShift = rKeys.indexOf('shift') > -1 ? true : false;
	isKey = KEYCODEMAP[kc].indexOf(rKey) > -1;
	if (isAlt === pressedAlt && isCtrl === pressedCtrl && isShift === pressedShift && isKey) {
		c();
	}
}

function GetAllEles(s) {
	return [].slice.call(document.querySelectorAll(s));
}

function ScrollUp(s, x, b = true) {
	let doms = GetAllEles(s);
	doms.some(function (e) {
		let eb = e.getBoundingClientRect();
		let eX = eb.x || eb.left;
		let eW = eb.width;
		let eH = eb.height;
		if (x >= eX && x <= eX + eW) {
			e.scrollTo({
				top: b ? e.scrollTop - eH : e.scrollTop + eH,
				behavior: 'smooth',
			});
			console.info(e.scrollTop + eH);
			return true;
		}
	});
}
let keyToFun = {
	'alt+w': function () {
		console.info('----Scroll to Top');
		window.scrollTo(0, 0);
		if (ISAEMDAM) {
			ScrollUp('coral-columnview-column-content', mousePos.x);
		}
	},
	'alt+x': function () {
		console.info('----Scroll to Bottom');
		window.scrollTo(0, document.body.scrollHeight || document.body.clientHeight);
		if (ISAEMDAM) {
			ScrollUp('coral-columnview-column-content', mousePos.x, false);
		}
	},
	'alt+c': function () {
		console.info('----Copy URL...');
		if (document.execCommand) {
			let tInput = document.createElement('input');
			tInput.value = window.location.href;
			document.body.appendChild(tInput);
			tInput.select();
			console.info(document.execCommand('copy') ? 'Copied!' : 'Copy failed!');
			document.body.removeChild(tInput);
		}
	},
	'shift+r': function () {
		console.info('----Clear all browser data');
		if (ssStorage) {
			Object.keys(ssStorage).map(function (e) {
				ssStorage.removeItem(e);
			});
		}
	},
}
let throttleMousePos = Throttle(UpdateMousePos, 200);
document.addEventListener('keydown', function (e) {
	Object.keys(keyToFun).map(k => HandleKey(e, k, keyToFun[k]));
});
document.body.addEventListener('mousemove', function (e) {
	e = e || window.event;
	throttleMousePos(e);
});