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
import '../moment/src/moment.js';

import '../moment-timezone/builds/moment-timezone-with-data.min.js';

if(typeof window.Px === 'undefined') {
  window.Px = {};
}

//if someone loaded moment already keep a ref to
//it so we can restore it after having loaded our version
if(typeof window.moment !== 'undefined' && !window.Px.moment) {
  window.Px.oldMoment = window.moment;
  window.moment = {};
}
