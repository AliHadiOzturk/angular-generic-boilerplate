const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { config } = require('./table-check.config');



function isAllowedFile(filePath: any): boolean {
  return config.allowedFiles.some((allowed: string) =>
    filePath.endsWith(allowed)
  );
}

function checkFile(filePath: string): string[] {
  const violations: string[] = [];
  const content = fs.readFileSync(filePath, 'utf-8');

  // Skip allowed files
  if (isAllowedFile(filePath)) {
    return violations;
  }

  // Check for table usage patterns
  config.tablePatterns.forEach((pattern: string) => {
    if (content.includes(pattern)) {
      violations.push(
        `File ${filePath} contains unauthorized table usage: ${pattern}`
      );
    }
  });

  return violations;
}

function main(): void {
  try {
    const srcPath = path.join(process.cwd(), 'src');
    const files: string[] = glob.sync('**/*.{ts,html}', {
      cwd: srcPath,
      ignore: ['**/node_modules/**', '**/dist/**'],
    });

    const allViolations: string[] = [];

    files.forEach((file: string) => {
      const fullPath = path.join(srcPath, file);
      const fileViolations = checkFile(fullPath);
      allViolations.push(...fileViolations);
    });

    if (allViolations.length > 0) {
      console.error('\x1b[31m%s\x1b[0m', '❌ Table usage violations found:');
      allViolations.forEach((violation: string) => {
        console.error('\x1b[31m%s\x1b[0m', violation);
      });
      process.exit(1);
    } else {
      console.log('\x1b[32m%s\x1b[0m', '✅ No unauthorized table usage found');
      process.exit(0);
    }
  } catch (error: unknown) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      '❌ Error running table usage check:',
      error
    );
    process.exit(1);
  }
}

main();
