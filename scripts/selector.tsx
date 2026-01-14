import React, { useState, useEffect } from 'react';
import { render, Box, Text, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const ScriptSelector = () => {
    const { exit } = useApp();
    const [scripts, setScripts] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const packageJsonPath = path.resolve(process.cwd(), 'package.json');
        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            if (packageJson.scripts) {
                const scriptItems = Object.keys(packageJson.scripts)
                    .filter(script => script !== 'scripts') // Avoid recursive calling
                    .map((script) => ({
                        label: `${script} - ${packageJson.scripts[script]}`, 
                        value: script,
                    }));
                setScripts(scriptItems);
            }
        } catch (error) {
            console.error('Error reading package.json:', error);
            exit();
        }
    }, [exit]);

    const handleSelect = (item: { value: string }) => {
        exit(); // Exit the Ink app
        
        // Run the selected script
        console.log(`\nRunning script: ${item.value}\n`);
        const child = spawn('yarn', [item.value], { stdio: 'inherit', shell: true });
        
        child.on('exit', (code) => {
             process.exit(code ?? 0);
        });
    };

    if (scripts.length === 0) {
        return <Text>Loading scripts...</Text>;
    }

    return (
        <Box flexDirection="column" padding={1}>
            <Text color="green" bold>Select a script to run:</Text>
            <Box marginTop={1}>
                <SelectInput items={scripts} onSelect={handleSelect} />
            </Box>
        </Box>
    );
};

render(<ScriptSelector />);
