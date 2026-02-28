# Agent System Integration Guide

## Overview

The `complete-agent-system.json` file contains a complete autonomous AI agent system ready for deployment in any LLM orchestration framework. This guide shows how to integrate it with popular frameworks.

## File Location
```
/mnt/d/aidd/ecommerce/complete-agent-system.json
```

---

## Integration with LangChain

### 1. Install Dependencies

```bash
pip install langchain langchain-openai
```

### 2. Load Agent Configuration

```python
import json
from langchain.agents import Agent, Tool, AgentExecutor
from langchain.llms import OpenAI
from langchain_openai import ChatOpenAI

# Load configuration
with open('complete-agent-system.json', 'r') as f:
    agent_system = json.load(f)

# Initialize LLM
llm = ChatOpenAI(model="gpt-4", temperature=0)

# Create agents from configuration
agents = {}
for agent_config in agent_system['specialist_agents']:
    agent_id = agent_config['agent_id']
    agent_name = agent_config['agent_name']

    # Convert agent actions to LangChain tools
    tools = []
    for action in agent_config['actions']:
        tool = Tool(
            name=action['action_name'],
            func=lambda x, action_id=action['action_id']: execute_action(agent_id, action_id, x),
            description=action['description']
        )
        tools.append(tool)

    # Create agent with tools
    agents[agent_id] = AgentExecutor.from_agent_and_tools(
        agent=Agent(tools=tools, llm=llm, agent=AgentType.OPENAI_FUNCTIONS),
        tools=tools,
        verbose=True
    )

# Orchestrator agent
orchestrator_config = agent_system['orchestrator_agent']
orchestrator_tools = []
for action in orchestrator_config['actions']:
    tool = Tool(
        name=action['action_name'],
        func=lambda x, action_id=action['action_id']: execute_orchestrator_action(action_id, x),
        description=action['description']
    )
    orchestrator_tools.append(tool)

orchestrator = AgentExecutor.from_agent_and_tools(
    agent=Agent(tools=orchestrator_tools, llm=llm, agent=AgentType.OPENAI_FUNCTIONS),
    tools=orchestrator_tools,
    verbose=True
)

def execute_action(agent_id, action_id, params):
    """Execute agent action (implement based on your needs)"""
    # Call the agent's action handler
    return f"Action {action_id} executed by {agent_id}: {params}"

def execute_orchestrator_action(action_id, params):
    """Execute orchestrator action"""
    return f"Orchestrator action {action_id}: {params}"

# Run workflow
result = orchestrator.run("Execute WF-FEATURE-DEV workflow")
print(result)
```

---

## Integration with AutoGPT

### 1. Install Dependencies

```bash
pip install auto-gpt-framework
```

### 2. Load and Create Agents

```python
import json
from autogpt.agent import Agent, Task
from autogpt.planning import TaskPlanner

# Load configuration
with open('complete-agent-system.json', 'r') as f:
    agent_system = json.load(f)

# Create task planner
planner = TaskPlanner()

# Create agents from configuration
agents = {}
for agent_config in agent_system['specialist_agents']:
    agent = Agent(
        name=agent_config['agent_name'],
        role=agent_config['role'],
        goal=agent_config['core_responsibilities'][0],
        backstory=agent_config['description'],
        max_concurrent_tasks=agent_config['max_concurrent_tasks']
    )
    agents[agent_config['agent_id']] = agent

# Create orchestrator
orchestrator_config = agent_system['orchestrator_agent']
orchestrator = Agent(
    name=orchestrator_config['agent_name'],
    role=orchestrator_config['role'],
    goal="Coordinate and manage all agents",
    backstory=orchestrator_config['description'],
    max_concurrent_tasks=orchestrator_config['max_concurrent_tasks']
)

# Execute workflow
workflow = agent_system['workflow_templates'][0]  # WF-FEATURE-DEV
tasks = []

for task_config in workflow['tasks']:
    task = Task(
        title=task_config['task_name'],
        description=f"Execute {task_config['action_id']}",
        agent=agents[task_config['agent_id']],
        dependencies=task_config['dependencies']
    )
    tasks.append(task)

# Plan and execute
plan = planner.plan_tasks(tasks)
results = orchestrator.execute_plan(plan)

print("Workflow Results:")
for result in results:
    print(f"  {result['task']}: {result['status']}")
```

---

## Integration with CrewAI

### 1. Install Dependencies

```bash
pip install crewai
```

### 2. Create Crew from Agents

```python
import json
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI

# Load configuration
with open('complete-agent-system.json', 'r') as f:
    agent_system = json.load(f)

# Initialize LLM
llm = ChatOpenAI(model="gpt-4")

# Create agents from configuration
agents = {}
for agent_config in agent_system['specialist_agents']:
    agent = Agent(
        role=agent_config['role'],
        goal=agent_config['core_responsibilities'][0],
        backstory=agent_config['description'],
        llm=llm,
        verbose=True
    )
    agents[agent_config['agent_id']] = agent

# Create orchestrator
orch_config = agent_system['orchestrator_agent']
orchestrator = Agent(
    role=orch_config['role'],
    goal="Manage all agents and workflows",
    backstory=orch_config['description'],
    llm=llm,
    verbose=True
)

# Create tasks from workflow
workflow = agent_system['workflow_templates'][0]  # WF-FEATURE-DEV
tasks = []

for task_config in workflow['tasks']:
    task = Task(
        description=f"Execute {task_config['task_name']}",
        expected_output=f"Success message for {task_config['task_name']}",
        agent=agents[task_config['agent_id']]
    )
    tasks.append(task)

# Create crew
crew = Crew(
    agents=list(agents.values()) + [orchestrator],
    tasks=tasks,
    verbose=2,
    process=Process.hierarchical,
    manager_agent=orchestrator
)

# Execute
result = crew.kickoff()
print(result)
```

---

## Integration with Custom Python Framework

### 1. Initialize from JSON

```python
import json
import asyncio
from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class AgentConfig:
    agent_id: str
    agent_name: str
    role: str
    skills: Dict
    actions: List
    dependencies: Dict
    server_requirements: Dict

class AgentSystemManager:
    def __init__(self, config_file: str):
        with open(config_file, 'r') as f:
            self.config = json.load(f)

        self.orchestrator = self.config['orchestrator_agent']
        self.agents = {
            agent['agent_id']: AgentConfig(**agent)
            for agent in self.config['specialist_agents']
        }
        self.workflows = {
            wf['workflow_id']: wf
            for wf in self.config['workflow_templates']
        }

    async def execute_workflow(self, workflow_id: str):
        """Execute a workflow asynchronously"""
        workflow = self.workflows[workflow_id]

        for task in workflow['tasks']:
            agent_id = task['agent_id']
            action_id = task['action_id']

            # Execute task
            result = await self.execute_task(agent_id, action_id, task)
            print(f"{task['task_name']}: {result['status']}")

    async def execute_task(self, agent_id: str, action_id: str, task: Dict):
        """Execute a single task"""
        # Implementation here
        return {"status": "completed", "result": "success"}

# Usage
async def main():
    manager = AgentSystemManager('complete-agent-system.json')

    # Execute workflow
    await manager.execute_workflow('WF-FEATURE-DEV')

    # Monitor agents
    health = manager.check_all_agents_health()
    print(f"System Health: {health}")

if __name__ == "__main__":
    asyncio.run(main())
```

---

## Agent Actions Reference

### Frontend Expert Agent

```python
# Create Component
actions = {
    'FE-001': {
        'name': 'CreateComponent',
        'input': {
            'component_name': 'ProductCard',
            'component_type': 'card',
            'styling_framework': 'tailwind'
        }
    },
    'FE-002': {
        'name': 'CreatePage',
        'input': {
            'page_name': 'Products',
            'page_route': '/products',
            'components': ['ProductCard', 'FilterPanel']
        }
    },
    'FE-003': {
        'name': 'IntegrateAPIEndpoint',
        'input': {
            'component_id': 'ProductCard',
            'api_endpoint': '/api/v1/products',
            'method': 'GET'
        }
    }
}
```

### Backend Expert Agent

```python
# Create Database Schema
actions = {
    'BE-001': {
        'name': 'CreateDatabaseSchema',
        'input': {
            'entity_name': 'Product',
            'fields': [
                {'name': 'id', 'type': 'integer', 'constraints': ['PRIMARY KEY']},
                {'name': 'name', 'type': 'string'},
                {'name': 'price', 'type': 'float'}
            ]
        }
    },
    'BE-002': {
        'name': 'CreateAPIEndpoint',
        'input': {
            'endpoint_path': '/products',
            'method': 'GET',
            'description': 'Get all products'
        }
    }
}
```

### Git Expert Agent

```python
# Create Feature Branch
actions = {
    'GIT-001': {
        'name': 'CreateFeatureBranch',
        'input': {
            'branch_name': 'feature/product-filter',
            'base_branch': 'main',
            'feature_type': 'feature'
        }
    },
    'GIT-006': {
        'name': 'DeployToEnvironment',
        'input': {
            'environment': 'production',
            'version': 'v1.2.0'
        }
    }
}
```

---

## Monitoring and Events

### Subscribe to Agent Events

```python
from typing import Callable

class EventBus:
    def __init__(self):
        self.listeners = {}

    def subscribe(self, event: str, handler: Callable):
        """Subscribe to an event"""
        if event not in self.listeners:
            self.listeners[event] = []
        self.listeners[event].append(handler)

    def emit(self, event: str, data: Dict):
        """Emit an event"""
        if event in self.listeners:
            for handler in self.listeners[event]:
                handler(data)

# Usage
event_bus = EventBus()

def handle_task_completed(data):
    print(f"Task {data['task_id']} completed!")

event_bus.subscribe('task.completed', handle_task_completed)
event_bus.emit('task.completed', {'task_id': 'T-FD-001'})
```

---

## Quality Gates Integration

```python
class QualityGateChecker:
    def __init__(self, agent_system: Dict):
        self.gates = {
            gate['gate_id']: gate
            for gate in agent_system['quality_gates']
        }

    def check_gate(self, gate_id: str) -> bool:
        """Check if quality gate passes"""
        gate = self.gates[gate_id]

        for check in gate['checks']:
            if check['required'] and not self.run_check(check['name']):
                return False

        return True

    def run_check(self, check_name: str) -> bool:
        """Run a specific check"""
        # Implementation based on check type
        return True

# Usage
checker = QualityGateChecker(agent_system)
if checker.check_gate('QG-COMMIT'):
    print("Commit quality gate passed!")
else:
    print("Commit quality gate failed!")
```

---

## Deployment

### Docker Compose

```bash
# Start all services
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f orchestrator

# Stop all services
docker-compose down
```

### Kubernetes

```bash
# Create namespace
kubectl create namespace ecommerce

# Apply manifests
kubectl apply -f k8s/ -n ecommerce

# Check deployment
kubectl get pods -n ecommerce
kubectl logs -f deployment/orchestrator -n ecommerce
```

---

## Environment Variables

```bash
# Backend
DATABASE_URL=postgresql://user:password@postgres:5432/ecommerce_db
REDIS_URL=redis://redis:6379/0
SECRET_KEY=your-secret-key-here

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Orchestrator
ORCHESTRATOR_MODE=master
LOG_LEVEL=DEBUG
MAX_CONCURRENT_TASKS=100
```

---

## Testing Agents

```python
def test_frontend_agent():
    """Test frontend agent"""
    from complete_agent_system import FrontendExpertAgent

    agent = FrontendExpertAgent()
    result = agent.execute_action('FE-001', {
        'component_name': 'TestComponent',
        'component_type': 'button'
    })

    assert result['status'] == 'success'
    assert 'component_code' in result

def test_backend_agent():
    """Test backend agent"""
    from complete_agent_system import BackendExpertAgent

    agent = BackendExpertAgent()
    result = agent.execute_action('BE-001', {
        'entity_name': 'TestEntity',
        'fields': [
            {'name': 'id', 'type': 'integer'}
        ]
    })

    assert result['status'] == 'success'
```

---

## Performance Monitoring

```python
import time

class PerformanceMonitor:
    def __init__(self):
        self.metrics = {}

    def track_action(self, agent_id: str, action_id: str):
        """Decorator to track action execution time"""
        def decorator(func):
            async def wrapper(*args, **kwargs):
                start = time.time()
                result = await func(*args, **kwargs)
                duration = time.time() - start

                key = f"{agent_id}:{action_id}"
                if key not in self.metrics:
                    self.metrics[key] = []
                self.metrics[key].append(duration)

                return result
            return wrapper
        return decorator

# Usage
monitor = PerformanceMonitor()

@monitor.track_action('fe-001', 'FE-001')
async def create_component():
    # Component creation logic
    pass
```

---

## Next Steps

1. Choose your framework (LangChain, AutoGPT, CrewAI, or Custom)
2. Load `complete-agent-system.json`
3. Initialize agents from configuration
4. Deploy shared services (PostgreSQL, Redis, RabbitMQ)
5. Execute workflows
6. Monitor agent health and progress
7. Implement quality gates

---

## Support

For issues or questions:
- Review agent definitions in `complete-agent-system.json`
- Check framework documentation for integration details
- Implement logging and monitoring for debugging
- Use event bus for inter-agent communication

All agents are ready to deploy immediately!
