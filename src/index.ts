#!/usr/bin/env node


const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { program } = require("commander");

//command 1: create project
interface CreateProjectActionParams {
  projectName: string;
}

program
  .command("create-project <projectname>")
  .alias("crp")
  .description("Create react project with typescript and jest")
  .action((projectName: CreateProjectActionParams["projectName"]) => {
    const projectPath: string = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
      console.error(`Error: Directory "${projectName}" already exists.`);
      process.exit(1);
    }
    fs.mkdirSync(projectPath);

    console.log(`Creating project in ${projectPath}...`);
    execSync(`npm create vite@latest ${projectName} -- --template react-ts`, {
      stdio: "inherit",
    });

    process.chdir(projectPath);

    console.log("Installing Jest and related dependencies...");
    execSync("npm install --save-dev jest @types/jest ts-jest", {
      stdio: "inherit",
    });

    console.log("Configuring Jest...");
    const jestConfig: string = `
            module.exports = {
                testEnvironment: 'jsdom',
                moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
                transform: {
                    '^.+\\\\.(ts|tsx)$': 'ts-jest',
                },
            };
                    `;
    fs.writeFileSync(path.join(projectPath, "jest.config.js"), jestConfig);

    console.log("Creating example files...");
    const appTsx: string = `
            import React from 'react';
            
            const App: React.FC = () => {
                return <h1>Hello, React + TypeScript!</h1>;
            };
            
            export default App;
                    `;
    fs.writeFileSync(path.join(projectPath, "src", "App.tsx"), appTsx);

    const appTestTsx: string = `
            import React from 'react';
            import { render, screen } from '@testing-library/react';
            import App from './App';
            
            test('renders the correct content', () => {
                render(<App />);
                expect(screen.getByText('Hello, React + TypeScript!')).toBeInTheDocument();
            });
                    `;
    fs.writeFileSync(path.join(projectPath, "src", "App.test.tsx"), appTestTsx);

    console.log("Setup complete! Run the following commands to get started:");
    console.log(`cd ${projectName}`);
    console.log("npm install");
    console.log("npm run dev");
  });

//command 4: create component
interface CreateComponentActionParams {
  componentName: string;
}

interface FileContent {
  main: string;
  test: string;
}

program
  .command("create-component <componentname>")
  .alias("crc")
  .description("Creating a component")
  .action((name: CreateComponentActionParams["componentName"]) => {
    let targetDir: string;
    let fileContent: FileContent;

    targetDir = path.join(process.cwd(), "src", "components", name);
    fileContent = {
      main: `
            import React from 'react';

            interface ${name}Props {}

            const ${name}: React.FC<${name}Props> = () => {
            return <div>${name} Component</div>;
            };

            export default ${name};
                    `,
                test: `
            import React from 'react';
            import { render, screen } from '@testing-library/react';
            import '@testing-library/jest-dom';
            import ${name} from './${name}';

            test('renders ${name} component', () => {
            render(<${name} />);
            expect(screen.getByText('${name} Component')).toBeInTheDocument();
            });
          `,
    };
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(targetDir, `${name}.tsx`),
      fileContent.main.trim()
    );
    if (fileContent.test) {
      fs.writeFileSync(
        path.join(targetDir, `${name}.test.tsx`),
        fileContent.test.trim()
      );
    }

    console.log(`"${name}" has been created successfully in ${targetDir}`);
  });

//command 5: create
interface CreateHookActionParams {
  hookName: string;
}

interface HookFileContent {
  main: string;
}

program
  .command("create-hook <hookname>")
  .alias("crh")
  .description("Create a hook")
  .action((name: CreateHookActionParams["hookName"]) => {
    const targetDir: string = path.join(process.cwd(), "src", "hooks");
    const fileContent: HookFileContent = {
      main: `
                import { useState } from 'react';

                const use${name} = () => {
                    const [state, setState] = useState(null);

                    return [state, setState];
                };

                export default use${name};
            `,
    };
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(targetDir, `${name}.tsx`),
      fileContent.main.trim()
    );

    console.log(`"${name}" has been created successfully in ${targetDir}`);
  });

//Parse the arguments and run the commands
program.parse(process.argv);
