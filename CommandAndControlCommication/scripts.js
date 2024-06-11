document.getElementById('startDemo').addEventListener('click', function() {
    const demoContent = document.getElementById('c2Demo');
    demoContent.innerHTML = `
        <p><strong>Step 1:</strong> Malware on the infected system sends a signal to the attacker's C2 server.</p>
        <p><strong>Step 2:</strong> The C2 server responds with instructions for the malware.</p>
        <p><strong>Step 3:</strong> The malware executes the instructions, such as exfiltrating data or downloading additional payloads.</p>
        <p><strong>Step 4:</strong> This communication continues, allowing the attacker to maintain control over the compromised system.</p>
    `;
});

document.getElementById('startSocDemo').addEventListener('click', function() {
    const socContent = document.getElementById('socDemo');
    socContent.innerHTML = `
        <p><strong>Step 1:</strong> Analyze the alert to determine its validity and scope.</p>
        <p><strong>Step 2:</strong> Isolate the affected systems to prevent further spread of the threat.</p>
        <p><strong>Step 3:</strong> Investigate the source and method of C2 communication using network traffic analysis tools.</p>
        <p><strong>Step 4:</strong> Identify and block malicious IP addresses, domains, and signatures associated with the C2 traffic.</p>
        <p><strong>Step 5:</strong> Collaborate with incident response teams to remediate the affected systems and eliminate the malware.</p>
        <p><strong>Step 6:</strong> Document findings and update threat intelligence to enhance future detection and prevention efforts.</p>
    `;
});