#[macro_use]
extern crate rocket;

use std::collections::HashMap;

use rocket::serde::{json::Json, Serialize};

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct Response<'a> {
    msg: Lesson<'a>,
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct Lesson<'a> {
    speech: Vec<&'a str>,
    completed_speech: &'a str,
    commands: HashMap<&'a str, &'a str>,
}

#[get("/")]
fn index<'a>() -> Json<Response<'a>> {
    let lesson = Lesson {
        speech: vec![
            "Welcome to TerminalFroggy!",
            "Try listing all files and folders in your current directory using the `ls` command",
        ],
        completed_speech: "Wow! Look at you go!",
        commands: HashMap::from([
            (
                "ls",
                r#"<div className="w-full flex justify-start"><span className="mr-6">congrats.txt</span><span>super-secret-frogs/</span></div>"#,
            ),
            (
                "cd",
                r#"<span>Slow down froggy, we haven't taught you that yet ;)</span>"#,
            ),
        ]),
    };

    Json(Response { msg: lesson })
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}
