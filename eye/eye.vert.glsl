void bog_game_eye() {
    vec4 viewShift = vec4(0, 0, -wireframe * 0.01, 0);

    worldPos = instTrans * vertexCoord;
    viewPos = viewTrans * worldPos;

    gl_Position = projTrans * viewPos + viewShift;
    gl_PointSize = 5.0;

    texId = float(instTex);
    textPos = texOffset;

    instId = float(gl_InstanceID);
    vertexId = float(gl_VertexID);

    texScale = 2.0 * mol_3d_mat4_scales(instTrans).xy;
}
