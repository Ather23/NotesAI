use std::{ fs::{ self, create_dir_all, read_dir, read_to_string }, result };
use app::chat::{
    self,
    chat_manager::ChatManager,
    chat_session::ChatSession,
    persistence::PersistedChatSession,
};
use chrono::{ DateTime, Utc };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Deserialize)]
struct Config {
    openai_key: Option<String>,
}

fn main() {
    tauri::Builder
        ::default()
        .invoke_handler(
            tauri::generate_handler![read_config, list_all_sessions, load_chat_from_session]
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn load_chat_from_session(session: String) -> PersistedChatSession {
    //TODO: make path dynamic
    let chat_mgr: ChatManager = ChatManager::new(
        &format!("D:\\git_repos\\chat_cache\\data\\{session}")
    );
    let session: ChatSession = chat_mgr.load_history_from_path().unwrap().into();
    println!("Session: {:?}", session);
    return session.into();
}

#[tauri::command]
fn list_all_sessions() -> Vec<String> {
    let dir_path = "D:\\git_repos\\chat_cache\\data\\";
    let dir_entries = fs::read_dir(dir_path).unwrap();

    let mut result: Vec<String> = Vec::new();
    for files in dir_entries {
        result.push(files.unwrap().file_name().into_string().unwrap());
    }
    println!("Result {:?}", &result);
    return result;
}

#[tauri::command]
fn read_config() -> String {
    let content = read_to_string("C:\\.notepadai\\config.toml").unwrap();
    // TODO: Make this safe "C:\.notepadai\config.toml"
    let config: Config = toml::from_str(&content).unwrap();
    return config.openai_key.unwrap();
}
