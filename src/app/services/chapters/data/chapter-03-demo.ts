// src/app/services/chapters/data/chapter-03-demo.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_03_DATA: Chapter = {
  id: 3,
  title: 'Interactive Demo Playground',
  description: 'Live component demos with real-time property editing',
  icon: 'construct-outline',
  category: 'essentials',
  completed: false,
  hasDemo: false, // No demo - this chapter explains the playground itself
  sections: [
    {
      id: 7,
      title: 'What is the Component Playground?',
      content: `
        <h2>Component Playground Overview</h2>
        <p>The Component Playground is an interactive learning tool that lets you experiment with Ionic components in real-time without writing code.</p>

        <h3>Key Features:</h3>
        <ul>
          <li><strong>Live Preview:</strong> See component changes instantly as you adjust properties</li>
          <li><strong>Property Controls:</strong> Sliders, dropdowns, and toggles for all component properties</li>
          <li><strong>Code Generation:</strong> Automatic HTML and TypeScript code snippets</li>
          <li><strong>Copy-Paste Ready:</strong> One-click copy to use in your projects</li>
        </ul>

        <h3>How It Works:</h3>
        <ol>
          <li>Select a component from the demo selector</li>
          <li>Adjust properties using the controls</li>
          <li>Watch the preview update in real-time</li>
          <li>Copy the generated code to your project</li>
        </ol>
      `,
      codeSnippets: [
        {
          id: 7,
          language: 'typescript',
          title: 'Playground Architecture',
          code: `// Component Playground uses dynamic rendering
interface DemoComponent {
  id: string;
  name: string;
  defaultProps: Record<string, any>;
  propDefinitions: DemoProp[];
  templateGenerator: (props) => string;
  typescriptGenerator: (props) => string;
}

// Props are bound to form controls
// Template regenerates on every change
// Live preview shows current state`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Playground helps learn component APIs without documentation',
        'Generated code includes all imports and proper syntax',
        'Great for prototyping and exploring component variations',
      ],
    },
    {
      id: 8,
      title: 'Using Property Controls',
      content: `
        <h2>Property Control Types</h2>
        <p>The playground provides different control types for different property types:</p>

        <h3>Control Types:</h3>
        <ul>
          <li><strong>Text Input:</strong> For string properties (text, placeholder, label)</li>
          <li><strong>Select Dropdown:</strong> For enumerated values (color, size, fill)</li>
          <li><strong>Toggle Switch:</strong> For boolean properties (disabled, readonly)</li>
          <li><strong>Number Input:</strong> For numeric properties (min, max, step)</li>
        </ul>

        <h3>Tips:</h3>
        <ul>
          <li>Hover over control labels to see property descriptions</li>
          <li>Reset to defaults anytime</li>
          <li>Experiment freely - nothing breaks!</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 8,
          language: 'typescript',
          title: 'Example Property Definitions',
          code: `// Text input
{
  name: 'text',
  label: 'Button Text',
  type: 'text',
  defaultValue: 'Click Me',
  description: 'Text displayed on button'
}

// Select dropdown
{
  name: 'color',
  label: 'Color',
  type: 'select',
  options: [
    { value: 'primary', label: 'Primary' },
    { value: 'danger', label: 'Danger' }
  ],
  defaultValue: 'primary'
}

// Boolean toggle
{
  name: 'disabled',
  label: 'Disabled',
  type: 'boolean',
  defaultValue: false
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Control types map to HTML input types',
        'Select options are predefined valid values',
        'Form validation ensures only valid props',
      ],
    },
    {
      id: 9,
      title: 'Generated Code Tabs',
      content: `
        <h2>Understanding Generated Code</h2>
        <p>The playground generates two types of code for each component:</p>

        <h3>HTML Template Tab:</h3>
        <ul>
          <li>Shows just the component markup</li>
          <li>Includes only non-default properties</li>
          <li>Ready to paste into your template</li>
        </ul>

        <h3>TypeScript Component Tab:</h3>
        <ul>
          <li>Shows complete standalone component</li>
          <li>Includes all necessary imports</li>
          <li>Ready to use as-is or customize</li>
        </ul>

        <h3>Code Optimization:</h3>
        <p>Generated code omits default values to keep markup clean:</p>
        <ul>
          <li>Default color="primary" → not shown</li>
          <li>fill="solid" → not shown</li>
          <li>Custom values always included</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 9,
          language: 'typescript',
          title: 'Code Generation Logic',
          code: `templateGenerator: (props) => {
  // Only include non-default props
  const expand = props['expand'] !== 'default' 
    ? \` expand="\${props['expand']}"\` 
    : '';
  
  const color = props['color'] !== 'primary'
    ? \` color="\${props['color']}"\`
    : '';

  return \`<ion-button\${expand}\${color}>
  \${props['text']}
</ion-button>\`;
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Clean generated code teaches best practices',
        'Omitting defaults reduces bundle size',
        'TypeScript version shows proper imports',
      ],
    },
    {
      id: 10,
      title: 'Copy-Paste Workflow',
      content: `
        <h2>From Playground to Project</h2>
        <p>The playground is designed for rapid prototyping and learning:</p>

        <h3>Recommended Workflow:</h3>
        <ol>
          <li><strong>Explore:</strong> Try different component variations</li>
          <li><strong>Find:</strong> Discover the perfect configuration</li>
          <li><strong>Copy:</strong> Click copy button on code tab</li>
          <li><strong>Paste:</strong> Add to your project files</li>
          <li><strong>Customize:</strong> Adjust as needed</li>
        </ol>

        <h3>Best Practices:</h3>
        <ul>
          <li>Start with playground to learn component API</li>
          <li>Copy HTML for simple use cases</li>
          <li>Copy TypeScript for complete examples</li>
          <li>Customize copied code for your needs</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 10,
          language: 'typescript',
          title: 'Copy to Clipboard Implementation',
          code: `async copyCode(code: string) {
  try {
    await navigator.clipboard.writeText(code);
    
    const toast = await this.toastCtrl.create({
      message: 'Code copied to clipboard!',
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Clipboard API is browser standard',
        'Toast feedback confirms copy success',
        'Fallback for browsers without clipboard API',
      ],
    },
  ],
};
