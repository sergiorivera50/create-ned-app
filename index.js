#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const createProjectDirectory = (name, dir) => {
  const projectPath = path.join(dir, name);

  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`The application ${name} already exist in the current directory, please give it another name.`);
    } else {
      console.log(err);
    }
    process.exit(1);
  }

  return projectPath
}

const createNedApp = async (repo) => {
  try {
    const projectPath = createProjectDirectory(process.argv[2], process.cwd())

    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log('Installing dependencies...');
    execSync('npm install');

    console.log('Removing useless files...');
    execSync('npx rimraf ./.git');

    console.log('Creating .env file...')
    execSync('touch .env')

    console.log('Initializing git...')
    execSync('git init -b main')

    console.log('Your N.E.D. application is ready, happy coding! 🔥');

  } catch (error) {
    console.log(error);
  }
}

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx create-ned-app express-backend');
  process.exit(1);
}

createNedApp('https://github.com/sergiorivera50/ned-boilerplate.git')
