var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/**
 * --------------------------------------------------------------------
 * jQuery-Plugin "pngFix"
 * Version: 1.2, 09.03.2009
 * by Andreas Eberhard, andreas.eberhard@gmail.com
 *                      http://jquery.andreaseberhard.de/
 *
 * Copyright (c) 2007 Andreas Eberhard
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 *
 * Changelog:
 *    09.03.2009 Version 1.2
 *    - Update for jQuery 1.3.x, removed @ from selectors
 *    11.09.2007 Version 1.1
 *    - removed noConflict
 *    - added png-support for input type=image
 *    - 01.08.2007 CSS background-image support extension added by Scott Jehl, scott@filamentgroup.com, http://www.filamentgroup.com
 *    31.05.2007 initial Version 1.0
 * --------------------------------------------------------------------
 * @example $(function(){$(document).pngFix();});
 * @desc Fixes all PNG's in the document on document.ready
 *
 * jQuery(function(){jQuery(document).pngFix();});
 * @desc Fixes all PNG's in the document on document.ready when using noConflict
 *
 * @example $(function(){$('div.examples').pngFix();});
 * @desc Fixes all PNG's within div with class examples
 *
 * @example $(function(){$('div.examples').pngFix( { blankgif:'ext.gif' } );});
 * @desc Fixes all PNG's within div with class examples, provides blank gif for input with png
 * --------------------------------------------------------------------
 */

(function($) {

jQuery.fn.pngFix = function(settings) {

	// Settings
	settings = jQuery.extend({
		blankgif: 'blank.gif'
	}, settings);

	var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
	var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);

	if (jQuery.browser.msie && (ie55 || ie6)) {

		//fix images with png-source
		jQuery(this).find("img[src$=.png]").each(function() {

			jQuery(this).attr('width',jQuery(this).width());
			jQuery(this).attr('height',jQuery(this).height());

			var prevStyle = '';
			var strNewHTML = '';
			var imgId = (jQuery(this).attr('id')) ? 'id="' + jQuery(this).attr('id') + '" ' : '';
			var imgClass = (jQuery(this).attr('class')) ? 'class="' + jQuery(this).attr('class') + '" ' : '';
			var imgTitle = (jQuery(this).attr('Title')) ? 'Title="' + jQuery(this).attr('Title') + '" ' : '';
			var imgAlt = (jQuery(this).attr('alt')) ? 'alt="' + jQuery(this).attr('alt') + '" ' : '';
			var imgAlign = (jQuery(this).attr('align')) ? 'float:' + jQuery(this).attr('align') + ';' : '';
			var imgHand = (jQuery(this).parent().attr('href')) ? 'cursor:hand;' : '';
			if (this.style.border) {
				prevStyle += 'border:'+this.style.border+';';
				this.style.border = '';
			}
			if (this.style.padding) {
				prevStyle += 'padding:'+this.style.padding+';';
				this.style.padding = '';
			}
			if (this.style.margin) {
				prevStyle += 'margin:'+this.style.margin+';';
				this.style.margin = '';
			}
			var imgStyle = (this.style.cssText);

			strNewHTML += '<span '+imgId+imgClass+imgTitle+imgAlt;
			strNewHTML += 'style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+imgAlign+imgHand;
			strNewHTML += 'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;';
			strNewHTML += 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + jQuery(this).attr('src') + '\', sizingMethod=\'scale\');';
			strNewHTML += imgStyle+'"></span>';
			if (prevStyle != ''){
				strNewHTML = '<span style="position:relative;display:inline-block;'+prevStyle+imgHand+'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;'+'">' + strNewHTML + '</span>';
			}

			jQuery(this).hide();
			jQuery(this).after(strNewHTML);

		});

		// fix css background pngs
		jQuery(this).find("*").each(function(){
			var bgIMG = jQuery(this).css('background-image');
			if(bgIMG.indexOf(".png")!=-1){
				var iebg = bgIMG.split('url("')[1].split('")')[0];
				jQuery(this).css('background-image', 'none');
				jQuery(this).get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + iebg + "',sizingMethod='scale')";
			}
		});
		
		//fix input with png-source
		jQuery(this).find("input[src$=.png]").each(function() {
			var bgIMG = jQuery(this).attr('src');
			jQuery(this).get(0).runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + bgIMG + '\', sizingMethod=\'scale\');';
   		jQuery(this).attr('src', settings.blankgif)
		});
	
	}
	
	return jQuery;

};

})(jQuery);


}
/*
     FILE ARCHIVED ON 08:21:58 Dec 28, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:21:11 Oct 06, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 368.321
  exclusion.robots: 0.161
  exclusion.robots.policy: 0.153
  cdx.remote: 0.051
  esindex: 0.007
  LoadShardBlock: 236.887 (3)
  PetaboxLoader3.datanode: 113.933 (4)
  load_resource: 578.966
  PetaboxLoader3.resolve: 519.061
*/