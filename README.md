# Latest React CLI (TypeScript)

A CLI tool to streamline the creation of React projects, components, and hooks with TypeScript and Jest.

## Features

- **Create React Projects**: Quickly scaffold a React project with TypeScript and Jest.
- **Generate Components**: Create React components with TypeScript and testing files.
- **Generate Hooks**: Create custom React hooks with TypeScript.

## Installation

Install the CLI globally using npm:

```bash
# npm install -g latest-react-cli-ts
npm install -g rt-ts
npx install -g rt-ts
```

## Usage

### Create a New React Project

```bash
 rt-ts create-project <projectname>
 rt-ts crp <projectname>
```

- **Alias**: `crp`
- **Description**: Creates a new React project with TypeScript and Jest.
- **Example**:
  ```bash
  latest-react-cli-ts create-project my-app
  ```

### Create a New Component

```bash
rt-ts create-component <componentname>
rt-ts crc <componentname>
```

- **Alias**: `crc`
- **Description**: Creates a new React component with TypeScript and a test file.
- **Example**:
  ```bash
  latest-react-cli-ts create-component MyComponent
  ```

### Create a New Hook

```bash
rt-ts create-hook <hookname>
rt-ts crh <hookname>
```

- **Alias**: `crh`
- **Description**: Creates a new custom React hook with TypeScript.
- **Example**:
  ```bash
  latest-react-cli-ts create-hook useCustomHook
  ```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/latest-react-cli-ts.git
   cd latest-react-cli-ts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Link the CLI locally:
   ```bash
   npm link
   ```

### Run Locally

Use the CLI commands locally after linking:
```bash
rt-ts <command>
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.