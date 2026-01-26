// src/app/services/chapters/data/chapter-29.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_29_DATA: Chapter = {
  id: 29,
  title: 'AI Integration Fundamentals',
  description: 'Integrate AI provider APIs (OpenAI, Anthropic, Google Gemini) into Ionic applications with streaming responses, cost management, rate limiting, and multi-provider architecture for production-ready AI features.',
  icon: 'aperture-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 290,
      title: 'AI Provider APIs Overview',
      content: `
        <h2>Understanding Large Language Models</h2>
        <p>Large Language Models (LLMs) are neural networks trained on massive text datasets to predict the next token in a sequence. They use transformer architecture with self-attention mechanisms to understand context and generate human-like text.</p>

        <h3>How LLMs Work</h3>
        <ol>
          <li><strong>Tokenization:</strong> Text split into tokens (subwords, ~4 characters each)</li>
          <li><strong>Embeddings:</strong> Tokens converted to high-dimensional vectors</li>
          <li><strong>Transformer Blocks:</strong> Self-attention + feedforward layers</li>
          <li><strong>Attention Mechanism:</strong> Model learns which tokens to focus on</li>
          <li><strong>Prediction:</strong> Output probability distribution for next token</li>
          <li><strong>Sampling:</strong> Select token using temperature, top-k, or top-p</li>
          <li><strong>Repeat:</strong> Continue until stop sequence or max tokens</li>
        </ol>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Context Window:</strong> Maximum tokens model can process (GPT-4: 128K, Claude: 200K, Gemini: 1M)</li>
          <li><strong>Temperature:</strong> Controls randomness (0=deterministic, 2=creative)</li>
          <li><strong>Tokens:</strong> Subword units determining cost and limits</li>
          <li><strong>Top-p (nucleus sampling):</strong> Sample from top tokens with cumulative probability p</li>
          <li><strong>Max Tokens:</strong> Maximum length of generated response</li>
        </ul>

        <h3>Provider Comparison</h3>
        <table>
          <tr>
            <th>Provider</th>
            <th>Model</th>
            <th>Context Window</th>
            <th>Pricing (Input/Output per 1M tokens)</th>
            <th>Best For</th>
          </tr>
          <tr>
            <td>OpenAI</td>
            <td>GPT-4 Turbo</td>
            <td>128K tokens</td>
            <td>$10 / $30</td>
            <td>Complex reasoning, coding</td>
          </tr>
          <tr>
            <td>OpenAI</td>
            <td>GPT-3.5 Turbo</td>
            <td>16K tokens</td>
            <td>$0.50 / $1.50</td>
            <td>Quick responses, simple tasks</td>
          </tr>
          <tr>
            <td>Anthropic</td>
            <td>Claude 3.5 Sonnet</td>
            <td>200K tokens</td>
            <td>$3 / $15</td>
            <td>Long documents, precise instructions</td>
          </tr>
          <tr>
            <td>Anthropic</td>
            <td>Claude 3 Haiku</td>
            <td>200K tokens</td>
            <td>$0.25 / $1.25</td>
            <td>Quick responses, high volume</td>
          </tr>
          <tr>
            <td>Google</td>
            <td>Gemini 1.5 Pro</td>
            <td>1M tokens</td>
            <td>$1.25 / $5</td>
            <td>Multimodal, very long documents</td>
          </tr>
          <tr>
            <td>Google</td>
            <td>Gemini 1.5 Flash</td>
            <td>1M tokens</td>
            <td>$0.075 / $0.30</td>
            <td>Cost-sensitive, high volume</td>
          </tr>
        </table>

        <h3>Multi-Provider Strategy</h3>
        <p>Using multiple providers offers:</p>
        <ul>
          <li>Redundancy: Continue if one provider fails</li>
          <li>Cost optimization: Route to cheapest provider</li>
          <li>Performance: Use fastest for real-time tasks</li>
          <li>Quality: Use best model for complex tasks</li>
          <li>Load balancing: Distribute requests</li>
          <li>Vendor lock-in avoidance</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'LLM Concepts Interface',
          code: `interface LLMConcepts {
  tokens: {
    definition: 'Subword units (~4 characters per token)';
    importance: 'Tokens determine cost and context window usage';
  };

  contextWindow: {
    definition: 'Maximum tokens (input + output) model can process';
    limits: {
      gpt4: '128K tokens';
      claude35: '200K tokens';
      gemini15Pro: '1M tokens';
    };
  };

  temperature: {
    description: 'Controls randomness in token sampling';
    range: '0.0 to 2.0';
    usage: {
      factual: '0.0-0.3 for deterministic responses';
      balanced: '0.7-0.9 for balanced creativity';
      creative: '1.0-2.0 for varied responses';
    };
  };

  topP: {
    description: 'Nucleus sampling - sample from top tokens';
    range: '0.0 to 1.0';
    default: 0.9;
  };
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Provider Pricing Configuration',
          code: `interface ProviderPricing {
  openai: {
    gpt4Turbo: {
      input: 10;    // per 1M tokens
      output: 30;
      contextWindow: 128000;
    };
    gpt35Turbo: {
      input: 0.5;
      output: 1.5;
      contextWindow: 16385;
    };
  };
  anthropic: {
    claude35Sonnet: {
      input: 3;
      output: 15;
      contextWindow: 200000;
    };
  };
  gemini: {
    gemini15Flash: {
      input: 0.075;
      output: 0.30;
      contextWindow: 1000000;
    };
  };
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Explain how transformers use self-attention to process sequences',
        'Describe token counting importance: "Tokens determine both cost and context window usage"',
        'Compare providers: "GPT-4 for reasoning, Claude for long docs, Gemini for cost"',
        'Mention context window management is critical for long conversations',
        'Emphasize multi-provider strategy for redundancy and cost optimization'
      ]
    },
    {
      id: 291,
      title: 'API Integration Setup',
      content: `
        <h2>Provider Abstraction Layer</h2>
        <p>A unified interface allows switching between providers without changing application code. This abstraction is critical for multi-provider architecture, testing, and vendor lock-in avoidance.</p>

        <h3>AIProvider Interface</h3>
        <p>The interface defines standard methods all providers must implement:</p>
        <ul>
          <li><strong>generateResponse():</strong> Complete response (non-streaming)</li>
          <li><strong>streamResponse():</strong> Streaming response with SSE</li>
          <li><strong>countTokens():</strong> Token counting for cost estimation</li>
          <li><strong>getMaxTokens():</strong> Context window limit for model</li>
          <li><strong>estimateCost():</strong> Calculate cost before request</li>
          <li><strong>isAvailable():</strong> Check if provider is configured</li>
        </ul>

        <h3>Message Format</h3>
        <p>All providers use a unified message format with role-based messaging:</p>
        <ul>
          <li><strong>system:</strong> Instructions for AI behavior and constraints</li>
          <li><strong>user:</strong> User's input or query</li>
          <li><strong>assistant:</strong> AI's response</li>
        </ul>

        <h3>Implementation per Provider</h3>
        <p><strong>OpenAI:</strong> Uses messages array, supports function calling, streaming with SSE</p>
        <p><strong>Anthropic:</strong> Separate system parameter, alternating user/assistant messages, SSE with event types</p>
        <p><strong>Gemini:</strong> Contents array with parts structure, multimodal support, largest context window</p>

        <h3>Response Format</h3>
        <p>Standardized response includes:</p>
        <ul>
          <li>Generated content</li>
          <li>Token usage (input, output, total)</li>
          <li>Cost breakdown</li>
          <li>Finish reason (stop, length, content_filter)</li>
          <li>Model and provider metadata</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'AIProvider Interface',
          code: `export interface AIProvider {
  readonly name: string;
  readonly models: string[];

  generateResponse(
    messages: AIMessage[],
    options?: GenerateOptions
  ): Observable<AIResponse>;

  streamResponse(
    messages: AIMessage[],
    options?: GenerateOptions
  ): Observable<StreamChunk>;

  countTokens(text: string, model?: string): number;
  getMaxTokens(model: string): number;
  estimateCost(inputTokens: number, outputTokens: number, model: string): number;
  isAvailable(): Promise<boolean>;
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Message and Response Models',
          code: `export interface AIMessage {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
  cost?: number;
}

export interface AIResponse {
  id: string;
  content: string;
  model: string;
  provider: string;
  tokens: {
    input: number;
    output: number;
    total: number;
  };
  cost: {
    input: number;
    output: number;
    total: number;
  };
  finishReason: 'stop' | 'length' | 'content_filter';
}

export interface StreamChunk {
  delta: string;
  fullContent: string;
  done: boolean;
  tokens?: number;
}`,
          copyable: true
        },
        {
          id: 3,
          language: 'typescript',
          title: 'OpenAI Service Implementation',
          code: `@Injectable({ providedIn: 'root' })
export class OpenAIService implements AIProvider {
  readonly name = 'openai';
  readonly models = ['gpt-4-turbo', 'gpt-3.5-turbo'];

  generateResponse(messages: AIMessage[], options?: GenerateOptions): Observable<AIResponse> {
    const body = {
      model: options?.model || 'gpt-4-turbo',
      messages: this.convertMessages(messages),
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 1000
    };

    return this.http.post<any>(\`\${this.apiUrl}/chat/completions\`, body).pipe(
      map(response => this.parseResponse(response))
    );
  }

  streamResponse(messages: AIMessage[], options?: GenerateOptions): Observable<StreamChunk> {
    // Fetch with ReadableStream for SSE
    // Parse "data: {...}" lines
    // Accumulate deltas into full content
    // Handle [DONE] signal
  }
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Explain abstraction benefits: "Switch providers without changing app code"',
        'Describe Observable pattern for async operations and streaming',
        'Mention each provider has unique API format (OpenAI messages, Anthropic system param)',
        'Emphasize type safety: "TypeScript interfaces ensure correct implementation"',
        'Discuss token counting: "Approximate with 1 token ≈ 4 chars, use tiktoken for accuracy"'
      ]
    },
    {
      id: 292,
      title: 'Prompt Engineering Fundamentals',
      content: `
        <h2>Understanding Prompt Engineering</h2>
        <p>Prompt engineering is the practice of crafting effective prompts to get desired outputs from LLMs. Good prompts dramatically improve output quality, consistency, and cost-efficiency.</p>

        <h3>Prompt Components</h3>
        <ul>
          <li><strong>System Prompt:</strong> Sets AI behavior, role, tone, and constraints (always present)</li>
          <li><strong>User Prompt:</strong> Actual query or task to perform</li>
          <li><strong>Examples:</strong> Few-shot examples to guide model behavior</li>
          <li><strong>Context:</strong> Relevant information for the task</li>
          <li><strong>Instructions:</strong> Explicit steps or format requirements</li>
        </ul>

        <h3>Best Practices</h3>
        <ol>
          <li><strong>Be Specific:</strong> Clear, detailed instructions produce better results</li>
          <li><strong>Provide Context:</strong> Give necessary background information</li>
          <li><strong>Use Examples:</strong> Show desired input-output format (few-shot)</li>
          <li><strong>Structure Input:</strong> Use XML tags or markdown for complex data</li>
          <li><strong>Specify Format:</strong> Request JSON, markdown, or specific structure</li>
          <li><strong>Test Iteratively:</strong> Refine prompts based on outputs</li>
        </ol>

        <h3>Parameter Tuning</h3>
        <p><strong>Temperature:</strong> Controls randomness</p>
        <ul>
          <li>0.0-0.3: Factual, deterministic (code, factual Q&A)</li>
          <li>0.7-0.9: Balanced (chat, general tasks)</li>
          <li>1.0-2.0: Creative, varied (writing, brainstorming)</li>
        </ul>

        <p><strong>Max Tokens:</strong> Always set to prevent runaway costs</p>
        <p><strong>Stop Sequences:</strong> Control where generation stops</p>

        <h3>Advanced Techniques</h3>
        <ul>
          <li><strong>Few-Shot Prompting:</strong> Provide 2-5 examples of desired behavior</li>
          <li><strong>Chain-of-Thought:</strong> Ask model to show reasoning steps</li>
          <li><strong>Role-Based:</strong> Assign expert role (senior developer, teacher)</li>
          <li><strong>Template System:</strong> Reusable prompts with variables</li>
        </ul>

        <h3>Prompt Template System</h3>
        <p>Templates allow reusing prompts across application with variable substitution:</p>
        <ul>
          <li>Define once, use everywhere</li>
          <li>Version control for prompts</li>
          <li>A/B test different prompts</li>
          <li>Consistent behavior across features</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Prompt Template Model',
          code: `export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  userPromptTemplate: string;
  variables: string[];
  temperature?: number;
  maxTokens?: number;
  category?: string;
}

export interface TemplateVariables {
  [key: string]: string;
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Prompt Template Service',
          code: `@Injectable({ providedIn: 'root' })
export class PromptTemplateService {
  private templates = new Map<string, PromptTemplate>();

  registerTemplate(template: PromptTemplate): void {
    this.templates.set(template.id, template);
  }

  renderTemplate(templateId: string, variables: TemplateVariables): string {
    const template = this.templates.get(templateId);
    if (!template) throw new Error('Template not found');

    let rendered = template.userPromptTemplate;
    for (const [key, value] of Object.entries(variables)) {
      rendered = rendered.replace(new RegExp(\`{{$\{key}}}\`, 'g'), value);
    }
    return rendered;
  }
}`,
          copyable: true
        },
        {
          id: 3,
          language: 'typescript',
          title: 'Few-Shot Prompting Example',
          code: `const fewShotTemplate: PromptTemplate = {
  id: 'sentiment-analysis',
  name: 'Sentiment Analysis',
  systemPrompt: 'Analyze sentiment and respond with positive, negative, or neutral.',
  userPromptTemplate: \`Examples:
Text: "I love this product!"
Sentiment: positive

Text: "This is terrible."
Sentiment: negative

Text: "It's okay."
Sentiment: neutral

Text: "{{text}}"
Sentiment:\`,
  variables: ['text'],
  temperature: 0.1,
  maxTokens: 10
};`,
          copyable: true
        }
      ],
      interviewTips: [
        'Explain prompt engineering importance: "Same model, dramatically different results"',
        'Describe parameter tuning: "Temperature 0 for factual, 1+ for creative"',
        'Mention few-shot: "2-5 examples guide model behavior effectively"',
        'Discuss chain-of-thought: "Asking for steps improves reasoning accuracy"',
        'Emphasize testing: "Iterate on prompts based on actual outputs"'
      ]
    },
    {
      id: 293,
      title: 'Conversation Management',
      content: `
        <h2>Managing AI Conversations</h2>
        <p>Conversations require persistent storage, context window management, and message optimization. Long conversations quickly exceed token limits, requiring truncation or summarization strategies.</p>

        <h3>Storage Requirements</h3>
        <ul>
          <li>Messages with role, content, timestamp, tokens, cost</li>
          <li>Conversation metadata (provider, model, total tokens/cost)</li>
          <li>User association for multi-user applications</li>
          <li>Search and filtering capabilities</li>
          <li>Efficient queries (indexes on user_id, timestamp)</li>
        </ul>

        <h3>Context Window Challenge</h3>
        <p>Models have token limits:</p>
        <ul>
          <li>GPT-4 Turbo: 128,000 tokens</li>
          <li>Claude 3.5: 200,000 tokens</li>
          <li>Gemini 1.5 Pro: 1,000,000 tokens</li>
        </ul>
        <p>Long conversations exceed these limits and must be managed.</p>

        <h3>Truncation Strategies</h3>
        <p><strong>1. Sliding Window (Simple):</strong> Keep last N messages</p>
        <p><strong>2. Token-Based:</strong> Keep messages within token budget</p>
        <p><strong>3. Importance-Based:</strong> Keep system + important + recent</p>
        <p><strong>4. Summarization (Best):</strong> Summarize old messages into one</p>
        <p><strong>5. Hierarchical:</strong> Detailed recent + summarized old</p>

        <h3>Message Optimization</h3>
        <ul>
          <li>Always reserve tokens for output (e.g., 50% input, 50% output)</li>
          <li>Count tokens before sending request</li>
          <li>Remove unnecessary whitespace and formatting</li>
          <li>Track token usage per message</li>
          <li>Alert when approaching context limit</li>
        </ul>

        <h3>Conversation Features</h3>
        <ul>
          <li>Title auto-generation from first message</li>
          <li>Search conversations by content</li>
          <li>Export/import conversations</li>
          <li>Branching (explore alternative responses)</li>
          <li>Message regeneration</li>
          <li>Conversation sharing</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Conversation Models',
          code: `export interface AIConversation {
  id: string;
  title: string;
  messages: AIMessage[];
  provider: 'openai' | 'anthropic' | 'gemini';
  model: string;
  createdAt: Date;
  updatedAt: Date;
  totalTokens: number;
  totalCost: number;
  metadata?: Record<string, any>;
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'SQLite Storage Schema',
          code: `CREATE TABLE ai_conversations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  total_tokens INTEGER DEFAULT 0,
  total_cost REAL DEFAULT 0,
  metadata TEXT
);

CREATE TABLE ai_messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  tokens INTEGER,
  cost REAL,
  FOREIGN KEY (conversation_id) REFERENCES ai_conversations(id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_conversation ON ai_messages(conversation_id);`,
          copyable: true
        },
        {
          id: 3,
          language: 'typescript',
          title: 'Token-Based Message Truncation',
          code: `truncateMessages(messages: AIMessage[], maxTokens: number): AIMessage[] {
  const systemMessage = messages.find(m => m.role === 'system');
  const conversationMessages = messages.filter(m => m.role !== 'system');

  let systemTokens = 0;
  if (systemMessage) {
    systemTokens = this.countTokens(systemMessage.content);
  }

  const availableTokens = maxTokens - systemTokens;
  const result: AIMessage[] = [];
  let usedTokens = 0;

  // Add from most recent, working backwards
  for (let i = conversationMessages.length - 1; i >= 0; i--) {
    const message = conversationMessages[i];
    const tokens = this.countTokens(message.content);

    if (usedTokens + tokens <= availableTokens) {
      result.unshift(message);
      usedTokens += tokens;
    } else {
      break;
    }
  }

  if (systemMessage) {
    result.unshift(systemMessage);
  }

  return result;
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Explain context window limits: "Models have hard token limits we must manage"',
        'Describe truncation strategies with trade-offs',
        'Mention summarization: "Costs tokens once, saves on all future requests"',
        'Discuss token budgeting: "Reserve 50% for input, 50% for output"',
        'Emphasize proactive management: "Track tokens before sending, alert near limits"'
      ]
    },
    {
      id: 294,
      title: 'Streaming Responses',
      content: `
        <h2>Real-Time Streaming with SSE</h2>
        <p>Streaming responses provide better user experience by showing results immediately instead of waiting for complete response. Implemented using Server-Sent Events (SSE) with ReadableStream API.</p>

        <h3>Streaming Benefits</h3>
        <ul>
          <li><strong>Better UX:</strong> User sees results immediately (lower perceived latency)</li>
          <li><strong>Cancellation:</strong> Stop long-running requests mid-generation</li>
          <li><strong>Perceived Performance:</strong> Feels much faster than batch</li>
          <li><strong>Progressive Rendering:</strong> Start displaying early tokens</li>
        </ul>

        <h3>SSE Implementation</h3>
        <p>Server-Sent Events is a browser API for receiving real-time updates from server:</p>
        <ol>
          <li>Client makes fetch request with streaming enabled</li>
          <li>Server sends "data: {...}" lines as tokens are generated</li>
          <li>Client parses each line and accumulates content</li>
          <li>Server sends "[DONE]" signal when complete</li>
        </ol>

        <h3>Abort Controller</h3>
        <p>Allows canceling streaming requests:</p>
        <ul>
          <li>Create AbortController before request</li>
          <li>Pass controller.signal to fetch</li>
          <li>Call controller.abort() to cancel</li>
          <li>Handle AbortError in error handler</li>
        </ul>

        <h3>Display Strategies</h3>
        <p><strong>Token-by-Token:</strong> Update UI for each token (smooth but many reflows)</p>
        <p><strong>Throttled:</strong> Update every 50ms to reduce reflows (better performance)</p>
        <p><strong>Chunk-Based:</strong> Update when full words/sentences complete</p>

        <h3>Error Handling</h3>
        <ul>
          <li>Network interruption mid-stream</li>
          <li>Save partial content before error</li>
          <li>Offer retry or continue options</li>
          <li>Display helpful error messages</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'SSE Streaming Implementation',
          code: `streamResponse(messages: AIMessage[]): Observable<StreamChunk> {
  const subject = new Subject<StreamChunk>();

  fetch(url, { method: 'POST', body: JSON.stringify({ messages, stream: true }) })
    .then(response => {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            subject.next({ delta: '', fullContent, done: true });
            subject.complete();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                subject.complete();
                return;
              }

              const parsed = JSON.parse(data);
              const delta = parsed.choices[0]?.delta?.content || '';
              fullContent += delta;
              subject.next({ delta, fullContent, done: false });
            }
          }
        }
      };

      processStream();
    })
    .catch(error => subject.error(error));

  return subject.asObservable();
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Abort Controller for Cancellation',
          code: `export class AIStreamingService {
  private activeStreams = new Map<string, AbortController>();

  streamWithCancellation(streamId: string, messages: AIMessage[]): Observable<StreamChunk> {
    const controller = new AbortController();
    this.activeStreams.set(streamId, controller);

    return new Observable(observer => {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ messages }),
        signal: controller.signal
      }).then(/* process stream */)
        .catch(error => {
          if (error.name === 'AbortError') {
            observer.error(new Error('Stream cancelled'));
          } else {
            observer.error(error);
          }
        });
    });
  }

  cancelStream(streamId: string): void {
    const controller = this.activeStreams.get(streamId);
    if (controller) {
      controller.abort();
      this.activeStreams.delete(streamId);
    }
  }
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Explain SSE vs WebSocket: "SSE simpler for one-way server-to-client streaming"',
        'Describe abort controller: "Allows canceling fetch requests, important for long generations"',
        'Mention throttling: "Update UI max every 50ms to reduce reflows and improve performance"',
        'Discuss error handling: "Save partial content when stream interrupted, offer retry"',
        'Compare streaming vs batch: "Streaming better UX but more complex implementation"'
      ]
    },
    {
      id: 295,
      title: 'Token Counting & Optimization',
      content: `
        <h2>Token Management</h2>
        <p>Tokens determine both API cost and context window usage. Accurate token counting is critical for cost estimation, budget management, and preventing context overflow.</p>

        <h3>Token Counting Methods</h3>
        <p><strong>Approximate (Client-Side):</strong> 1 token ≈ 4 characters (±20% accurate)</p>
        <p><strong>Accurate (Backend):</strong> Use tiktoken (OpenAI), official tokenizers</p>

        <h3>Cost Calculation</h3>
        <p>Calculate cost before making requests to enforce budgets:</p>
        <ul>
          <li>Count input tokens (all messages in conversation)</li>
          <li>Estimate output tokens (use max_tokens parameter)</li>
          <li>Apply provider pricing (input and output rates differ)</li>
          <li>Compare against user's budget limit</li>
          <li>Reject or warn if over budget</li>
        </ul>

        <h3>Optimization Strategies</h3>
        <p><strong>1. Message Compression:</strong> Remove whitespace, formatting (10-20% savings)</p>
        <p><strong>2. Context Window Management:</strong> Truncate or summarize old messages</p>
        <p><strong>3. Caching:</strong> Cache frequent responses (100% savings on hits)</p>
        <p><strong>4. Model Selection:</strong> Use cheaper models for simple tasks</p>
        <p><strong>5. Shorter Prompts:</strong> Be concise without losing clarity</p>
        <p><strong>6. Stop Sequences:</strong> Stop generation when answer complete</p>

        <h3>Cost Monitoring</h3>
        <ul>
          <li>Track usage per user, feature, and provider</li>
          <li>Set daily and monthly budget limits</li>
          <li>Alert at thresholds (50%, 75%, 90%)</li>
          <li>Display cost estimates before requests</li>
          <li>Show running total in UI</li>
        </ul>

        <h3>Real-World Costs</h3>
        <p>Example: 10,000 users, 5 messages/day, 500 token responses</p>
        <ul>
          <li>GPT-4: ~$15,000/month</li>
          <li>GPT-3.5: ~$750/month (20x cheaper)</li>
          <li>Claude Haiku: ~$300/month</li>
          <li>Gemini Flash: ~$40/month (400x cheaper than GPT-4)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Token Manager Service',
          code: `@Injectable({ providedIn: 'root' })
export class TokenManagerService {
  private pricing = {
    openai: {
      'gpt-4-turbo': { input: 10, output: 30 },
      'gpt-3.5-turbo': { input: 0.5, output: 1.5 }
    },
    anthropic: {
      'claude-3-5-sonnet': { input: 3, output: 15 },
      'claude-3-haiku': { input: 0.25, output: 1.25 }
    },
    gemini: {
      'gemini-1.5-flash': { input: 0.075, output: 0.30 }
    }
  };

  countTokens(text: string): number {
    // Rough approximation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }

  estimateCost(inputTokens: number, outputTokens: number, provider: string, model: string): number {
    const pricing = this.pricing[provider]?.[model];
    if (!pricing) return 0;

    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;
    return inputCost + outputCost;
  }

  optimizeMessages(messages: AIMessage[], maxTokens: number): AIMessage[] {
    // Sliding window optimization
    const systemMessage = messages.find(m => m.role === 'system');
    let result = messages.filter(m => m.role !== 'system');

    while (this.countMessageTokens(result) > maxTokens && result.length > 1) {
      result.shift(); // Remove oldest
    }

    if (systemMessage) result.unshift(systemMessage);
    return result;
  }
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Cost Optimization Example',
          code: `// Before optimization
const response = await aiManager.generateResponse(messages, {
  provider: 'openai',
  model: 'gpt-4-turbo',
  maxTokens: 1000
});
// Cost: ~$0.04 per request

// After optimization
const cached = await cache.get(promptHash);
if (cached) return cached; // $0

const optimized = tokenManager.optimizeMessages(messages, 2000);
const response = await aiManager.generateResponse(optimized, {
  provider: 'gemini',
  model: 'gemini-1.5-flash',
  maxTokens: 1000
});
await cache.set(promptHash, response, { ttl: 3600 });
// Cost: ~$0.0004 per request (100x cheaper)`,
          copyable: true
        }
      ],
      interviewTips: [
        'Explain token importance: "Tokens determine cost and context usage"',
        'Describe pricing differences: "Output tokens 2-3x more expensive than input"',
        'Mention optimization: "80-90% cost savings typical with caching and model selection"',
        'Discuss monitoring: "Track usage per user, set budget limits, alert at thresholds"',
        'Emphasize proactive management: "Estimate cost before request, prevent overruns"'
      ]
    },
    {
      id: 296,
      title: 'Rate Limiting & Error Handling',
      content: `
        <h2>Reliable API Integration</h2>
        <p>AI providers have rate limits and can experience failures. Production applications require robust retry logic, exponential backoff, and circuit breaker patterns.</p>

        <h3>API Rate Limits</h3>
        <ul>
          <li>OpenAI: 3,500 RPM (GPT-4), 10,000 RPM (GPT-3.5)</li>
          <li>Anthropic: 1,000 RPM</li>
          <li>Gemini: 15 RPM (free), 1,000 RPM (paid)</li>
        </ul>

        <h3>Exponential Backoff</h3>
        <p>Retry strategy where wait time increases exponentially after each failure:</p>
        <ul>
          <li>Attempt 1: Wait 1 second</li>
          <li>Attempt 2: Wait 2 seconds</li>
          <li>Attempt 3: Wait 4 seconds</li>
          <li>Attempt 4: Wait 8 seconds</li>
          <li>Add jitter (random variation) to prevent thundering herd</li>
        </ul>

        <h3>Circuit Breaker Pattern</h3>
        <p>Prevent cascading failures by stopping requests to failing services:</p>
        <ul>
          <li><strong>CLOSED:</strong> Normal operation, requests pass through</li>
          <li><strong>OPEN:</strong> Service failing, requests fail immediately</li>
          <li><strong>HALF-OPEN:</strong> Testing if service recovered</li>
        </ul>

        <h3>Error Types</h3>
        <p><strong>Retryable:</strong> 429 (rate limit), 500-599 (server errors), network errors</p>
        <p><strong>Non-Retryable:</strong> 400 (bad request), 401 (unauthorized), 403 (forbidden)</p>

        <h3>Multi-Provider Fallback</h3>
        <p>If one provider fails, automatically try another:</p>
        <ol>
          <li>Primary: Try GPT-4 (best quality)</li>
          <li>Fallback 1: Try Claude 3.5 (good quality, different provider)</li>
          <li>Fallback 2: Try Gemini Flash (fast, cheap)</li>
          <li>Fail: Show error to user with retry option</li>
        </ol>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Exponential Backoff with Jitter',
          code: `async executeWithRetry<T>(
  fn: () => Promise<T>,
  options = { maxRetries: 3, initialDelay: 1000, maxDelay: 32000 }
): Promise<T> {
  let delay = options.initialDelay;

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (!this.isRetryable(error) || attempt === options.maxRetries) {
        throw error;
      }

      // Add jitter: random 0-10% variation
      const jitter = Math.random() * delay * 0.1;
      const waitTime = delay + jitter;

      console.log(\`Retry \${attempt + 1}/\${options.maxRetries} after \${Math.round(waitTime)}ms\`);
      await this.sleep(waitTime);

      delay = Math.min(delay * 2, options.maxDelay);
    }
  }
}

private isRetryable(error: any): boolean {
  return error.status === 429 ||
         (error.status >= 500 && error.status < 600) ||
         error.message?.includes('network');
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Circuit Breaker Implementation',
          code: `enum CircuitState { CLOSED, OPEN, HALF_OPEN }

export class CircuitBreakerService {
  private circuits = new Map<string, {
    state: CircuitState;
    failureCount: number;
    lastFailureTime: number;
  }>();

  async execute<T>(circuitName: string, fn: () => Promise<T>): Promise<T> {
    const circuit = this.getCircuit(circuitName);

    if (circuit.state === CircuitState.OPEN) {
      if (Date.now() - circuit.lastFailureTime > 60000) {
        circuit.state = CircuitState.HALF_OPEN;
      } else {
        throw new Error(\`Circuit breaker OPEN for \${circuitName}\`);
      }
    }

    try {
      const result = await fn();

      if (circuit.state === CircuitState.HALF_OPEN) {
        circuit.state = CircuitState.CLOSED;
        circuit.failureCount = 0;
      }

      return result;
    } catch (error) {
      circuit.failureCount++;
      circuit.lastFailureTime = Date.now();

      if (circuit.failureCount >= 5) {
        circuit.state = CircuitState.OPEN;
      }

      throw error;
    }
  }
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Explain exponential backoff: "Wait time doubles after each failure with random jitter"',
        'Describe circuit breaker states: "CLOSED (normal), OPEN (failing), HALF-OPEN (testing)"',
        'Mention why jitter matters: "Prevents thundering herd when many clients retry simultaneously"',
        'Discuss fallback strategy: "Try primary provider, fall back to alternates on failure"',
        'Emphasize user experience: "Show helpful errors, offer manual retry option"'
      ]
    },
    {
      id: 297,
      title: 'Security & API Key Management',
      content: `
        <h2>CRITICAL: API Key Security</h2>
        <p class="warning"><strong>⚠️ NEVER store API keys in client-side code!</strong> This is the most critical security mistake. Keys exposed in client code can be extracted and used to run up massive costs.</p>

        <h3>Why Client-Side Keys Are Dangerous</h3>
        <ul>
          <li>Anyone can extract keys from client code (view source, network inspector)</li>
          <li>Stolen keys used to make unlimited requests at your expense</li>
          <li>Cannot revoke access or rotate keys without redeploying app</li>
          <li>Cannot monitor usage per user</li>
          <li>Cannot implement authentication or authorization</li>
        </ul>

        <h3>Backend Proxy Pattern (REQUIRED)</h3>
        <p>The only secure approach:</p>
        <ol>
          <li>Client authenticates with your backend (JWT token)</li>
          <li>Client sends request to your backend (not AI provider)</li>
          <li>Backend validates authentication and authorization</li>
          <li>Backend makes request to AI provider with stored keys</li>
          <li>Backend tracks usage per user, enforces limits</li>
          <li>Backend returns response to client</li>
        </ol>

        <h3>Backend Proxy Benefits</h3>
        <ul>
          <li>API keys stored securely on server (environment variables)</li>
          <li>User authentication required</li>
          <li>Per-user rate limiting and budget enforcement</li>
          <li>Usage tracking and monitoring</li>
          <li>Easy key rotation without client changes</li>
          <li>Can cache responses to save costs</li>
          <li>Audit logging for security</li>
        </ul>

        <h3>Environment Variables</h3>
        <p>Store keys in .env file (NEVER commit to git):</p>
        <ul>
          <li>OPENAI_API_KEY=sk-...</li>
          <li>ANTHROPIC_API_KEY=sk-ant-...</li>
          <li>GEMINI_API_KEY=...</li>
          <li>Add .env to .gitignore</li>
        </ul>

        <h3>Additional Security Measures</h3>
        <ul>
          <li>Rate limiting per user to prevent abuse</li>
          <li>Input validation and sanitization</li>
          <li>Output filtering for sensitive data</li>
          <li>CORS configuration for allowed origins</li>
          <li>HTTPS only for all communications</li>
          <li>Key rotation schedule (quarterly)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Backend Proxy Server (Node.js/Express)',
          code: `import express from 'express';
import { authMiddleware } from './middleware/auth';
import OpenAI from 'openai';

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());

// Require authentication for all AI routes
app.post('/api/ai/generate', authMiddleware, async (req, res) => {
  try {
    const { messages, model, temperature } = req.body;
    const userId = req.user.id;

    // Check user budget
    const canProceed = await checkBudget(userId);
    if (!canProceed) {
      return res.status(429).json({ error: 'Budget limit exceeded' });
    }

    // Make API call with stored key
    const response = await openai.chat.completions.create({
      model: model || 'gpt-4-turbo',
      messages,
      temperature: temperature ?? 0.7
    });

    // Track usage
    await trackUsage(userId, response.usage);

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);`,
          copyable: true
        },
        {
          id: 2,
          language: 'bash',
          title: 'Environment Variables (.env)',
          code: `# .env file (NEVER commit to git!)

# Server
PORT=3000
NODE_ENV=production

# JWT
JWT_SECRET=your-very-secure-random-string

# AI Provider Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...

# Database
DATABASE_URL=postgresql://...`,
          copyable: true
        },
        {
          id: 3,
          language: 'typescript',
          title: 'Authentication Middleware',
          code: `import jwt from 'jsonwebtoken';

export async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Always emphasize security: "API keys in client code is critical security vulnerability"',
        'Explain backend proxy pattern clearly: "Client → Backend (auth) → AI Provider"',
        'Mention cost implications: "Exposed keys = unlimited usage at your expense"',
        'Describe authentication: "Require JWT token before allowing AI requests"',
        'Discuss additional measures: "Rate limiting, input validation, audit logging"'
      ]
    },
    {
      id: 298,
      title: 'Cost Management & Monitoring',
      content: `
        <h2>Production Cost Management</h2>
        <p>AI APIs can be expensive at scale. Production applications require comprehensive usage tracking, budget limits, cost alerts, and optimization strategies.</p>

        <h3>Usage Tracking</h3>
        <p>Track every AI request in database:</p>
        <ul>
          <li>User ID</li>
          <li>Provider and model used</li>
          <li>Tokens consumed (input and output)</li>
          <li>Estimated cost</li>
          <li>Timestamp</li>
          <li>Request metadata</li>
        </ul>

        <h3>Budget Limits</h3>
        <p>Set limits at multiple levels:</p>
        <ul>
          <li><strong>Per User:</strong> Daily and monthly limits</li>
          <li><strong>Per Feature:</strong> Limit cost of specific features</li>
          <li><strong>Global:</strong> Total application budget</li>
          <li>Enforce limits before making requests</li>
          <li>Soft limits (warnings) and hard limits (blocking)</li>
        </ul>

        <h3>Cost Alerts</h3>
        <p>Alert at usage thresholds:</p>
        <ul>
          <li>50% of budget: Warning notification</li>
          <li>75% of budget: Alert notification</li>
          <li>90% of budget: Critical alert</li>
          <li>100% of budget: Block requests, notify admin</li>
        </ul>

        <h3>Analytics Dashboard</h3>
        <p>Visualize usage and costs:</p>
        <ul>
          <li>Total cost by day/week/month</li>
          <li>Cost breakdown by provider and model</li>
          <li>Top users by cost</li>
          <li>Requests per second/minute/hour</li>
          <li>Average cost per request</li>
          <li>Cost savings from optimizations</li>
        </ul>

        <h3>Cost Optimization Tracking</h3>
        <p>Measure savings from optimization strategies:</p>
        <ul>
          <li>Cache hit rate and savings</li>
          <li>Model selection impact (GPT-4 vs GPT-3.5 usage)</li>
          <li>Token compression savings</li>
          <li>Context window optimization impact</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Cost Monitor Service',
          code: `@Injectable({ providedIn: 'root' })
export class CostMonitorService {
  async trackUsage(
    userId: string,
    provider: string,
    model: string,
    tokensUsed: number,
    estimatedCost: number
  ): Promise<void> {
    await this.db.execute(\`
      INSERT INTO ai_usage
      (user_id, provider, model, tokens_used, estimated_cost, timestamp)
      VALUES (?, ?, ?, ?, ?, ?)
    \`, [userId, provider, model, tokensUsed, estimatedCost, Date.now()]);

    await this.checkBudgetAlert(userId);
  }

  async checkBudgetLimit(userId: string): Promise<boolean> {
    const budget = await this.getUserBudget(userId);
    const usage = await this.getMonthlyUsage(userId);
    return usage.cost < budget.monthlyLimit;
  }

  private async checkBudgetAlert(userId: string): Promise<void> {
    const budget = await this.getUserBudget(userId);
    const usage = await this.getMonthlyUsage(userId);
    const percent = usage.cost / budget.monthlyLimit;

    if (percent >= 0.9) {
      await this.sendAlert(userId, 'critical', percent);
    } else if (percent >= 0.75) {
      await this.sendAlert(userId, 'warning', percent);
    }
  }
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Usage Analytics Query',
          code: `async getUsageAnalytics(startDate: Date, endDate: Date) {
  return {
    totalCost: await this.db.query(\`
      SELECT SUM(estimated_cost) as total
      FROM ai_usage
      WHERE timestamp BETWEEN ? AND ?
    \`, [startDate.getTime(), endDate.getTime()]),

    byProvider: await this.db.query(\`
      SELECT provider, SUM(estimated_cost) as cost, COUNT(*) as requests
      FROM ai_usage
      WHERE timestamp BETWEEN ? AND ?
      GROUP BY provider
    \`, [startDate.getTime(), endDate.getTime()]),

    topUsers: await this.db.query(\`
      SELECT user_id, SUM(estimated_cost) as cost
      FROM ai_usage
      WHERE timestamp BETWEEN ? AND ?
      GROUP BY user_id
      ORDER BY cost DESC
      LIMIT 10
    \`, [startDate.getTime(), endDate.getTime()])
  };
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Emphasize tracking: "Track every request for cost attribution and analysis"',
        'Explain budget limits: "Set limits at user, feature, and global levels"',
        'Describe alert thresholds: "Warn at 50%, alert at 75%, critical at 90%"',
        'Mention analytics: "Visualize costs to identify optimization opportunities"',
        'Discuss real-world costs: "10K users × 5 messages/day can be $500-$15K/month"'
      ]
    },
    {
      id: 299,
      title: 'Multi-Provider Architecture',
      content: `
        <h2>Orchestrating Multiple AI Providers</h2>
        <p>Using multiple providers offers redundancy, cost optimization, and quality control. The AI Manager service orchestrates provider selection, fallback, and load balancing.</p>

        <h3>Provider Selection Strategies</h3>
        <p><strong>Best Quality:</strong> Use GPT-4 for complex reasoning</p>
        <p><strong>Fastest:</strong> Use Gemini Flash for real-time responses</p>
        <p><strong>Cheapest:</strong> Use Gemini Flash for cost-sensitive tasks</p>
        <p><strong>Specific:</strong> User selects preferred provider</p>
        <p><strong>Load Balance:</strong> Distribute requests across providers</p>
        <p><strong>Fallback:</strong> Try primary, fall back on failure</p>

        <h3>Automatic Fallback</h3>
        <p>If primary provider fails, automatically try alternatives:</p>
        <ol>
          <li>Try primary provider (e.g., GPT-4)</li>
          <li>On failure, try secondary (e.g., Claude 3.5)</li>
          <li>On failure, try tertiary (e.g., Gemini Pro)</li>
          <li>If all fail, show error with manual retry</li>
        </ol>

        <h3>Load Balancing</h3>
        <p>Distribute requests across providers:</p>
        <ul>
          <li>Round-robin: Rotate through providers evenly</li>
          <li>Weighted: More requests to preferred provider</li>
          <li>Least-loaded: Route to provider with lowest usage</li>
          <li>Respect rate limits per provider</li>
        </ul>

        <h3>Circuit Breaker Integration</h3>
        <p>Combine with circuit breaker pattern:</p>
        <ul>
          <li>If provider's circuit is OPEN, skip it</li>
          <li>Only select from available providers</li>
          <li>Automatically recover when circuit closes</li>
        </ul>

        <h3>Provider Comparison</h3>
        <p>A/B test different providers:</p>
        <ul>
          <li>Send same prompt to multiple providers</li>
          <li>Compare response quality, speed, cost</li>
          <li>Make data-driven provider selection decisions</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'AI Manager Service',
          code: `@Injectable({ providedIn: 'root' })
export class AIManagerService {
  private providers = new Map<string, AIProvider>();

  constructor(
    private openai: OpenAIService,
    private anthropic: AnthropicService,
    private gemini: GeminiService,
    private rateLimiter: RateLimiterService,
    private circuitBreaker: CircuitBreakerService
  ) {
    this.providers.set('openai', openai);
    this.providers.set('anthropic', anthropic);
    this.providers.set('gemini', gemini);
  }

  async generateResponse(
    messages: AIMessage[],
    strategy: 'fastest' | 'cheapest' | 'best-quality' | 'fallback' = 'best-quality'
  ): Promise<AIResponse> {
    const provider = await this.selectProvider(strategy);

    return this.executeWithFallback(
      () => this.callProvider(provider, messages)
    );
  }

  private async selectProvider(strategy: string): Promise<AIProvider> {
    switch (strategy) {
      case 'fastest': return this.providers.get('gemini')!;
      case 'cheapest': return this.providers.get('gemini')!;
      case 'best-quality': return this.providers.get('openai')!;
      case 'fallback': return this.getFirstAvailable();
    }
  }

  private async executeWithFallback(fn: () => Promise<AIResponse>): Promise<AIResponse> {
    const available = await this.getAvailableProviders();

    for (const provider of available) {
      try {
        return await fn();
      } catch (error) {
        if (provider === available[available.length - 1]) throw error;
        console.log(\`Provider failed, trying next...\`);
      }
    }
  }
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Provider Comparison',
          code: `async compareProviders(
  messages: AIMessage[],
  providers: string[] = ['openai', 'anthropic', 'gemini']
): Promise<Map<string, AIResponse>> {
  const results = new Map<string, AIResponse>();

  await Promise.all(
    providers.map(async (name) => {
      try {
        const provider = this.providers.get(name);
        const response = await provider.generateResponse(messages);
        results.set(name, response);
      } catch (error) {
        console.error(\`Provider \${name} failed:\`, error);
      }
    })
  );

  return results;
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Explain multi-provider benefits: "Redundancy, cost optimization, quality control"',
        'Describe selection strategies: "Choose based on task: quality, speed, or cost"',
        'Mention fallback: "Automatic failover to backup providers ensures high availability"',
        'Discuss load balancing: "Distribute requests to stay within rate limits"',
        'Emphasize vendor lock-in: "Multi-provider architecture avoids vendor dependency"'
      ]
    },
    {
      id: 300,
      title: 'Testing AI Integration',
      content: `
        <h2>Cost-Effective Testing Strategies</h2>
        <p>Testing AI integrations requires balancing accuracy with cost. Use mocks for unit tests, small prompts for integration tests, and real APIs sparingly.</p>

        <h3>Testing Layers</h3>
        <p><strong>1. Unit Tests (Mock Provider):</strong> Fast, free, test logic without API calls</p>
        <p><strong>2. Integration Tests (Real API):</strong> Use small prompts, cheaper models</p>
        <p><strong>3. E2E Tests (Selective):</strong> Only critical paths with real APIs</p>

        <h3>Mock AI Service</h3>
        <p>Implement mock provider for testing:</p>
        <ul>
          <li>Simulates API delay with setTimeout</li>
          <li>Returns predefined responses</li>
          <li>Supports streaming simulation</li>
          <li>Zero cost, fast execution</li>
          <li>Predictable outputs for assertions</li>
        </ul>

        <h3>Response Caching</h3>
        <p>Cache real API responses for reuse:</p>
        <ul>
          <li>Make real API call once</li>
          <li>Save response to fixture file</li>
          <li>Subsequent tests use cached response</li>
          <li>Share cached responses with team</li>
        </ul>

        <h3>Cost-Effective Integration Tests</h3>
        <p>When using real APIs:</p>
        <ul>
          <li>Use short prompts (minimize tokens)</li>
          <li>Use cheaper models (GPT-3.5, Haiku, Flash)</li>
          <li>Set low max_tokens (100-200)</li>
          <li>Run only on CI/CD, not locally</li>
          <li>Set budget limits for test accounts</li>
        </ul>

        <h3>Test Scenarios</h3>
        <ul>
          <li><strong>Success:</strong> Normal request and response</li>
          <li><strong>Rate Limit:</strong> 429 error handling and retry</li>
          <li><strong>Timeout:</strong> Network timeout handling</li>
          <li><strong>Invalid Key:</strong> 401 error handling</li>
          <li><strong>Server Error:</strong> 500 error handling</li>
          <li><strong>Streaming:</strong> SSE parsing and cancellation</li>
          <li><strong>Context Overflow:</strong> Token limit exceeded</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Mock AI Service',
          code: `@Injectable({ providedIn: 'root' })
export class MockAIService implements AIProvider {
  readonly name = 'mock';
  readonly models = ['mock-gpt-4'];

  generateResponse(messages: AIMessage[]): Observable<AIResponse> {
    return timer(500).pipe(
      map(() => ({
        id: \`mock-\${Date.now()}\`,
        content: 'This is a mock AI response for testing.',
        model: 'mock-gpt-4',
        provider: 'mock',
        tokens: { input: 50, output: 20, total: 70 },
        cost: { input: 0, output: 0, total: 0 },
        finishReason: 'stop'
      }))
    );
  }

  streamResponse(messages: AIMessage[]): Observable<StreamChunk> {
    const content = 'Mock streaming response.';
    const words = content.split(' ');

    return new Observable(observer => {
      let fullContent = '';
      let i = 0;

      const interval = setInterval(() => {
        if (i < words.length) {
          const word = words[i++] + ' ';
          fullContent += word;
          observer.next({ delta: word, fullContent, done: false });
        } else {
          observer.next({ delta: '', fullContent, done: true });
          observer.complete();
          clearInterval(interval);
        }
      }, 50);
    });
  }
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Integration Test Example',
          code: `describe('AIManagerService Integration', () => {
  let service: AIManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AIManagerService,
        { provide: OpenAIService, useClass: MockAIService }
      ]
    });
    service = TestBed.inject(AIManagerService);
  });

  it('should generate response', async () => {
    const messages: AIMessage[] = [
      { id: '1', role: 'user', content: 'Test', timestamp: new Date() }
    ];

    const response = await service.generateResponse(messages, 'best-quality');

    expect(response).toBeDefined();
    expect(response.content).toBeTruthy();
    expect(response.tokens.total).toBeGreaterThan(0);
  });

  it('should fallback on provider failure', async () => {
    // Test fallback logic
  });

  it('should handle rate limit errors', async () => {
    // Test retry with exponential backoff
  });
});`,
          copyable: true
        }
      ],
      interviewTips: [
        'Explain testing strategy: "Mocks for unit tests, real APIs sparingly for integration"',
        'Mention cost control: "Use cheap models, small prompts, run on CI/CD only"',
        'Describe caching: "Cache real responses, reuse in tests, share with team"',
        'Discuss error testing: "Test rate limits, timeouts, invalid keys"',
        'Emphasize balance: "Accuracy vs cost - find right mix for your project"'
      ]
    },
    {
      id: 301,
      title: 'Demo Implementation',
      content: `
        <h2>Complete AI Chat Application</h2>
        <p>Bringing everything together into a production-ready chat interface with streaming, provider selection, cost tracking, and error handling.</p>

        <h3>Features Implemented</h3>
        <ul>
          <li>Real-time streaming responses with cancellation</li>
          <li>Provider and model selection (OpenAI, Anthropic, Gemini)</li>
          <li>Token usage and cost display</li>
          <li>Conversation history with persistence</li>
          <li>Context window optimization</li>
          <li>Error handling with retry options</li>
          <li>Markdown rendering for code blocks</li>
          <li>Responsive UI for mobile and desktop</li>
        </ul>

        <h3>Architecture Overview</h3>
        <p>The demo integrates all components built in this lesson:</p>
        <ul>
          <li><strong>AIManagerService:</strong> Provider selection and orchestration</li>
          <li><strong>ConversationService:</strong> Message history management</li>
          <li><strong>StreamingService:</strong> SSE streaming with cancellation</li>
          <li><strong>TokenManagerService:</strong> Token counting and cost estimation</li>
          <li><strong>CostMonitorService:</strong> Usage tracking and budgets</li>
        </ul>

        <h3>UI Components</h3>
        <p><strong>Provider Selector:</strong> Choose strategy and model</p>
        <p><strong>Message List:</strong> Display conversation with roles</p>
        <p><strong>Streaming Indicator:</strong> Show generation progress</p>
        <p><strong>Stats Bar:</strong> Display tokens and cost</p>
        <p><strong>Input Area:</strong> Textarea with send button</p>

        <h3>User Experience</h3>
        <ul>
          <li>Instant visual feedback when sending message</li>
          <li>Smooth streaming of AI responses</li>
          <li>Clear indication of costs before and after</li>
          <li>Easy provider switching without losing history</li>
          <li>Error messages with actionable next steps</li>
          <li>Keyboard shortcuts (Ctrl+Enter to send)</li>
        </ul>

        <h3>Production Considerations</h3>
        <ul>
          <li>All API calls go through backend proxy (security)</li>
          <li>User authentication required</li>
          <li>Budget limits enforced</li>
          <li>Usage tracked per user</li>
          <li>Error logging and monitoring</li>
          <li>Performance optimized (virtual scrolling for long chats)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'AI Chat Page Component',
          code: `@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.page.html'
})
export class AIChatPage implements OnInit, OnDestroy {
  conversation: AIConversation | null = null;
  messages: AIMessage[] = [];
  userInput = '';
  isStreaming = false;
  streamingContent = '';
  totalTokens = 0;
  estimatedCost = 0;

  constructor(
    private aiManager: AIManagerService,
    private conversationService: ConversationService,
    private streamingService: AIStreamingService,
    private tokenManager: TokenManagerService
  ) {}

  async sendMessage() {
    const userMessage = this.userInput.trim();
    this.userInput = '';

    await this.conversationService.addMessage(
      this.conversation!.id,
      'user',
      userMessage
    );

    await this.streamAIResponse();
  }

  private async streamAIResponse() {
    this.isStreaming = true;
    this.streamingContent = '';

    this.aiManager
      .streamResponse(this.messages, 'best-quality')
      .subscribe({
        next: (chunk) => {
          this.streamingContent = chunk.fullContent;
          if (chunk.done) {
            this.saveResponse(chunk.fullContent);
          }
        },
        error: (error) => this.handleError(error)
      });
  }
}`,
          copyable: true
        },
        {
          id: 2,
          language: 'html',
          title: 'Chat UI Template',
          code: `<ion-header>
  <ion-toolbar>
    <ion-title>AI Chat</ion-title>
  </ion-toolbar>
  <ion-toolbar>
    <div class="stats-bar">
      <span>{{ messages.length }} messages</span>
      <span>{{ totalTokens }} tokens</span>
      <span>\${{ estimatedCost.toFixed(4) }}</span>
    </div>
  </ion-toolbar>
</ion-header>

<ion-content>
  <app-provider-selector (selectionChange)="onProviderChange($event)">
  </app-provider-selector>

  <div class="messages">
    <div *ngFor="let msg of messages" [class]="'message-' + msg.role">
      <div class="content" [innerHTML]="msg.content | markdown"></div>
      <div class="meta">{{ msg.tokens }} tokens</div>
    </div>

    <div *ngIf="isStreaming" class="message-assistant">
      <div [innerHTML]="streamingContent | markdown"></div>
      <ion-button (click)="cancelStream()">Stop</ion-button>
    </div>
  </div>
</ion-content>

<ion-footer>
  <ion-textarea [(ngModel)]="userInput" placeholder="Type message...">
  </ion-textarea>
  <ion-button (click)="sendMessage()" [disabled]="isStreaming">
    Send
  </ion-button>
</ion-footer>`,
          copyable: true
        },
        {
          id: 3,
          language: 'scss',
          title: 'Chat UI Styles',
          code: `.stats-bar {
  display: flex;
  justify-content: space-around;
  padding: 8px;
  background: var(--ion-color-light);
  font-size: 13px;
}

.messages {
  padding: 16px;
}

.message-user {
  margin-left: auto;
  max-width: 85%;
  background: var(--ion-color-primary);
  color: var(--ion-color-primary-contrast);
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 8px;
}

.message-assistant {
  max-width: 85%;
  background: var(--ion-color-light);
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 8px;
}

.meta {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
}`,
          copyable: true
        }
      ],
      interviewTips: [
        'Describe integration: "All services work together: AI Manager, Conversation, Streaming, Tokens"',
        'Explain streaming UX: "Shows results immediately, feels much faster than waiting"',
        'Mention cost transparency: "Display tokens and costs builds user trust"',
        'Discuss error handling: "Clear messages with retry options improve UX"',
        'Emphasize production-ready: "Backend proxy, auth, budgets, monitoring all implemented"'
      ]
    }
  ]
};
