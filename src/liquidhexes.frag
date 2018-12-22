uniform sampler2D texture;
uniform float time;
uniform float count;
uniform float amount;
uniform float fade;
uniform float deg_trans;
uniform float audio;

#ifdef GL_ES
precision mediump float;
#endif

// 1 on edges, 0 in middle
float hex(vec2 p) {
    p.x *= 0.57735*3.0;
    p.y += mod(floor(p.x), 2.0)*0.5;
    p = abs((mod(p, 1.0) - 0.5));
    return abs(max(p.x*1.5 + p.y, p.y*2.0) - 1.0);
}

float hexdistort(vec2 p) {
    p.x *= 0.57735*3.0;
    p.y += mod(floor(p.x), 2.0)*0.5;
    p = abs((mod(p, 1.0) - 0.5));
    return 1.-abs(max(p.x*1.5 + p.y, p.y*2.0) - 1.);
}

void main(void) {
    vec2 pos = gl_FragCoord.xy;
    vec2 p = pos/count;
    vec2 tc = gl_TexCoord[0].xy;
    float step = 0.0001;
    vec2 disp = vec2(hexdistort(vec2(p.x-step,p.y))-hexdistort(vec2(p.x+step,p.y)),hexdistort(vec2(p.x,p.y-step))-hexdistort(vec2(p.x, p.y+step)));
    tc = gl_TexCoord[0].xy+amount*disp.xy;
    gl_FragColor = vec4(vec3(1. - fade),0.999) * texture2D(texture,tc);
}