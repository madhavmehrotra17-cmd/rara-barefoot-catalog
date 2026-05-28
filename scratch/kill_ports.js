const { execSync } = require('child_process');
const ports = [5176, 5178];
for (const port of ports) {
    try {
        const output = execSync(`netstat -ano | findstr :${port}`).toString();
        const lines = output.trim().split('\n');
        for (const line of lines) {
            const tokens = line.trim().split(/\\s+/);
            const pid = tokens[tokens.length - 1];
            if (pid && pid !== '0' && /^[0-9]+$/.test(pid)) {
                try {
                    execSync(`taskkill /F /PID ${pid}`);
                    console.log(`Successfully killed process ${pid} on port ${port}`);
                } catch(err) {
                    // Process might have already exited
                }
            }
        }
    } catch (e) {
        console.log(`Port ${port} is already free.`);
    }
}
