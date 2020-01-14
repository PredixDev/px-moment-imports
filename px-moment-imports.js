/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import './px-moment-imports-step-one.js';

import '../@polymer/polymer/polymer-legacy.js';
import { resolveUrl } from '../@polymer/polymer/lib/utils/resolve-url.js';

//our version of moment now loaded, save it
window.Px.moment = window.moment;

//and restore other version if needed
if(typeof window.Px.oldMoment !== 'undefined') {
  window.moment = window.Px.oldMoment;
}

/**
* List of out-of-the-box supported moment locale:
* - af
* - ar-dz
* - ar-kw
* - ar-ly
* - ar-ma
* - ar-sa
* - ar-tn
* - ar
* - az
* - be
* - bg
* - bn
* - bo
* - br
* - bs
* - ca
* - cs
* - cv
* - cy
* - da
* - de-at
* - de-ch
* - de
* - dv
* - el
* - en-au
* - en-ca
* - en-gb
* - en-ie
* - en-nz
* - eo
* - es-do
* - es
* - et
* - eu
* - fa
* - fi
* - fo
* - fr-ca
* - fr-ch
* - fr
* - fy
* - gd
* - gl
* - gom-latn
* - he
* - hi
* - hr
* - hu
* - hy-am
* - id
* - is
* - it
* - ja
* - jv
* - ka
* - kk
* - km
* - kn
* - ko
* - ky
* - lb
* - list.txt
* - lo
* - lt
* - lv
* - me
* - mi
* - mk
* - ml
* - mr
* - ms-my
* - ms
* - my
* - nb
* - ne
* - nl-be
* - nl
* - nn
* - pa-in
* - pl
* - pt-br
* - pt
* - ro
* - ru
* - run.sh
* - sd
* - se
* - si
* - sk
* - sl
* - sq
* - sr-cyrl
* - sr
* - ss
* - sv
* - sw
* - ta
* - te
* - tet
* - th
* - tl-ph
* - tlh
* - tr
* - tzl
* - tzm-latn
* - tzm
* - uk
* - ur
* - uz-latn
* - uz
* - vi
* - x-pseudo
* - yo
* - zh-cn
* - zh-hk
* - zh-tw
*
* Each new locale used will need to be loaded before it can be used.
* You can either use one of the locale listed above (which will
* automatically be loaded) or provide your own config object:
* http://momentjs.com/docs/#/customization/
* Once a locale has been loaded it can be reused without loading it,
* just pass the same localeName to this function
*
*/
Px.moment.changeLocale = function(newLocale, callback, configObject) {

  //try to load it if it's already loaded
  if(Px.moment.locale(newLocale) === newLocale) {
    //ok this locale was loaded and is now in use
  } else {
    if(!configObject) {

      if(!Px.moment.localeURL) {
        // NOTE: see http://www.2ality.com/2014/05/current-script.html
        var currentScript = document._currentScript || document.currentScript ||
            (function() {
              var scripts = document.getElementsByTagName('script');
              return scripts[scripts.length - 1];
            })();
        var BASE_URI = currentScript.ownerDocument.baseURI;
        Px.moment.localeURL =  resolveUrl('./px-moment-imports/momentLocale', BASE_URI);
      }

      //dynamically create script tag for this locale
      var fileref=document.createElement('script')
      fileref.setAttribute("type","text/javascript")
      fileref.setAttribute("src",  Px.moment.localeURL + '/' + newLocale + '.js')

      if(callback) {
        fileref.addEventListener('load', function() {
          callback();
        });
      }

      fileref.addEventListener('error', function() {

       //seems like this locale isn't supported out of the box
       console.warn('couldn\'t find moment locale for ' + this + '. Consider providing your own: http://momentjs.com/docs/#/customization/');
      }.bind(newLocale));

      //append immediately invoked script. The script itself will define
      //and load the locale
      document.getElementsByTagName("head")[0].appendChild(fileref)

    } else {
      //load and use locale
      Px.moment.locale(newLocale, configObject);
      Px.moment.locale(newLocale);
    }
  }
};
