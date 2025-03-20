// Agent System Visualization
function createAgentVisualization() {
    const width = document.getElementById('moderator-visualization').clientWidth;
    const height = document.getElementById('moderator-visualization').clientHeight;

    const svg = d3.select('#moderator-visualization')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = {
        nodes: [
            { id: 'moderator', name: 'Moderator Agent', x: width/2, y: height/4 },
            { id: 'generation', name: 'Generation Agent', x: width/4, y: height*3/4 },
            { id: 'review', name: 'Review Agent', x: width*2/4, y: height*3/4 },
            { id: 'ranking', name: 'Ranking Agent', x: width*3/4, y: height*3/4 },
        ],
        links: [
            { source: 'moderator', target: 'generation' },
            { source: 'moderator', target: 'review' },
            { source: 'moderator', target: 'ranking' },
            { source: 'generation', target: 'review' },
            { source: 'review', target: 'ranking' },
        ]
    };

    // Create links
    svg.selectAll('line')
        .data(data.links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('x1', d => data.nodes.find(n => n.id === d.source).x)
        .attr('y1', d => data.nodes.find(n => n.id === d.source).y)
        .attr('x2', d => data.nodes.find(n => n.id === d.target).x)
        .attr('y2', d => data.nodes.find(n => n.id === d.target).y);

    // Create nodes
    const nodes = svg.selectAll('g')
        .data(data.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x},${d.y})`);

    nodes.append('circle')
        .attr('r', d => d.id === 'moderator' ? 25 : 20)
        .attr('fill', d => d.id === 'moderator' ? '#6366f1' : '#8b5cf6');

    nodes.append('text')
        .attr('dy', 30)
        .attr('text-anchor', 'middle')
        .text(d => d.name);
}

// Stakeholder Interaction Visualization
function createStakeholderVisualization() {
    const width = document.getElementById('stakeholder-visualization').clientWidth;
    const height = document.getElementById('stakeholder-visualization').clientHeight;

    const svg = d3.select('#stakeholder-visualization')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = {
        nodes: [
            { id: 'platform', name: 'Scientific Platform', x: width/2, y: height/2, group: 'core' },
            { id: 'medical', name: 'Medical Affairs', x: width/4, y: height/4, group: 'medical' },
            { id: 'clinical', name: 'Clinical Development', x: width*3/4, y: height/4, group: 'clinical' },
            { id: 'market', name: 'Market Access', x: width/4, y: height*3/4, group: 'market' },
            { id: 'regulatory', name: 'Regulatory', x: width*3/4, y: height*3/4, group: 'regulatory' },
            { id: 'heor', name: 'HEOR', x: width*2/3, y: height/3, group: 'market' },
            { id: 'msl', name: 'MSLs', x: width/3, y: height/3, group: 'medical' },
            { id: 'rwe', name: 'RWE', x: width*2/3, y: height*2/3, group: 'clinical' },
            { id: 'kol', name: 'KOLs', x: width/3, y: height*2/3, group: 'external' }
        ],
        links: [
            { source: 'platform', target: 'medical' },
            { source: 'platform', target: 'clinical' },
            { source: 'platform', target: 'market' },
            { source: 'platform', target: 'regulatory' },
            { source: 'platform', target: 'heor' },
            { source: 'platform', target: 'msl' },
            { source: 'platform', target: 'rwe' },
            { source: 'platform', target: 'kol' },
            { source: 'medical', target: 'clinical' },
            { source: 'clinical', target: 'regulatory' },
            { source: 'market', target: 'regulatory' },
            { source: 'medical', target: 'msl' },
            { source: 'clinical', target: 'rwe' },
            { source: 'market', target: 'heor' },
            { source: 'medical', target: 'kol' }
        ]
    };

    // Create links with gradients
    const links = svg.selectAll('line')
        .data(data.links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('x1', d => data.nodes.find(n => n.id === d.source).x)
        .attr('y1', d => data.nodes.find(n => n.id === d.source).y)
        .attr('x2', d => data.nodes.find(n => n.id === d.target).x)
        .attr('y2', d => data.nodes.find(n => n.id === d.target).y);

    // Create nodes with labels
    const nodes = svg.selectAll('g')
        .data(data.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x},${d.y})`);

    // Add different colors based on group
    const colorMap = {
        'core': '#6366f1',      // Primary color
        'medical': '#10b981',   // Success color
        'clinical': '#8b5cf6',  // Secondary color
        'market': '#f59e0b',    // Warning color
        'regulatory': '#ef4444', // Error color
        'external': '#0ea5e9'   // Info color
    };

    nodes.append('circle')
        .attr('r', d => d.id === 'platform' ? 30 : 20)
        .attr('fill', d => colorMap[d.group] || '#6366f1');

    nodes.append('text')
        .attr('dy', 30)
        .attr('text-anchor', 'middle')
        .text(d => d.name);
}

// Tournament Visualization
function createTournamentVisualization() {
    const width = document.getElementById('tournament-visualization').clientWidth;
    const height = document.getElementById('tournament-visualization').clientHeight;

    const svg = d3.select('#tournament-visualization')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Add gradient definitions
    const defs = svg.append("defs");
    
    // Define the gradient for the nodes
    const blueGradient = defs.append("linearGradient")
        .attr("id", "blueGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");
    
    blueGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#3b82f6");
    
    blueGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#1d4ed8");
    
    // Define gradient for semi-finalists
    const purpleGradient = defs.append("linearGradient")
        .attr("id", "purpleGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");
    
    purpleGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#6366f1");
    
    purpleGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#4f46e5");
    
    // Define gradient for final
    const greenGradient = defs.append("linearGradient")
        .attr("id", "greenGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");
    
    greenGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#10b981");
    
    greenGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#059669");
        
    // Define the tournament brackets with additional tooltip information
    const rounds = [
        { round: 1, positions: [
            { x: width * 0.15, y: height * 0.2, name: "SCP Concept 1", color: "url(#blueGradient)", 
              tooltip: "Evidence-based scientific platform focusing on clinical outcomes" },
            { x: width * 0.15, y: height * 0.4, name: "SCP Concept 2", color: "url(#blueGradient)",
              tooltip: "Mechanism-driven scientific platform emphasizing molecular pathways" },
            { x: width * 0.15, y: height * 0.6, name: "SCP Concept 3", color: "url(#blueGradient)",
              tooltip: "Patient-centric platform integrating real-world evidence" },
            { x: width * 0.15, y: height * 0.8, name: "SCP Concept 4", color: "url(#blueGradient)",
              tooltip: "Comparative platform highlighting differentiation from standard of care" }
        ]},
        { round: 2, positions: [
            { x: width * 0.5, y: height * 0.3, name: "Semi-Finalist 1", color: "url(#purpleGradient)",
              tooltip: "Refined scientific platform incorporating clinical and mechanistic elements" },
            { x: width * 0.5, y: height * 0.7, name: "Semi-Finalist 2", color: "url(#purpleGradient)",
              tooltip: "Enhanced platform with patient outcomes and comparative advantages" }
        ]},
        { round: 3, positions: [
            { x: width * 0.85, y: height * 0.5, name: "Final SCP", color: "url(#greenGradient)",
              tooltip: "Comprehensive scientific platform integrating all key elements for optimal impact" }
        ]}
    ];
    
    // Add round labels
    svg.append('text')
        .attr('x', width * 0.15)
        .attr('y', height * 0.05)
        .attr('text-anchor', 'middle')
        .attr('class', 'round-label')
        .text('Round 1: Initial Concepts')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', '#60a5fa');
        
    svg.append('text')
        .attr('x', width * 0.5)
        .attr('y', height * 0.05)
        .attr('text-anchor', 'middle')
        .attr('class', 'round-label')
        .text('Round 2: Semi-Finalists')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', '#818cf8');
        
    svg.append('text')
        .attr('x', width * 0.85)
        .attr('y', height * 0.05)
        .attr('text-anchor', 'middle')
        .attr('class', 'round-label')
        .text('Final Selection')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', '#34d399');

    // Create a tooltip div
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "rgba(35, 45, 55, 0.9)")
        .style("color", "white")
        .style("padding", "8px 12px")
        .style("border-radius", "6px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("max-width", "220px")
        .style("z-index", "10");

    // Draw connecting lines between rounds with animation
    function drawConnectingLine(x1, y1, x2, y2) {
        return svg.append('line')
            .attr('class', 'link')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x1)  // Start at source for animation
            .attr('y2', y1)
            .transition()
            .duration(1000)
            .attr('x2', x2)
            .attr('y2', y2);
    }
    
    // Draw lines with slight delay between them
    setTimeout(() => {
        drawConnectingLine(rounds[0].positions[0].x, rounds[0].positions[0].y, 
                          rounds[1].positions[0].x, rounds[1].positions[0].y);
    }, 300);
    
    setTimeout(() => {
        drawConnectingLine(rounds[0].positions[1].x, rounds[0].positions[1].y, 
                          rounds[1].positions[0].x, rounds[1].positions[0].y);
    }, 600);
    
    setTimeout(() => {
        drawConnectingLine(rounds[0].positions[2].x, rounds[0].positions[2].y, 
                          rounds[1].positions[1].x, rounds[1].positions[1].y);
    }, 900);
    
    setTimeout(() => {
        drawConnectingLine(rounds[0].positions[3].x, rounds[0].positions[3].y, 
                          rounds[1].positions[1].x, rounds[1].positions[1].y);
    }, 1200);
    
    setTimeout(() => {
        drawConnectingLine(rounds[1].positions[0].x, rounds[1].positions[0].y, 
                          rounds[2].positions[0].x, rounds[2].positions[0].y);
    }, 1500);
    
    setTimeout(() => {
        drawConnectingLine(rounds[1].positions[1].x, rounds[1].positions[1].y, 
                          rounds[2].positions[0].x, rounds[2].positions[0].y);
    }, 1800);
    
    // Add process labels for each connection
    svg.append('text')
        .attr('x', width * 0.3)
        .attr('y', height * 0.2)
        .attr('text-anchor', 'middle')
        .attr('class', 'process-label')
        .text('Evidence Evaluation')
        .style('font-size', '11px')
        .style('fill', '#94a3b8')
        .style('opacity', 0)
        .transition()
        .delay(400)
        .duration(500)
        .style('opacity', 1);
        
    svg.append('text')
        .attr('x', width * 0.3)
        .attr('y', height * 0.7)
        .attr('text-anchor', 'middle')
        .attr('class', 'process-label')
        .text('Stakeholder Review')
        .style('font-size', '11px')
        .style('fill', '#94a3b8')
        .style('opacity', 0)
        .transition()
        .delay(1000)
        .duration(500)
        .style('opacity', 1);
        
    svg.append('text')
        .attr('x', width * 0.67)
        .attr('y', height * 0.4)
        .attr('text-anchor', 'middle')
        .attr('class', 'process-label')
        .text('Refinement & Integration')
        .style('font-size', '11px')
        .style('fill', '#94a3b8')
        .style('opacity', 0)
        .transition()
        .delay(1600)
        .duration(500)
        .style('opacity', 1);

    // Draw round nodes with animation
    rounds.forEach((round, roundIndex) => {
        round.positions.forEach((position, posIndex) => {
            setTimeout(() => {
                const g = svg.append('g')
                    .attr('transform', `translate(${position.x},${position.y})`)
                    .style('opacity', 0)
                    .attr('class', 'node-group')
                    .transition()
                    .duration(500)
                    .style('opacity', 1);
                    
                g.append('circle')
                    .attr('r', 0)
                    .attr('fill', position.color)
                    .transition()
                    .duration(500)
                    .attr('r', roundIndex === 2 ? 25 : 20)
                    .attr('stroke', '#ffffff')
                    .attr('stroke-width', 1)
                    .attr('stroke-opacity', 0.3);
                    
                g.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('dy', 30)
                    .text(position.name)
                    .style('font-size', roundIndex === 2 ? '14px' : '12px');
                
                // Add mouseover and mouseout event handlers after the transition
                setTimeout(() => {
                    g.on('mouseover', function(event) {
                        d3.select(this).select('circle')
                            .transition()
                            .duration(300)
                            .attr('r', roundIndex === 2 ? 28 : 23);
                            
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", 1);
                        
                        tooltip.html(position.tooltip)
                            .style("left", (event.pageX + 15) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    })
                    .on('mouseout', function() {
                        d3.select(this).select('circle')
                            .transition()
                            .duration(300)
                            .attr('r', roundIndex === 2 ? 25 : 20);
                            
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                    })
                    .on('click', function() {
                        // Show additional information when clicked
                        const infoBox = document.getElementById('info-box');
                        if (infoBox) {
                            infoBox.innerHTML = `<h4>${position.name}</h4><p>${position.tooltip}</p>`;
                            infoBox.style.display = 'block';
                            
                            // Hide the info box after 3 seconds
                            setTimeout(() => {
                                infoBox.style.display = 'none';
                            }, 3000);
                        }
                    });
                }, 500);
            }, 300 * (roundIndex * 4 + posIndex));
        });
    });
    
    // Add info box container if it doesn't exist
    if (!document.getElementById('info-box')) {
        const infoBox = document.createElement('div');
        infoBox.id = 'info-box';
        infoBox.classList.add('info-box');
        infoBox.style.display = 'none';
        infoBox.style.position = 'absolute';
        infoBox.style.padding = '10px';
        infoBox.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
        infoBox.style.borderRadius = '6px';
        infoBox.style.color = 'white';
        infoBox.style.maxWidth = '250px';
        infoBox.style.top = '50%';
        infoBox.style.left = '50%';
        infoBox.style.transform = 'translate(-50%, -50%)';
        infoBox.style.zIndex = '100';
        infoBox.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
        document.getElementById('tournament-visualization').appendChild(infoBox);
    }
}

// Initialize visualizations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createTournamentVisualization();
    
    // Add animation to progress bars
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.bg-blue-500.h-2\\.5.rounded-full');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 500);
}); 