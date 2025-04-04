#!/usr/bin/env node

import chalk from "chalk"
import inquirer from "inquirer"
import open from "open"
import figlet from "figlet"

/**
 * Project data
 */
const PROJECTS = [
  {
    name: "The Daily Crimes",
    description:
      "The Daily Crimes is a modern newspaper-inspired platform delivering real-time crime coverage across India. Features a classic layout with contemporary design elements, enhanced by dynamic animations and interactive visuals for an engaging news experience.",
    link: "https://thedailycrimes.vercel.app/",
  },
  {
    name: "Cuez",
    description:
      "Cuez is a social media platform designed specifically for programmers. It offers multiple features tailored to developers, including the ability to upload projects, ask doubts, and explore job opportunities. With a community-driven approach, Cuez helps programmers connect, learn, and grow together.",
    link: "https://cuez.vercel.app",
  },
]

/**
 * Display header and personal information
 */
function displayHeader() {
  const text = figlet.textSync("Boo!", {
    font: "Ghost",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100,
    whitespaceBreak: true,
  })

  console.log(chalk.whiteBright.bold(text))

  const infoLines = [
    "\n",
    chalk.gray("Hey, I'm ") + chalk.white.bold("Rinkit Adhana"),
    chalk.gray(
      "I'm an undergraduate Computer Science student from Delhi, India."
    ),
    chalk.gray(
      "Passionate about crafting innovative solutions that solve real-world problems."
    ),
    chalk.gray(
      "Deeply interested in web development, AI/ML, open source, and freelancing."
    ),
    "",
    chalk.white.bold("Socials:"),
    "",
    chalk.white("  Twitter:") + " " + chalk.magenta("https://x.com/damnGruz"),
    chalk.white("  LinkedIn:") +
      " " +
      chalk.magenta("https://www.linkedin.com/in/rinkitadhana/"),
    chalk.white("  GitHub:") +
      " " +
      chalk.magenta("https://github.com/rinkitadhana"),
    chalk.white("  Website:") + " " + chalk.magenta("https://www.rinkit.tech"),
  ]

  // Display info lines
  infoLines.forEach((line) => console.log(line))
}

/**
 * Display and interact with projects
 */
async function showProjects() {
  console.clear()
  console.log("\n")

  // Header
  console.log(chalk.white.bold("Selected Projects\n"))

  // Display each project
  PROJECTS.forEach((project, index) => {
    console.log(chalk.blue.bold(`${index + 1}. ${project.name}`))
    // Word wrap the description
    const words = project.description.split(" ")
    let line = ""
    words.forEach((word) => {
      if ((line + word).length > 50) {
        console.log(chalk.white(`   ${line}`))
        line = word + " "
      } else {
        line += word + " "
      }
    })
    if (line) console.log(chalk.white(`   ${line}`))
    console.log(chalk.magenta(`   🔗 ${project.link}`))
    console.log()
  })

  console.log(
    chalk.gray("Tip:") +
      chalk.white(" Use ") +
      chalk.magenta("cmd/ctrl + click") +
      chalk.white(" to open links directly\n")
  )

  // Project actions
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: chalk.white("What would you like to do?"),
      choices: [
        ...PROJECTS.map((project, index) => ({
          name: chalk.blue(`${index + 1}. Visit ${project.name}`),
          value: `visit_${index}`,
        })),
        { name: chalk.blue("View more projects"), value: "more" },
        { name: chalk.red("Back to main menu"), value: "back" },
      ],
      styles: {
        selected: chalk.white,
      },
      prefix: "💡",
    },
  ])

  if (action === "back") {
    console.clear()
    return
  }

  if (action === "more") {
    await open("https://github.com/rinkitadhana?tab=repositories")
    console.log(chalk.green("\n✨ Opening GitHub repositories...\n"))
    return
  }

  const projectIndex = parseInt(action.split("_")[1])
  const project = PROJECTS[projectIndex]
  await open(project.link)
  console.log(chalk.green(`\n✨ Opening ${project.name}...\n`))
}

/**
 * Main application loop
 */
async function main() {
  console.clear()
  while (true) {
    console.log("\n")
    displayHeader()
    console.log("\n")

    console.log(
      chalk.gray("Tip:") +
        chalk.white(" Use ") +
        chalk.magenta("cmd/ctrl + click") +
        chalk.white(" to open links directly\n")
    )

    const choices = [
      {
        name: chalk.blue("View my Projects"),
        value: "projects",
      },
      {
        name: chalk.blue("Visit my Portfolio"),
        value: "portfolio",
      },
      {
        name: chalk.blue("Send me an Email"),
        value: "email",
      },
      {
        name: chalk.blue("Check out my GitHub"),
        value: "github",
      },
      {
        name: chalk.red("Exit"),
        value: "exit",
      },
    ]

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: chalk.white("What would you like to do?"),
        choices,
        styles: {
          selected: chalk.white,
        },
        prefix: "💡",
      },
    ])
    try {
      switch (action) {
        case "projects":
          await showProjects()
          break
        case "portfolio":
          await open("https://www.rinkit.tech")
          break
        case "email":
          await open("mailto:rinkitadhana@gmail.com")
          break
        case "github":
          await open("https://github.com/rinkitadhana")
          break
        case "exit":
          console.log(
            chalk.blue("\n👋 Thank you for visiting! Have a great day!\n")
          )
          process.exit(0)
      }

      if (action !== "projects" && action !== "exit") {
        console.log(chalk.green("\n✨ Opening requested link...\n"))
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.clear()
      }
    } catch (error) {
      console.error(
        chalk.red("\n❌ Error: Could not open the requested link\n")
      )
      console.error(error)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
}

main().catch(console.error)
