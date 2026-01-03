#!/usr/bin/env node

import process from 'node:process';

import { createPackage } from './commands/create.js';

const cwd = process.cwd();

// For now, just run the create command
// Later we can add proper CLI routing with command selection
await createPackage({ cwd });
