void bog_game_eye() {
    float dim = min(1.0, 3.0 / pow(length(viewPos), 2.0));

    if (wireframe == 1.0) {
        color = dim * vec4(1, 1, 1, 1);
    } else {
        vec3 coord = vec3(textPos * texScale, round(texId));

        color = texture(textures, coord);
        color = vec4(color.rgb * dim, color.a);
    }
}
