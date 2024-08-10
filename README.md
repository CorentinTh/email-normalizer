![Email Normalizer header](./.github/readme-header.png)

# Email Normalizer

A simple Node.js package to normalize email addresses by removing dots, stripping plus signs, and handling domain renaming.

## Features

- Convert to lowercase
- Removes dots from the email identifier for specific domains
- Strips plus signs and the following tags
- Renames domains (e.g., `googlemail.com` to `gmail.com`)
- Supports common email providers like Gmail, Googlemail, Hotmail, Live, and Outlook
- No dependencies
- Lightweight and runtime agnostic
- Typescript, ES6, and CommonJS support

## Installation

You can install the package using `pnpm`, `npm`, or `yarn`:

```bash
pnpm add email-normalizer
# or
npm install email-normalizer
# or
yarn add email-normalizer
```

## Usage

Here's how you can use the `email-normalizer` package:

```javascript
import { normalizeEmail } from 'email-normalizer';

const email = 'User.Name+tag@gmail.com';
const normalizedEmail = normalizeEmail({ email });

console.log(normalizedEmail); // Output: username@gmail.com
```

Note: An error will be thrown if the provided email address is invalid.

## API

### `normalizeEmail({ email: string }): string`

Normalizes the provided email address based on the configured rules for various domains.

**Parameters:**

- `email`: The email address to be normalized.

**Returns:**

- A normalized email address as a string.

## Configuration

The normalization rules are predefined for the following domains:

- `gmail.com`: Removes dots, strips plus sign and tags.
- `googlemail.com`: Removes dots, strips plus sign and tags, renames domain to `gmail.com`.
- `hotmail.com`: Strips plus sign and tags.
- `live.com`: Removes dots, strips plus sign and tags.
- `outlook.com`: Strips plus sign and tags.

## Scripts

The package.json includes several useful scripts:

- `build`: Builds the package using `unbuild`.
- `lint`: Lints the codebase using `eslint`.
- `lint:fix`: Fixes linting errors.
- `test`: Runs all tests.
- `test:unit`: Runs unit tests using `vitest`.
- `test:unit:watch`: Runs unit tests in watch mode.

## Development

To contribute to this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/CorentinTh/email-normalizer.git
cd email-normalizer
pnpm install
```

You can then build, lint, and test the project using the provided scripts.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Funding

Support this project through [GitHub Sponsors](https://github.com/sponsors/CorentinTh).

## Author

Developed by [Corentin Th](https://github.com/CorentinTh). You can reach out via [email](mailto:corentin.thomasset74+npm@gmail.com).
