use std::fs::read_to_string;

use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct Config {
    openai_key: Option<String>,
}

fn main() {
    tauri::Builder
        ::default()
        .invoke_handler(tauri::generate_handler![read_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn read_config() -> String {
    let content = read_to_string("C:\\.notepadai\\config.toml").unwrap();
    // TODO: Make this safe "C:\.notepadai\config.toml"
    let config: Config = toml::from_str(&content).unwrap();
    return config.openai_key.unwrap();
}
