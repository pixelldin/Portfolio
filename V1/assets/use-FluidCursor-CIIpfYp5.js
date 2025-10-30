const be={SIM_RESOLUTION:128,DYE_RESOLUTION:1440,CAPTURE_RESOLUTION:1512,DENSITY_DISSIPATION:.5,VELOCITY_DISSIPATION:10,PRESSURE:.2,PRESSURE_ITERATIONS:20,CURL:3,SPLAT_RADIUS:.2,SPLAT_FORCE:6e3,SHADING:!0,COLOR_UPDATE_SPEED:10,PAUSED:!1,BACK_COLOR:{r:0,g:0,b:0},TRANSPARENT:!0},Pe=Z=>{const s=document.getElementById("fluid");if(!s){console.error('Canvas with id "fluid" not found');return}const v={...be,...Z};Y();function $(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[0,0,0]}const g=[];g.push(new $);const{gl:t,ext:p}=ee(s);p.supportLinearFiltering||(v.DYE_RESOLUTION=256,v.SHADING=!1);function ee(e){const r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let i=e.getContext("webgl2",r);const o=!!i;o||(i=e.getContext("webgl",r)||e.getContext("experimental-webgl",r));let n,a;o?(i.getExtension("EXT_color_buffer_float"),a=i.getExtension("OES_texture_float_linear")):(n=i.getExtension("OES_texture_half_float"),a=i.getExtension("OES_texture_half_float_linear")),i.clearColor(0,0,0,1);const c=o?i.HALF_FLOAT:n.HALF_FLOAT_OES;let f,l,R;return o?(f=D(i,i.RGBA16F,i.RGBA,c),l=D(i,i.RG16F,i.RG,c),R=D(i,i.R16F,i.RED,c)):(f=D(i,i.RGBA,i.RGBA,c),l=D(i,i.RGBA,i.RGBA,c),R=D(i,i.RGBA,i.RGBA,c)),{gl:i,ext:{formatRGBA:f,formatRG:l,formatR:R,halfFloatTexType:c,supportLinearFiltering:a}}}function D(e,r,i,o){if(!te(e,r,i,o))switch(r){case e.R16F:return D(e,e.RG16F,e.RG,o);case e.RG16F:return D(e,e.RGBA16F,e.RGBA,o);default:return null}return{internalFormat:r,format:i}}function te(e,r,i,o){const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,i,o,null);const a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}class re{constructor(r,i){this.vertexShader=r,this.fragmentShaderSource=i,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(r){let i=0;for(let n=0;n<r.length;n++)i+=Le(r[n]);let o=this.programs[i];if(o==null){const n=d(t.FRAGMENT_SHADER,this.fragmentShaderSource,r);o=V(this.vertexShader,n),this.programs[i]=o}o!=this.activeProgram&&(this.uniforms=W(o),this.activeProgram=o)}bind(){t.useProgram(this.activeProgram)}}class S{constructor(r,i){this.uniforms={},this.program=V(r,i),this.uniforms=W(this.program)}bind(){t.useProgram(this.program)}}function V(e,r){const i=t.createProgram();return t.attachShader(i,e),t.attachShader(i,r),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||console.trace(t.getProgramInfoLog(i)),i}function W(e){const r=[],i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;o++){const n=t.getActiveUniform(e,o).name;r[n]=t.getUniformLocation(e,n)}return r}function d(e,r,i){r=ie(r,i);const o=t.createShader(e);return t.shaderSource(o,r),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.trace(t.getShaderInfoLog(o)),o}function ie(e,r){if(r==null)return e;let i="";return r.forEach(o=>{i+="#define "+o+`
`}),i+e}const E=d(t.VERTEX_SHADER,`
       precision highp float;
   
       attribute vec2 aPosition;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform vec2 texelSize;
   
       void main () {
           vUv = aPosition * 0.5 + 0.5;
           vL = vUv - vec2(texelSize.x, 0.0);
           vR = vUv + vec2(texelSize.x, 0.0);
           vT = vUv + vec2(0.0, texelSize.y);
           vB = vUv - vec2(0.0, texelSize.y);
           gl_Position = vec4(aPosition, 0.0, 1.0);
       }
   `);d(t.VERTEX_SHADER,`
       precision highp float;
   
       attribute vec2 aPosition;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       uniform vec2 texelSize;
   
       void main () {
           vUv = aPosition * 0.5 + 0.5;
           float offset = 1.33333333;
           vL = vUv - texelSize * offset;
           vR = vUv + texelSize * offset;
           gl_Position = vec4(aPosition, 0.0, 1.0);
       }
   `),d(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       uniform sampler2D uTexture;
   
       void main () {
           vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
           sum += texture2D(uTexture, vL) * 0.35294117;
           sum += texture2D(uTexture, vR) * 0.35294117;
           gl_FragColor = sum;
       }
   `);const oe=d(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       uniform sampler2D uTexture;
   
       void main () {
           gl_FragColor = texture2D(uTexture, vUv);
       }
   `),ne=d(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       uniform sampler2D uTexture;
       uniform float value;
   
       void main () {
           gl_FragColor = value * texture2D(uTexture, vUv);
       }
   `);d(t.FRAGMENT_SHADER,`
       precision mediump float;
   
       uniform vec4 color;
   
       void main () {
           gl_FragColor = color;
       }
   `);const ae=`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uTexture;
       uniform sampler2D uDithering;
       uniform vec2 ditherScale;
       uniform vec2 texelSize;
   
       vec3 linearToGamma (vec3 color) {
           color = max(color, vec3(0));
           return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
       }
   
       void main () {
           vec3 c = texture2D(uTexture, vUv).rgb;
   
       #ifdef SHADING
           vec3 lc = texture2D(uTexture, vL).rgb;
           vec3 rc = texture2D(uTexture, vR).rgb;
           vec3 tc = texture2D(uTexture, vT).rgb;
           vec3 bc = texture2D(uTexture, vB).rgb;
   
           float dx = length(rc) - length(lc);
           float dy = length(tc) - length(bc);
   
           vec3 n = normalize(vec3(dx, dy, length(texelSize)));
           vec3 l = vec3(0.0, 0.0, 1.0);
   
           float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
           c *= diffuse;
       #endif
   
           float a = max(c.r, max(c.g, c.b));
           gl_FragColor = vec4(c, a);
       }
   `,ce=d(t.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       uniform sampler2D uTarget;
       uniform float aspectRatio;
       uniform vec3 color;
       uniform vec2 point;
       uniform float radius;
   
       void main () {
           vec2 p = vUv - point.xy;
           p.x *= aspectRatio;
           vec3 splat = exp(-dot(p, p) / radius) * color;
           vec3 base = texture2D(uTarget, vUv).xyz;
           gl_FragColor = vec4(base + splat, 1.0);
       }
   `),ue=d(t.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       uniform sampler2D uVelocity;
       uniform sampler2D uSource;
       uniform vec2 texelSize;
       uniform vec2 dyeTexelSize;
       uniform float dt;
       uniform float dissipation;
   
       vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
           vec2 st = uv / tsize - 0.5;
   
           vec2 iuv = floor(st);
           vec2 fuv = fract(st);
   
           vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
           vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
           vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
           vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
   
           return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
       }
   
       void main () {
       #ifdef MANUAL_FILTERING
           vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
           vec4 result = bilerp(uSource, coord, dyeTexelSize);
       #else
           vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
           vec4 result = texture2D(uSource, coord);
       #endif
           float decay = 1.0 + dissipation * dt;
           gl_FragColor = result / decay;
       }`,p.supportLinearFiltering?null:["MANUAL_FILTERING"]),se=d(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uVelocity, vL).x;
           float R = texture2D(uVelocity, vR).x;
           float T = texture2D(uVelocity, vT).y;
           float B = texture2D(uVelocity, vB).y;
   
           vec2 C = texture2D(uVelocity, vUv).xy;
           if (vL.x < 0.0) { L = -C.x; }
           if (vR.x > 1.0) { R = -C.x; }
           if (vT.y > 1.0) { T = -C.y; }
           if (vB.y < 0.0) { B = -C.y; }
   
           float div = 0.5 * (R - L + T - B);
           gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
       }
   `),le=d(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uVelocity, vL).y;
           float R = texture2D(uVelocity, vR).y;
           float T = texture2D(uVelocity, vT).x;
           float B = texture2D(uVelocity, vB).x;
           float vorticity = R - L - T + B;
           gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
       }
   `),fe=d(t.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uVelocity;
       uniform sampler2D uCurl;
       uniform float curl;
       uniform float dt;
   
       void main () {
           float L = texture2D(uCurl, vL).x;
           float R = texture2D(uCurl, vR).x;
           float T = texture2D(uCurl, vT).x;
           float B = texture2D(uCurl, vB).x;
           float C = texture2D(uCurl, vUv).x;
   
           vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
           force /= length(force) + 0.0001;
           force *= curl * C;
           force.y *= -1.0;
   
           vec2 velocity = texture2D(uVelocity, vUv).xy;
           velocity += force * dt;
           velocity = min(max(velocity, -1000.0), 1000.0);
           gl_FragColor = vec4(velocity, 0.0, 1.0);
       }
   `),ve=d(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uPressure;
       uniform sampler2D uDivergence;
   
       void main () {
           float L = texture2D(uPressure, vL).x;
           float R = texture2D(uPressure, vR).x;
           float T = texture2D(uPressure, vT).x;
           float B = texture2D(uPressure, vB).x;
           float C = texture2D(uPressure, vUv).x;
           float divergence = texture2D(uDivergence, vUv).x;
           float pressure = (L + R + B + T - divergence) * 0.25;
           gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
       }
   `),de=d(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uPressure;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uPressure, vL).x;
           float R = texture2D(uPressure, vR).x;
           float T = texture2D(uPressure, vT).x;
           float B = texture2D(uPressure, vB).x;
           vec2 velocity = texture2D(uVelocity, vUv).xy;
           velocity.xy -= vec2(R - L, T - B);
           gl_FragColor = vec4(velocity, 0.0, 1.0);
       }
   `),x=(t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(e,r=!1)=>{e==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)),r&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)});let h,u,C,X,y;const k=new S(E,oe),I=new S(E,ne),_=new S(E,ce),T=new S(E,ue),N=new S(E,se),z=new S(E,le),w=new S(E,fe),U=new S(E,ve),L=new S(E,de),b=new re(E,ae);function K(){const e=Q(v.SIM_RESOLUTION),r=Q(v.DYE_RESOLUTION),i=p.halfFloatTexType,o=p.formatRGBA,n=p.formatRG,a=p.formatR,c=p.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),h==null?h=O(r.width,r.height,o.internalFormat,o.format,i,c):h=q(h,r.width,r.height,o.internalFormat,o.format,i,c),u==null?u=O(e.width,e.height,n.internalFormat,n.format,i,c):u=q(u,e.width,e.height,n.internalFormat,n.format,i,c),C=F(e.width,e.height,a.internalFormat,a.format,i,t.NEAREST),X=F(e.width,e.height,a.internalFormat,a.format,i,t.NEAREST),y=O(e.width,e.height,a.internalFormat,a.format,i,t.NEAREST)}function F(e,r,i,o,n,a){t.activeTexture(t.TEXTURE0);const c=t.createTexture();t.bindTexture(t.TEXTURE_2D,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,i,e,r,0,o,n,null);const f=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,f),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,c,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);const l=1/e,R=1/r;return{texture:c,fbo:f,width:e,height:r,texelSizeX:l,texelSizeY:R,attach(A){return t.activeTexture(t.TEXTURE0+A),t.bindTexture(t.TEXTURE_2D,c),A}}}function O(e,r,i,o,n,a){let c=F(e,r,i,o,n,a),f=F(e,r,i,o,n,a);return{width:e,height:r,texelSizeX:c.texelSizeX,texelSizeY:c.texelSizeY,get read(){return c},set read(l){c=l},get write(){return f},set write(l){f=l},swap(){const l=c;c=f,f=l}}}function me(e,r,i,o,n,a,c){const f=F(r,i,o,n,a,c);return k.bind(),t.uniform1i(k.uniforms.uTexture,e.attach(0)),x(f),f}function q(e,r,i,o,n,a,c){return e.width==r&&e.height==i||(e.read=me(e.read,r,i,o,n,a,c),e.write=F(r,i,o,n,a,c),e.width=r,e.height=i,e.texelSizeX=1/r,e.texelSizeY=1/i),e}function he(){const e=[];v.SHADING&&e.push("SHADING"),b.setKeywords(e)}he(),K();let j=Date.now(),P=0;function M(){const e=xe();Y()&&K(),Te(e),ge(),Ee(e),Re(null),requestAnimationFrame(M)}function xe(){const e=Date.now();let r=(e-j)/1e3;return r=Math.min(r,.016666),j=e,r}function Y(){const e=m(s.clientWidth),r=m(s.clientHeight);return s.width!=e||s.height!=r?(s.width=e,s.height=r,!0):!1}function Te(e){P+=e*v.COLOR_UPDATE_SPEED,P>=1&&(P=Ue(P,0,1),g.forEach(r=>{r.color=B()}))}function ge(){g.forEach(e=>{e.moved&&(e.moved=!1,Se(e))})}function Ee(e){t.disable(t.BLEND),z.bind(),t.uniform2f(z.uniforms.texelSize,u.texelSizeX,u.texelSizeY),t.uniform1i(z.uniforms.uVelocity,u.read.attach(0)),x(X),w.bind(),t.uniform2f(w.uniforms.texelSize,u.texelSizeX,u.texelSizeY),t.uniform1i(w.uniforms.uVelocity,u.read.attach(0)),t.uniform1i(w.uniforms.uCurl,X.attach(1)),t.uniform1f(w.uniforms.curl,v.CURL),t.uniform1f(w.uniforms.dt,e),x(u.write),u.swap(),N.bind(),t.uniform2f(N.uniforms.texelSize,u.texelSizeX,u.texelSizeY),t.uniform1i(N.uniforms.uVelocity,u.read.attach(0)),x(C),I.bind(),t.uniform1i(I.uniforms.uTexture,y.read.attach(0)),t.uniform1f(I.uniforms.value,v.PRESSURE),x(y.write),y.swap(),U.bind(),t.uniform2f(U.uniforms.texelSize,u.texelSizeX,u.texelSizeY),t.uniform1i(U.uniforms.uDivergence,C.attach(0));for(let i=0;i<v.PRESSURE_ITERATIONS;i++)t.uniform1i(U.uniforms.uPressure,y.read.attach(1)),x(y.write),y.swap();L.bind(),t.uniform2f(L.uniforms.texelSize,u.texelSizeX,u.texelSizeY),t.uniform1i(L.uniforms.uPressure,y.read.attach(0)),t.uniform1i(L.uniforms.uVelocity,u.read.attach(1)),x(u.write),u.swap(),T.bind(),t.uniform2f(T.uniforms.texelSize,u.texelSizeX,u.texelSizeY),p.supportLinearFiltering||t.uniform2f(T.uniforms.dyeTexelSize,u.texelSizeX,u.texelSizeY);const r=u.read.attach(0);t.uniform1i(T.uniforms.uVelocity,r),t.uniform1i(T.uniforms.uSource,r),t.uniform1f(T.uniforms.dt,e),t.uniform1f(T.uniforms.dissipation,v.VELOCITY_DISSIPATION),x(u.write),u.swap(),p.supportLinearFiltering||t.uniform2f(T.uniforms.dyeTexelSize,h.texelSizeX,h.texelSizeY),t.uniform1i(T.uniforms.uVelocity,u.read.attach(0)),t.uniform1i(T.uniforms.uSource,h.read.attach(1)),t.uniform1f(T.uniforms.dissipation,v.DENSITY_DISSIPATION),x(h.write),h.swap()}function Re(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),pe(e)}function pe(e){const r=t.drawingBufferWidth,i=t.drawingBufferHeight;b.bind(),v.SHADING&&t.uniform2f(b.uniforms.texelSize,1/r,1/i),t.uniform1i(b.uniforms.uTexture,h.read.attach(0)),x(e)}function Se(e){const r=e.deltaX*v.SPLAT_FORCE,i=e.deltaY*v.SPLAT_FORCE;J(e.texcoordX,e.texcoordY,r,i,e.color)}function De(e){const r=B();r.r*=10,r.g*=10,r.b*=10;const i=10*(Math.random()-.5),o=30*(Math.random()-.5);J(e.texcoordX,e.texcoordY,i,o,r)}function J(e,r,i,o,n){_.bind(),t.uniform1i(_.uniforms.uTarget,u.read.attach(0)),t.uniform1f(_.uniforms.aspectRatio,s.width/s.height),t.uniform2f(_.uniforms.point,e,r),t.uniform3f(_.uniforms.color,i,o,0),t.uniform1f(_.uniforms.radius,ye(v.SPLAT_RADIUS/100)),x(u.write),u.swap(),t.uniform1i(_.uniforms.uTarget,h.read.attach(0)),t.uniform3f(_.uniforms.color,n.r,n.g,n.b),x(h.write),h.swap()}function ye(e){const r=s.width/s.height;return r>1&&(e*=r),e}window.addEventListener("mousedown",e=>{const r=g[0],i=m(e.clientX),o=m(e.clientY);G(r,-1,i,o),De(r)}),document.body.addEventListener("mousemove",function e(r){const i=g[0],o=m(r.clientX),n=m(r.clientY),a=B();M(),H(i,o,n,a),document.body.removeEventListener("mousemove",e)}),window.addEventListener("mousemove",e=>{const r=g[0],i=m(e.clientX),o=m(e.clientY),n=r.color;H(r,i,o,n)}),document.body.addEventListener("touchstart",function e(r){const i=r.targetTouches,o=g[0];for(let n=0;n<i.length;n++){const a=m(i[n].clientX),c=m(i[n].clientY);M(),G(o,i[n].identifier,a,c)}document.body.removeEventListener("touchstart",e)}),window.addEventListener("touchstart",e=>{const r=e.targetTouches,i=g[0];for(let o=0;o<r.length;o++){const n=m(r[o].clientX),a=m(r[o].clientY);G(i,r[o].identifier,n,a)}}),window.addEventListener("touchmove",e=>{const r=e.targetTouches,i=g[0];for(let o=0;o<r.length;o++){const n=m(r[o].clientX),a=m(r[o].clientY);H(i,n,a,i.color)}},!1),window.addEventListener("touchend",e=>{const r=e.changedTouches,i=g[0];for(let o=0;o<r.length;o++)_e(i)});function G(e,r,i,o){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=i/s.width,e.texcoordY=1-o/s.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=B()}function H(e,r,i,o){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/s.width,e.texcoordY=1-i/s.height,e.deltaX=Ae(e.texcoordX-e.prevTexcoordX),e.deltaY=we(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=o}function _e(e){e.down=!1}function Ae(e){const r=s.width/s.height;return r<1&&(e*=r),e}function we(e){const r=s.width/s.height;return r>1&&(e/=r),e}function B(){const e=Fe(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function Fe(e,r,i){let o,n,a,c,f,l,R,A;switch(c=Math.floor(e*6),f=e*6-c,l=i*(1-r),R=i*(1-f*r),A=i*(1-(1-f)*r),c%6){case 0:o=i,n=A,a=l;break;case 1:o=R,n=i,a=l;break;case 2:o=l,n=i,a=A;break;case 3:o=l,n=R,a=i;break;case 4:o=A,n=l,a=i;break;case 5:o=i,n=l,a=R;break}return{r:o,g:n,b:a}}function Ue(e,r,i){const o=i-r;return(e-r)%o+r}function Q(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);const i=Math.round(e),o=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:i}:{width:i,height:o}}function m(e){const r=window.devicePixelRatio||1;return Math.floor(e*r)}function Le(e){if(e.length==0)return 0;let r=0;for(let i=0;i<e.length;i++)r=(r<<5)-r+e.charCodeAt(i),r|=0;return r}return()=>{window.removeEventListener&&(window.removeEventListener("mousemove",window.mousemoveHandler),window.removeEventListener("mousedown",window.mousedownHandler),window.removeEventListener("touchstart",window.touchstartHandler),window.removeEventListener("touchmove",window.touchmoveHandler),window.removeEventListener("touchend",window.touchendHandler))}};export{Pe as default};
