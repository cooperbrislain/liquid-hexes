uniform sampler2D texture;

void main()
{
    //Transform vertex by modelview and projection matrices
    //Forward current color and texture coordinates after applying texture matrix
    gl_FrontColor = gl_Color;
    gl_TexCoord[0] = gl_TextureMatrix[0] * gl_MultiTexCoord0;
    vec4 displaceVert = gl_Vertex;
    displaceVert = displaceVert * (1.+6.*(length(texture2D(texture,gl_TexCoord[0].xy))));
    gl_Position = gl_ModelViewProjectionMatrix * displaceVert;
}
