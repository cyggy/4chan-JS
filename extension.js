/********************************
 *                              *
 *        4chan Extension       *
 *                              *
 ********************************/

$ = function( selector, root )
{
	if( !/ /.test(selector) ) {
		if( selector.charAt(0) === '#' && !root ) return document.getElementById(selector.substr(1));

		if( selector.charAt(0) === '.' ) {
			if( root == null ) root = document.body;
			return root.getElementsByClassName(selector.substr(1))[0];
		}
	}

	if( root == null ) root = document.body;
	return root.querySelector( selector );
};

$.ga = function( selector, root )
{
	if( typeof selector != 'string' ) return selector;
	if( typeof root == 'string' ) root = $(root);

	if( root == null ) root = document.body;

	if( !/ /.test(selector) && selector.charAt(0) === '.' ) return root.getElementsByClassName(selector.substr(1));
	return root.querySelectorAll( selector );
};

$.get = function( url, callbacks, headers )
{
	var key, x = new XMLHttpRequest();
	x.open( 'GET', url );
	x.onload = onload;
	x.onerror = onerror;
	x.timeout = 25000;
	if (callbacks) {
		for (key in callbacks) {
			x[key] = callbacks[key];
		}
	}
	if (headers) {
		for (key in headers) {
			x.setRequestHeader(key, headers[key]);
		}
	}
	x.send(null);
};

$.remove = function( selector, remove )
{
	var remove = $.ga( remove, selector );
	var len = remove.length;

	for( var i = 0; i < len; i++ ) {
		if( remove[i] ) remove[i].parentNode.removeChild(remove[i]);
	}
};

$.css = function( selector, css )
{
	selector = $.ga( selector );
	var len = selector.length;
	var key = css[0];
	var val = css[1];
	var regKey = new RegExp(key);
	var repReg = new RegExp("(" + key + "): ?([^;]);?" );

	for( var i = 0; i < len; i++ ) {
		var cur = selector[i];
		var style = cur.getAttribute('style') ? cur.getAttribute('style') : '';
		if( style != '' && style.substr(style.length-1) != ';' ) style += ';';


		if( regKey.test(style) ) {
			cur.setAttribute('style', style.replace(repReg, key + ':' + val + ';'));
		} else {
			cur.setAttribute('style', style + key + ':' + val + ';');
		}
	}
};

$.addClass = function( selector, className )
{
	selector = $.ga( selector );
	var len = selector.length;

	for( var i = 0; i < len; i++ ) {
		selector[i].setAttribute('class', selector[i].getAttribute('class') + ' ' + className);
	}
};

$.removeClass = function( selector, className )
{
	selector = $.ga( selector );
	var len = selector.length;

	var classMatch = new RegExp('[^| ]' + className + '[ |$]', 'g');

	for( var i = 0; i < len; i++ ) {
		selector[i].setAttribute('class', selector[i].getAttribute('style').replace(classMatch, ''));
	}
};

$.round = function( value, precision )
{
	// From php.js
	// http://phpjs.org/functions/round:505
	var m, f, isHalf, sgn; // Helper variables
    precision |= 0; // Making sure precision is integer
    m = Math.pow(10, precision);
    value *= m;
    sgn = (value > 0) | -(value < 0); // Sign of the number
    isHalf = value % 1 === 0.5 * sgn;
    f = Math.floor(value);

	if( isHalf ) {
		value = f + (sgn > 0);
	}

	return (isHalf ? value: Math.round(value)) / m;
};

$.click = function( elem, bindFunction )
{
	elem.addEventListener('click', bindFunction, true);
};

$.unbind = function( elem, bind )
{
	elem.removeEventListener(bind);
};

$.bind = function( elem, bind, bindTo )
{
	elem.addEventListener(bind, bindTo, true);
};

$.submit = function( elem, bindFunction )
{
	elem.addEventListener('submit', bindFunction, true);
};

$.load = function( elem, bindFunction )
{
	elem.addEventListener('load', bindFunction, true);
};

$.mouseover = function( elem, bindFunction )
{
	elem.addEventListener('mouseover', bindFunction, true);
};

$.mouseout = function( elem, bindFunction )
{
	elem.addEventListener('mouseout', bindFunction, true);
};

$.mousemove = function( elem, bindFunction )
{
	elem.addEventListener( 'mousemove', bindFunction, true );
};

$.mousedown = function( elem, bindFunction )
{
	elem.addEventListener( 'mousedown', bindFunction, true );
};

$.mouseup = function( elem, bindFunction )
{
	elem.addEventListener( 'mouseup', bindFunction, true );
};

$.keydown = function( elem, bindFunction )
{
	elem.addEventListener( 'keydown', bindFunction, true );
};

$.scroll = function( elem, bindFunction )
{
	elem.addEventListener( 'DOMMouseScroll', bindFunction, true );
};

$.parseNo = function(id)
{
	var no = id.match(/(\d+)$/);
	if( !no ) {
		console.log('Could not parse id from ' + id);
		return false;
	}

	return no[1];
};

$.parseButton = function(id)
{
	var button = id.match(/_(\d+)_(\d+)$/);
	if( !button ) {
		console.log('Could not parse thread/id from ' + id);
		return false;
	}

	return [button[1], button[2]];
};

$.prepend = function( selector, prepend )
{
	if( typeof selector == 'string' ) selector = $(selector);
	if( typeof prepend == 'string' ) prepend = $.parseHtml(prepend);

	var nodeSelect = 0;

	if( prepend.length > 1 && prepend.nodeType != 3 ) {
		var len = prepend.length;
		for( var i = 0; i < len; i++ ) {
			if( typeof prepend[i] == 'string' ) prepend[i] = $.parseHtml(prepend[i]);
			selector.insertBefore(prepend[i], selector.childNodes[nodeSelect]);
			nodeSelect++;
		}

		return;
	}

	selector.insertBefore(prepend, selector.childNodes[nodeSelect]);
};

$.append = function( selector, append )
{
	if( typeof selector == 'string' ) selector = $(selector);
	if( typeof append == 'string' ) append = $.parseHtml(append);

	if( append.length > 1 && append.nodeType != 3 ) {
		var len = append.length;
		for( var i = 0; i < len; i++ ) {
			if( typeof append[i] == 'string' ) append[i] = $.parseHtml(append[i]);
			selector.appendChild(append[i]);
		}

		return;
	}

	selector.appendChild(append);
};

$.after = function( selector, after )
{
	if( typeof selector == 'string' ) selector = $(selector);
	if( typeof after == 'string' ) after = $.parseHtml(after);

	var parent = selector.parentNode;

	if( parent.lastChild == selector ) {
		parent.appendChild(after);
	} else {
		parent.insertBefore(after, selector.nextSibling);
	}
};

$.html = function( selector, html )
{
	if( typeof selector == 'string' ) selector = $(selector);
	if( typeof html == 'string' ) html = $.parseHtml(html);

	// first scrap anything we have
	selector.innerHTML = '';

	// start appending!
	$.append( selector, html );
};


$.parseHtml = function(html)
{
	var root;

	if( html.match(/</) ) {
		root = document.createElement('div');
		root.innerHTML = html;

		return root.childNodes[0];
	} else {
		root = document.createTextNode( html );
	}

	return root;
};

// Take a JSON array and spit out 4chan HTML
$.buildHTMLFromJSON = function( arr, board )
{
	var
		container = document.createElement('div'),
		isOP = false,
		
		userId,
		fileDims = '',
		imgSrc = '',
		fileBuildStart = '',
		fileBuildEnd = '',
		fileInfo = '',
		fileHtml = '',
		shortSubject = '',
		fileSize = '',
		fileClass = '',
		shortFile = '',
		longFile = '',
		capcodeStart = '',
		capcodeClass = '',
		capcode = '',
		flag,
		highlight = '',
		emailStart = '',
		emailEnd = '',
			
		staticPath = '//static.4chan.org',
		imgDir = '//images.4chan.org/' + board + '/src';
	
	if (arr.resto == 0) {
		isOP = true;
		arr.resto = arr.no;
	}
	
	var noLink = arr.resto + '#p' + arr.no;
	var quoteLink = noLink.replace('p', 'q');

	if ((arr.capcode == 'none') && arr.id) {
		userId = '<span class="posteruid id_'
			+ arr.id + '">(ID: <span class="hand" title="Highlight posts by this ID">'
			+ arr.id + '</span>)</span> ';
	}
	else {
		userId = '';
	}
	
	switch( arr.capcode ) {
		case 'admin':
			capcodeStart = ' <strong class="capcode hand id_admin" title="Highlight posts by the Administrator">## Admin</strong>';
			capcodeClass = ' capcodeAdmin';

			capcode = ' <img src="' + staticPath + '/image/adminicon.gif" alt="This user is the 4chan Administrator." title="This user is the 4chan Administrator." class="identityIcon"/>';
			break;
		
		case 'mod':
			capcodeStart = ' <strong class="capcode hand id_mod" title="Highlight posts by Moderators">## Moderator</strong>';
			capcodeClass = ' capcodeMod';

			capcode = ' <img src="' + staticPath + '/image/modicon.gif" alt="This user is a 4chan Moderator." title="This user is a 4chan Moderator." class="identityIcon"/>';
			break;

		case 'developer':
			capcodeStart = ' <strong class="capcode hand id_developer" title="Highlight posts by Developers">## Developer</strong>';
			capcodeClass = ' capcodeDeveloper';

			capcode = ' <img src="' + staticPath + '/image/developericon.gif" alt="This user is a 4chan Developer." title="This user is a 4chan Developer." class="identityIcon"/>';
			break;

		default:
			break;

	}

	if( arr.email ) {
		emailStart = '<a href="mailto:' + arr.email.replace(/ /g, '%20') + '" class="useremail">';
		emailEnd = '</a>';
	}
	
	if (arr.flag) {
		flag = '<img src="' + staticPath + '/image/country/'
			+ arr.flag + '.gif" alt="' + (arr.flagcode || arr.flagname) + '" title="'
			+ arr.flagname + '" class="countryFlag"> ';
	}
	else {
		flag = '';
	}

	if( arr.ext ) {
		shortFile = longFile = arr.filename + arr.ext;
		if( arr.filename.length > 40 ) {
			shortFile = arr.filename.slice(0, 35) + '(...)' + arr.ext;
		}

		if( !arr.tn_w && !arr.tn_h && arr.ext == '.gif' ) {
			arr.tn_w = arr.w;
			arr.tn_h = arr.h;
		}

		if( arr.fsize >= 1048576 ) {
			fileSize = $.round( arr.fsize/1048576, 2 ) + ' M';
		} else if( arr.fsize > 1024 ) {
			fileSize = $.round( arr.fsize / 1024 ) + ' K';
		} else {
			fileSize = arr.fsize + ' ';
		}

		if( arr.spoiler ) {
			fileSize = 'Spoiler Image, ' + fileSize;
			fileClass = ' imgspoiler';

			var fileThumb = '//static.4chan.org/image/spoiler-' + board + '.png';
			arr.tn_w = 100;
			arr.tn_h = 100;
		} else {
			fileThumb = '//thumbs.4chan.org/' + board + '/thumb/' + arr.tim + 's.jpg';
		}

		imgSrc = '<a class="fileThumb' + fileClass + '" href="' + imgDir + '/' + arr.tim + arr.ext + '" target="_blank"><img src="' + fileThumb + '" alt="' + fileSize + 'B" data-md5="' + arr.md5 + '" style="height: ' + arr.tn_h + 'px; width: ' + arr.tn_w + 'px;"></a>';

		if( arr.filedeleted ) {
			imgSrc = '<span class="fileThumb"><img src="' + staticPath + '/image/filedeleted-res.gif" alt="File deleted."></span>';
			fileInfo = '';
		} else {
			fileDims = arr.ext == '.pdf' ? 'PDF' : arr.w + 'x' + arr.h;
			fileInfo = '<span class="fileText" id="fT' + arr.no + '">File: <a href="' + imgDir + '/' + arr.tim + arr.ext + '" target="_blank">' + arr.tim + arr.ext + '</a>-(' + fileSize + 'B, ' + fileDims + ', <span title="' + longFile + '">' + shortFile + '</span>)</span>';
		}

		fileBuildStart = fileInfo ? '<div class="fileInfo">' : '';
		fileBuildEnd = fileInfo ? '</div>' : '';

		fileHtml = '<div id="f' + arr.no + '" class="file">'
			+ fileBuildStart + fileInfo + fileBuildEnd + imgSrc + '</div>';
	}

	shortSubject = arr.sub;
	if( shortSubject.length > 28 ) {
		shortSubject = arr.sub.replace('&#44;', ',');
		shortSubject = '<span title="' + shortSubject + '">' + shortSubject.substring(0, 23) + '(...)</span>';
	}

	container.className = 'postContainer replyContainer';
	container.id = 'pc' + arr.no;
	
	container.innerHTML =
		'<div class="sideArrows" id="sa' + arr.no + '">&gt;&gt;</div>' +
		'<div id="p' + arr.no + '" class="post ' + (isOP ? 'op' : 'reply') + highlight + '">' +
			'<div class="postInfoM mobile" id="pim' + arr.no + '">' +
				'<span class="nameBlock' + capcodeClass + '"> ' + emailStart +
				'<span class="name">' + arr.name + '</span> ' +
				emailEnd + capcodeStart + emailEnd + userId + flag +
				'<br><span class="subject">' + arr.sub +
				'</span></span><span class="dateTime postNum" data-utc="' + arr.time + '">' +
				arr.now + '<br><em><a href="' + arr.no + '#p' + arr.no + '">No.</a>' +
				'<a href="javascript:quote(\'' + arr.no + '\');">' + arr.no + '</a></em></span>' +
			'</div>' +
			(isOP ? fileHtml : '') +
			'<div class="postInfo desktop" id="pi' + arr.no + '">' +
				'<input type="checkbox" name="' + arr.no + '" value="delete"> ' +
				'<span class="subject">' + arr.sub + '</span> ' +
				'<span class="nameBlock' + capcodeClass + '"> ' +
					emailStart + '<span class="name">' + arr.name + '</span> ' + emailEnd
					+ capcodeStart + emailEnd + userId + flag +
				'</span> ' +
	
				'<span class="dateTime" data-utc="' + arr.time + '">' + arr.now + '</span> ' +
	
				'<span class="postNum desktop">' +
					'<a href="' + noLink + '" title="Highlight this post">No.</a><a href="' +
					quoteLink + '">' + arr.no + '</a>' +
				'</span>' +
			'</div>' +
			(isOP ? '' : fileHtml) +
			'<blockquote class="postMessage" id="m' + arr.no + '">' + arr.com + '</blockquote> ' +
		'</div>';
		
	return container;
};

$.buildButton = function( id, threadId, text, func, textonly, style )
{
	style = style ? style : '';

	var elem = document.createElement( 'a' );
	elem.setAttribute( 'id', text + '_' + threadId + '_' + id );
	elem.setAttribute( 'href', 'javascript:void(0);' );
	elem.setAttribute( 'style', 'text-decoration: none; font-size: 9pt;' + style );
	elem.setAttribute( 'class', 'extButton' );

	elem.innerHTML = textonly ? text : '[ ' + text + ' ]';

	$.click(elem, func);

	return elem;
};

$.findPos = function( elem )
{
	if( typeof elem == 'string' ) elem = $(elem);

	var leftpos = 0, toppos = 0;
	if (elem.offsetParent) {
		do {
			leftpos += elem.offsetLeft;
			toppos += elem.offsetTop;
		} while (elem = elem.offsetParent);
	}

	return [ toppos, leftpos ];
};

$.cursorToEnd = function( el )
{
	if (typeof el.selectionStart == "number") {
		el.selectionStart = el.selectionEnd = el.value.length;
	} else if (typeof el.createTextRange != "undefined") {
		el.focus();
		var range = el.createTextRange();
		range.collapse(false);
		range.select();
	}
};

var drag = new Object();
drag.dragging = false;
drag.currentDraggingObject = null;
drag.curleft = null;
drag.curtop = null;
drag.x = null;
drag.y = null;

$.drag = function(e)
{
	var elem = e.target;
	while( elem.tagName != 'body' ) {
		if( elem.className && elem.className.match('draggable') ) break;
		elem = elem.parentNode;
	}

	if( !elem.className ) return false;

	if( elem.className.match( 'draggable' ) ) {
		drag.dragging = true;
		drag.currentDraggingObject = elem;

		drag.curleft = parseInt( elem.style.left + 0 );
		drag.curtop  = parseInt( elem.style.top );

		drag.x = e.clientX;
		drag.y = e.clientY;

		$.mousemove(document, function(e) {
			$.doDrag(e);
			return false;
		});
	}
};

$.doDrag = function(e)
{
	if( !drag.dragging ) return true;

	var obj = drag.currentDraggingObject;
	obj.style.left = (drag.curleft + e.clientX - drag.x + 'px');
	obj.style.top  = (drag.curtop + e.clientY - drag.y + 'px');

	return false;
};

$.endDrag = function()
{
	drag.dragging = false;
};

/********************************
 *                              *
 *        START: PARSER         *
 *                              *
 ********************************/

var parser = new Object();

parser.handleOnClick = function( e )
{
	switch( e.target.localName )
	{
		case 'img':
			parser.imageClick(e);
			break;
	}
};

parser.parseBoard = function()
{
	var threads = $.ga('div[id^="t"]');
	var len = threads.length;

	for( var i = 0; i < len; i++ ) {
		parser.parseThread( threads[i].getAttribute('id') );
	}
};

parser.parseThread = function( id, offset )
{
	var i, j, posts, threadId;
	
	if( !$('#' + id) ) {
		console.log('Tried to parse thread id ' + id + ' but could not find the element.');
		return false;
	}
	
	threadId = $.parseNo(id);

	posts = document.getElementsByClassName('post');
	
	i = offset ? posts.length - offset : 0;
	for (j = posts.length; i < j; ++i) {
		parser.parsePost( posts[i].id, threadId );
	}
};

parser.parsePost = function( id, threadId )
{
	var postNo = $.parseNo(id);
	var img = $('#fT' + postNo);
	
	if( config.gs( 'enable_quick_reply' ) && postNo == threadId && config.__viewing == 'board' ) {
		$.append(
			'#pi' + postNo + ' .postNum',
			[
				'[',
				'<a href="javascript:void(0);" class="replylink" id="qrButton_' + threadId + '_' + postNo + '">Quick Reply</a>',
				']'
			]
		);

		$.click(
			$('#qrButton_' + threadId + '_' + postNo),
			parser.quoteButtonClick
		);
	}

	if( config.gs('enable_quick_quote') && config.gs('enable_quick_reply') ) {
		var quickReply = [$.buildButton( postNo, threadId, 'Q', parser.quoteButtonClick ), ' '];
	} else {
		var quickReply = ['',''];
	}

	$.append(
		'#pi' + postNo,
		[
			' ',
			quickReply[0], quickReply[1],
			$.buildButton( postNo, threadId, '!', parser.reportButtonClick ),
			' ',
			$.buildButton( postNo, threadId, '^', parser.topButtonClick ),
			' '
		]
	);

	if( config.gs('enable_image_search') && img ) {
		$.append(
			img,
			[
				' ',
				$.buildButton( postNo, threadId, 'Google', parser.imageSearchButton, 1 ),
				' ',
				$.buildButton( postNo, threadId, 'tineye', parser.imageSearchButton, 1 ),
				' ',
				$.buildButton( postNo, threadId, 'iqdb', parser.imageSearchButton, 1 )
			]
		);
	}

	if( config.gs( 'enable_backlinking' ) ) {
		parser.parseBacklink( postNo );
	}

	if( postNo == threadId )
	{
		$.prepend( '#p' + postNo, '<span id="sa' + threadId + '" class="postHideButton"></span>' );
		$.html( $('#sa' + postNo), $.buildButton( postNo, threadId, '-', parser.togglePost, 0, 'float: left; margin-right: 5px;' ) );

	}

	else
	{
		$.html( $('#sa' + postNo), $.buildButton( postNo, threadId, '-', parser.togglePost, 0, 'margin-right: 5px;' ) );
	}
};

parser.parseBacklink = function( postno )
{
	var len;

	// Get all links
	var links = $.ga('.quotelink', $('#m' + postno));
	if( !(len = links.length) ) return;


	var currentLink, href, info, board, thread, post, parent, bl, append;
	board = config.__board;

	for( var i = 0; i < len; i++ ) {
		currentLink = links[i];
		href = currentLink.getAttribute('href');

		// Is it this board?
		if( !/(\d+)#p(\d+)$/.test(href) ) continue;

		info = href.match( /(\d+)#p(\d+)$/ );
		if( !info ) continue;

		thread = info[1];
		post = info[2];

		// Can we see the post we're trying to put this backlink onto
		parent = config.gs('x_compat') ? $('#pi' + post) : $('#p' + post);
		if( !parent ) continue; // no.

		// Yes, do we have a backlink struct already?
		if( $('#bl_' + postno + '_' + post) ) continue;

		bl = config.gs('x_compat') ? $('#pi' + post) : $('#bl' + post);
		append = [ '<span id="bl_' + postno + '_' + post + '"><a href="#p' + postno + '" class="quotelink">&gt;&gt;' + postno + '</a></span>', ' ' ];

		if( !bl && !config.gs( 'x_compat' ) ) {
			$.append( parent, ['<hr class="backlinkHr">', '<div class="backlink" id="bl' + post + '"><strong>Replies to this post:</strong><br></div>' ] );
			bl = $('#bl' + post);
		}

		$.append( bl, append );
	}

};

/** IMAGE RELATED FUNCTIONS **/

parser.imageSearchButton = function( e )
{
	var post = $.parseButton(e.target.getAttribute('id'))[1];
	var name = e.target.getAttribute('id').match( /^(\w+?)_/ )[1].toLowerCase();

	var image = 'https:' + $('#f' + post + ' .fileThumb img').getAttribute('src');
	var url = '';

	switch( name )
	{
		case 'google':
			url = 'https://www.google.com/searchbyimage?image_url=' + image;
			break;

		case 'iqdb':

			break;

		case 'tineye':
			url = 'https://www.tineye.com/search?url=' + image;
			break;
	}

	window.open( url );
};

parser.imageClick = function( e )
{
	obj = e.target;
	if( !obj.getAttribute('data-md5') ) return true;

	var id = $.parseNo(obj.parentNode.parentNode.getAttribute('id'));

	if( e.button == 1 || e.button == 2 ) return true;
	e.preventDefault();
	parser.expandImage(id);

};

parser.expandImage = function(id)
{
	var img = $('#f' + id + ' .fileThumb img');

	if( img.getAttribute('src').match(/(\/thumb\/|spoiler)/) ) {
		img.removeAttribute('style');

		if( !img.getAttribute('data-thumburl') ) {
			img.style.opacity = 0.5;
		}

		img.setAttribute('data-thumburl', img.getAttribute('src'));
		img.setAttribute('src', img.parentNode.getAttribute('href'));

		$.load(img, function() {
			this.style.opacity = 1;

			this.parentNode.className += ' fitToPage';
		});
	} else {
		img.onload = null;
		img.setAttribute('src', img.getAttribute('data-thumburl'));
		img.parentNode.className = img.parentNode.className.replace(' fitToPage', '');
	}
};

/** POST HIDING/EXPANDING **/
parser.togglePost = function(e)
{
	// [THREAD, POST]
	var no = $.parseButton( e.target.getAttribute('id') );

	if( /postHidden/.test(e.target.getAttribute('class')) ) {
		// We need to expand
		parser.expandPost(no);
	} else {
		parser.collapsePost(no);
	}
};

parser.expandPost = function(id)
{

};

parser.collapsePost = function(id)
{
	var threadno = id[0];
	var postno = id[1];

	var post = $('#p' + postno);
	$.addClass( post, 'postHidden' );

	console.log(threadno, postno);

	if(	threadno == postno ) {
		// We have a thread. Collapse it!
		$.css( '#t' + threadno + ' > div.replyContainer, #t' + threadno + ' .summary', ['display', 'none'] );

	}


};


parser.quoteButtonClick = function(e)
{
	var info = $.parseButton(e.target.getAttribute('id'));

	var threadId = info[0];
	var postNo = info[1];

	var comment = null, position, float = config.gs('float_qr_box'), form, qrResto, qrForm, calcLeft, calcTop;

	var qrWindow = $('#qrWindow_' + threadId);

	// Do we have a qrWindow already open?
	if( qrWindow ) {
		comment = $('textarea[name=com]', qrWindow).innerText;

		// Do we already have content?
		if( comment ) {
			comment += config.gs('always_quote_on_new_line') ? "\n" : '';
			comment += ">>" + post + "\n";
		} else {
			comment = '>>' + postNo;
		}

		if( config.gs('move_qr_window_on_click') && qrWindow.style.position != 'fixed' ) {

		}
	} else {
		comment = '>>' + postNo + "\n";
	}

	position = $.findPos( $('#p' + postNo) );

	form = $('form[name=post]').cloneNode(true);
	form.setAttribute( 'name', 'qr_' + threadId );
	form.setAttribute( 'id', 'qr_' + threadId );

	qrResto = document.createElement('input');
	qrResto.setAttribute( 'type', 'hidden' );
	qrResto.setAttribute( 'name', 'resto' );
	qrResto.setAttribute( 'value', threadId );

	form.appendChild( qrResto );

	qrForm =
		'<div id="qrWindow_' + threadId + '" class="reply qrWindow preview draggable">' +
			'<div id="qrHeader_' + threadId + '" class="postblock qrHeader">' +
				'Quick Reply - Thread No.' + threadId +
					'<span class="qrButtonHolder">' +
						'<a id="qrFloat_' + threadId + '" title="Scroll With Page" href="javascript:void(0);">[ &gt; ]</a> ' +
						'<a id="qrClose_' + threadId + '" title="Close Window" href="javascript:void(0);">[ X ]</a>' +
					'</span>' +
			'</div>' +

			'<div id="qrForm_' + threadId + '" class="qrForm"></div>' +
			'<div id="qrMessage_' + threadId + '"></div>' +
		'</div>';

	$('#bottom').innerHTML += qrForm;
	$('#qrForm_' + threadId).appendChild(form);

	qrWindow = $('#qrWindow_' + threadId);

	calcLeft = ((window.innerWidth/2) - (qrWindow.offsetWidth/2));
	calcTop = (position[0] + 40);

	qrWindow.setAttribute( 'style', 'left: ' + calcLeft + 'px; top: ' + calcTop + 'px;' );

	$.remove( '#qrWindow_' + threadId, '.rules' );

	$.click( $('#qrFloat_' + threadId), function() {
		var id = $.parseNo(this.getAttribute('id'));

	});

	$.click( $('#qrClose_' + threadId), function() {
		var id = $.parseNo(this.getAttribute('id'));
		parser.closeQrWindow(id);
	});

	$.submit($('#qrForm_' + threadId), function(e) {
		e.preventDefault();

		var id = $.parseNo(this.getAttribute('id'));
		var form = $('#qr_' + id);
		$.html('#qrMessage_' + id, '<div class="postblock qrMessage">Submitting post... <span id="upload_progress_' + id + '"></span></div>');

		var formData = new FormData(form);

		var xhr = new XMLHttpRequest();
		xhr.open( 'POST', form.getAttribute('action') );
		xhr.onload = function(event)
		{
			if( this.status == 200 ) {
				extra.parseResponse( this.responseText, id );
			}
		};

		var previousPercent = 0, percent = 0;

		if( typeof xhr.upload.onprogress == 'object' ) {
			var upl = $('#upload_progress_' + id);
			xhr.upload.onprogress = function(e)
			{
				if( e.lengthComputable ) {
					percent = parseInt( ((e.loaded / e.total) * 100).toString().split('.')[0]);

					if( previousPercent != percent ) {
						upl.innerText = percent + '%';
					}
				}
			};
		}

		xhr.send(formData);
		return false;
	});

	var textarea = $('#qrWindow_' + threadId + ' textarea[name=com]');
	textarea.value = comment;
	textarea.focus();

	$.cursorToEnd(textarea);
	$.mousedown($('#qrHeader_' + threadId), function(e) {
		$.drag(e);
	});

	$.mouseup(document, function(e) {
		$.endDrag(e);
	});
};

parser.closeQrWindow = function(id)
{
	$.remove('#bottom', '#qrWindow_' + id);
};

parser.reportButtonClick = function(e)
{
	var info = $.parseButton(e.target.getAttribute('id'));
	var a = ( new Date ).getTime();

	window.open( 'https://sys.4chan.org/' + config.__board + '/imgboard.php?mode=report&no=' + info[1] , a, "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=680,height=200");
};

parser.topButtonClick = function(e)
{
	var info = $.parseButton(e.target.getAttribute('id'));

	window.location.hash = '';
	window.location.hash = 't' + info[0];
};

parser.lastHoverPreview = null;
parser.showHoverPreview = function(e)
{
	var href = e.target.getAttribute('href');

	//console.log(e);

	if( href == parser.lastHoverPreview && parser.hoverPreviewOpen ) return;
	if( href != parser.lastHoverPreview && parser.hoverPreviewOpen ) parser.closeAllHoverPreviews();

	parser.lastHoverPreview = href;
	parser.hoverPreviewOpen = true;

	var id = href.match(/#p([0-9]+)$/)[1];

	var postPreview = $('#postPreview' + id);

	if( !postPreview ) {
		$.append(
			document.body,
			'<div id="postPreview' + id + '" class="tooltip" style="max-width: 400px; display: none"></div>'
		);

		postPreview = $('#postPreview' + id);
	}

	if( $('#hp' + id) ) {
		parser.showTooltip( e.target, id );
		return true;
	}

	$.html('#postPreview' + id, '<div class="post reply preview posthover" id="hpl' + id + '">Loading...</div>');
	parser.showTooltip(e.target, id );

	var board = href.match(/([a-z0-9]+)\/res/);
	board = board ? board[1] : config.__board;

	var post = $('#p' + id);
	var clone = '';

	if( post ) {
		clone = post.innerHTML;

		$.html(
			postPreview,
			'<div id="hp' + id + '" class="post reply preview posthover" style="max-width: 400px;">' + clone + '</div>'
		);

		$.remove(
			postPreview,
			'.sideArrows, input, .buttons, .replyLink, .backlink, hr, a[id], span[id^=bl], .postNum'
		);

		$.append(
			$('#hp' + id + ' .postInfo'),
			'<span class="postNum"></span>'
		);

		$.html(
			$('#hp' + id + ' .postInfo .postNum'),
			[
				$('#p' + id + ' .postNum a:nth-of-type(1)'),
				$('#p' + id + ' .postNum a:nth-of-type(2)')
			]
		);

		//console.log('trying to show tooltip');

		parser.showTooltip(e.target, id );
		return true;
	}

	// We can't find it, find it and display it.
	var threadId = href.match(/([0-9]+)#/)[1];

	// Open the thread
	$.get( '//boards.4chan.org/' + board + '/res/' + threadId + '.json', function(data) {
		data = JSON.parse(data).posts;
		var len = data.length;

		for( var i = 0; i < len; i++ ) {
			if( data[i].no != id ) continue;

			$.html(
				postPreview,
				'<div id="hp' + id + '" class="post reply preview posthover" style="max-width: 400px;">' + $.buildHTMLFromJSON( data[i], board ) + '</div>'
			);

			parser.showTooltip(e.target, id);
			return true;
		}
	});

};

parser.showTooltip = function( target, id )
{
	var p = $('#postPreview' + id);
	var hp = $('#hp' + id) || $('#hpl' + id);

	p.setAttribute('style', 'display: inline; visibility: hidden;');

	var linkOffset = $.findPos(target);
	var linkWidth = target.offsetWidth;
	var linkHeight = target.offsetHeight;
	var eHeight = hp.offsetHeight;
	var eWidth = hp.offsetWidth > 400 ? 400 : hp.offsetWidth;


	var win = [ window.innerWidth, window.innerHeight ];
	if ( ( linkOffset[1] + linkWidth + eWidth ) > (win[0] - 200)) {
		var toppos = (linkOffset[0] - eHeight / 2);
		var leftpos = (linkOffset[1] - (eWidth+30));
		p.setAttribute('style', 'max-width: 400px; top: ' + (toppos) + 'px; left: ' + leftpos + 'px; position: absolute;');
	} else {
		toppos = (linkOffset[0] - eHeight / 2) - (linkHeight/2);
		leftpos = (linkOffset[1] + linkWidth);
		p.setAttribute('style', 'max-width: 400px; top: ' + (toppos) + 'px; left: ' + leftpos + 'px; position: absolute;');
	}
};

parser.hoverPreviewOpen = false;
parser.closeAllHoverPreviews = function()
{
	var tooltips = $.ga('.tooltip');
	var len = tooltips.length;

	for( var i = 0; i < len; i++ ) {
		tooltips[i].setAttribute('style', 'display: none');
	}

	parser.hoverPreviewOpen = false;
};

parser.handleMouseMove = function(e)
{
	if( e.target.className && e.target.className === 'quotelink' ) {
		parser.showHoverPreview(e);
	} else {
		if( parser.hoverPreviewOpen ) {
			parser.closeAllHoverPreviews();
		}
	}
};

/********************************
 *                              *
 *          END: PARSER         *
 *                              *
 ********************************/

/********************************
 *                              *
 *        START: UPDATER        *
 *                              *
 ********************************/
 /*
parser.startThreadUpdater = function () {
	// dummy for local testing
	threadUpdater.init()
	threadUpdater.start();
};*/

threadUpdater = {
	interval: null,
	pulseInterval: null,
	force: false,
	updating: false,
	delay: 0,
	step: 5,
	range: [ 10, 60 ], // in seconds
	lastUpdated: 0,
	lastModified: '0',
	statusNode: null
};

threadUpdater.init = function() {
	var navlinks, btn, postCount;
	
	postCount = document.getElementsByClassName('reply').length;
	navlinks = document.getElementsByClassName('navLinksBot')[0];
	
	navlinks.appendChild(document.createTextNode(' ['));
	btn = document.createElement('a');
	btn.id = 'threadUpdateBtn';
	btn.href = '';
	btn.textContent = 'Update';
	navlinks.appendChild(btn);
	navlinks.appendChild(document.createTextNode(']'));
	
	this.statusNode = document.createElement('span');
	
	this.statusNode.id = 'threadUpdateStatus';
	navlinks.appendChild(this.statusNode);
	
	btn.addEventListener('click', this.onUpdateClick, false);
};

threadUpdater.start = function() {
	this.force = this.updating = false;
	this.lastUpdated = Date.now();
	this.delay = this.range[0];
	this.interval = setInterval(this.update, this.delay * 1000);
	this.pulseInterval = setInterval(this.pulse, 1000);
};

threadUpdater.stop = function() {
	clearInterval(this.interval);
	clearInterval(this.pulseInterval);
};

threadUpdater.pulse = function() {
	var self = threadUpdater;
	self.statusNode.textContent =
		self.delay - (0 | (Date.now() - self.lastUpdated) / 1000);
};

threadUpdater.adjustDelay = function(postCount, force)
{
	if (!force) {
		if (postCount == 0) {
			if ((this.delay += this.step) > this.range[1]) {
				this.delay = this.range[1];
			}
		}
		else {
			if ((this.delay -= postCount * this.step) < this.range[0]) {
				this.delay = this.range[0]
			}
		}
	}
	clearInterval(this.interval);
	this.interval = setInterval(this.update, this.delay * 1000);
	console.log(postCount + ' new post(s), delay is ' + this.delay + ' seconds');
};

threadUpdater.onUpdateClick = function(e) {
	e.stopPropagation();
	e.preventDefault();
	threadUpdater.force = true;
	threadUpdater.update();
};

threadUpdater.update = function() {
	var self, now = Date.now();
	
	self = threadUpdater;
	
	if (self.updating) {
		console.log('Already updating');
		return;
	}
		
	if (!self.force && ((now - self.lastUpdated) < self.delay)) {
		console.log('Too fast');
		return;
	}
	
	clearInterval(self.pulseInterval);
	self.updating = true;
	
	console.log('Updating thread at ' + new Date().toString());
	
	self.statusNode.textContent = 'Updating...';
	
	$.get('//api.4chan.org/' + config.__board + '/res/' + config.__no + '.json',
		{
			onload: self.onload,
			onerror: self.onerror,
			onabort: self.onabort,
			ontimeout: self.ontimeout
		},
		{
			'If-Modified-Since': self.lastModified
		}
	);
};

threadUpdater.onload = function() {
	var i, self, nodes, thread, newposts, frag, postcount, lastrep, lastid, lastoffset;
	
	self = threadUpdater;
	nodes = [];
	
	if (this.status == 200) {
		self.lastModified = this.getResponseHeader('Last-Modified');
		
		thread = document.getElementById('t' + config.__no);
		
		lastrep = thread.childNodes[thread.childElementCount - 1];
		lastid = +lastrep.id.slice(2);
		lastoffset = lastrep.offsetTop;
		
		newposts = JSON.parse(this.responseText).posts;
		
		for (i = newposts.length - 1; i >= 0; i--) {
			if (newposts[i].no <= lastid) {
				break;
			}
			nodes.push(newposts[i]);
		}
		
		if (nodes[0]) {
			frag = document.createDocumentFragment();
			for (i = nodes.length - 1; i >= 0; i--) {
				frag.appendChild($.buildHTMLFromJSON(nodes[i], config.__board));
			}
			thread.appendChild(frag);
			parser.parseThread(thread.id, nodes.length);
			window.scrollBy(0, lastrep.offsetTop - lastoffset);
		}
	}
	else if (status == 404) {
		self.statusNode.textContent = 'Not Found';
		self.stop();
	}
	self.lastUpdated = Date.now();
	self.adjustDelay(nodes.length, self.force);
	self.pulse();
	self.pulseInterval = setInterval(self.pulse, 1000);
	self.updating = self.force = false;
};

threadUpdater.onerror = function() {
	threadUpdater.updating = false;
	threadUpdater.statusNode.textContent = this.statusText;
};

threadUpdater.onabort = function() {
	// body...
};

threadUpdater.ontimeout = function() {
	// body...
};

/********************************
 *                              *
 *          END: UPDATER        *
 *                              *
 ********************************/


/********************************
 *                              *
 *        START: CONFIG         *
 *                              *
 ********************************/

var config = new Object();
config.__viewing = config.__no = config.__board = null;

config.init = function()
{
	config.__viewing = window.location.href.match(/\/res\//) ? 'thread' : 'board';
	
	// thread number
	config.__no = config.__viewing == 'thread' ?  $('.opContainer').id.slice(2) : 0;

	config.__board = window.location.href.match(/\.org\/(\w+)\//)[1];
};

config.firstRun = function()
{
	var settings = {
		"disable_all_features":"false",
		"enable_thread_expansion":"true",
		"enable_trunc_post_expansion":"true",
		"show_nav_buttons":"true",
		"show_jump_to_start_button":"true",
		"post_hiding":"true",
		"show_frames":"false",
		"show_report_button":"true",
		"show_bottom_space":"true",

		"show_button":"true",
		"show_right_click_menu":"true",
		"hide_closed_boards":"false",

		"show_browser_button":"true",

		"enable_inline_image_expanding":"true",
		"enable_spoiler_image_expanding":"true",
		"image_expand_method": "original",
		"limit_image_size":"false",
		"limit_image_size_x":"1000",
		"limit_image_size_y":"1000",
		"move_post_comment_under":"500",

		"disable_adding_after_x_replies":"1000",
		"enable_runtime_parsing":"true",

		"enable_thread_watcher":"true",
		"show_inline_view":"true",

		"enable_quick_reply":"true",

		"enable_quick_quote":"true",
		"show_in_replies":"true",
		"focus_textbox_after_quote":"true",
		"always_quote_on_new_line":"true",

		"user_data_username":"",
		"user_data_email":"",

		"move_qr_window_on_click": "true",
		"float_qr_box": "false",

		"thread_autoupdate_interval": "15",
		"enable_thread_autoupdater": "false",
		"enable_link_hover_preview": "true",

		"enable_backlinking": "true",
		"enable_link_hover_rescue": "true",

		"enable_thread_toolbox": "true",
		"show_sage_count_in_toolbox": "false",

		"enable_overlord": "false",

		"stop_parsing_after_x_replies": "500",

		"enable_thread_autoupdater_unread_style": "true",
		"unread_post_border_color": "#d9b7b7",
		"unread_post_bg_color": "#f0d6d6",

		"update_titlebar_with_new_posts": "true",
		"touch_bottom_to_clear_new_posts": "true",

		"enable_context_menu": "true",
		"enable_watched_threads": "true",

		"enable_youtube_embedding": "false",
		"youtube_embed_width": "500",
		"youtube_embed_height": "281",
		"youtube_embed_extra": "",

		"enable_soundcloud_embedding": "false",
		"soundcloud_embed_width": "400",
		"soundcloud_embed_height": "80",
		"soundcloud_embed_extra": "",

		"enable_vimeo_embedding": "false",
		"vimeo_embed_width": "500",
		"vimeo_embed_height": "281",
		"vimeo_embed_extra": "",

		"enable_vocaroo_embedding": "false",
		"vocaroo_embed_width": "148",
		"vocaroo_embed_height": "44",
		"vocaroo_embed_extra": "",


		"enable_media_embedding": "false",


		"enable_image_expansion_rescue": "false",
		"focus_captcha_on_tab": "true",

		"enable_image_search": "false",
		"enable_image_search_google": "true",
		"enable_image_search_iqdb": "false",
		"enable_image_search_tineye": "false",

		"do_update_check": "true",
		"last_xml_check": "0",
		"board_list_size": "0",

		"use_text_buttons": "false",
		"convert_date": "false",
		"timezone": "GMT",
		"date_format_noseconds": "l, jS F Y - g:ia",
		"date_format_seconds": "l, jS F Y - G:i:s",
		"enable_filter": "false",

		"reveal_spoilers": "false",

		"force_show_buttons": "true",
		"force_https": "false",

		"show_hide_button_in_reply": "false",

		"x_compat" : "false"
	};

	for( key in settings ) {
		localStorage[ '4chanext_' + key ] = settings[key];
	}

	localStorage['4chanext_firstrun'] = 'true';
};

config.gs = function( opt )
{
	var setting = localStorage['4chanext_' + opt];
	if( setting === 'true' ) return true;
	if( setting === 'false' ) return false;

	return setting;
};

config.ss = function( opt, setting )
{
	localStorage['4chanext_' + opt] = setting;
};

/********************************
 *                              *
 *          END: CONFIG         *
 *                              *
 ********************************/

init = function()
{
	clearInterval(parser.threadInterval);
	
	injCss();

	console.time('4chan Extension');
	config.init();

	if( config.__viewing == 'thread' ) {
		parser.parseThread( $('div.board > div[id^="t"]').getAttribute('id') );
	} else {
		parser.parseBoard();
	}

	$.click(document, parser.handleOnClick);

	if( config.gs( 'enable_link_hover_preview' ) ) {
		$.mousemove( document, parser.handleMouseMove );
	}
	
	if( !config.gs( 'enable_thread_autoupdater' ) ) {
		console.log('Starting thread updater...');
		threadUpdater.init();
		threadUpdater.start();
	}

	//console.timeEnd('4chan Extension');
};

if( !localStorage['4chanext_firstrun'] ) {
	config.firstRun();
}

if( window.location.href.match(/^http:/) && config.gs('force_https') ) {
	window.location = window.location.href.replace('http:', 'https:');
}

//if( !window.location.href.match(/post$/) ) document.addEventListener('DOMContentLoaded', init);

injCss = function()
{
	var css = '\
<style type="text/css">\
.postHidden blockquote, .postHidden hr, .postHidden > div:not(.postInfo), .postHidden .file, .postHidden .buttons {\
	display: none!important;\
}\
.postHidden {\
	padding-right: 5px!important;\
}\
.preview div.post div.file div.fileInfo {\
	margin-left: 0px!important;\
}\
.postHideButton {\
	font-size: 12px;\
}\
\
div.op > span .postHideButtonCollapsed {\
	margin-right: 1px;\
}\
.extButton {\
	color: inherit;\
}\
.ext_fourohfour {\
	padding: 5px;\
	text-align: center;\
}\
#threadUpdateStatus {\
  margin-left: 0.5ex;\
}\
</style>\
';

	$.append(document.body, css);
};