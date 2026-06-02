// STUDENT NOTE: The point of this component is not a demo of some ideal web component design.  Other demos take care of that a bit better.  We just aim to show DI.

import {StorageFactory} from './storage.js';  // import the storage system

// Task list web component
class TaskListComponent extends HTMLElement {
	constructor() {
		super();
		// We'll inject the actual storage in connectedCallback
		this.taskService = null;
		this.tasks = [];
	}

	connectedCallback() {
		// Get storage type from the attribute
		const storageType = this.getAttribute('storage') || 'memory';

		// Use the factory to create the right storage implementation
		this.taskService = StorageFactory.createStorage(storageType);


		// Initialize with loading indicator
		this.renderLoading();

		// Load tasks (works with both sync and async implementations)
		Promise.resolve(this.taskService.load())
			.then(tasks => {
				this.tasks = tasks;
				this.render();
				this.setupListeners();
			})
			.catch(error => {
				console.error('Error loading tasks:', error);
				this.renderError('Failed to load tasks');
			});

	}

	addTask(text) {
		if (!text.trim()) return;

		const task = {
			id: Date.now(),
			text,
			completed: false
		};

		this.tasks.push(task);

		// Show loading state
		this.renderSaving();

		// Handle both sync and async save
		Promise.resolve(this.taskService.save(this.tasks))
			.then(() => {
				this.render();
			})
			.catch(error => {
				console.error('Error saving task:', error);
				// Remove the task if save failed
				this.tasks.pop();
				this.renderError('Failed to save task');
			});
	}

	toggleTask(id) {
		const task = this.tasks.find(t => t.id === parseInt(id));
		if (task) {
			task.completed = !task.completed;

			this.renderSaving();

			Promise.resolve(this.taskService.save(this.tasks))
				.then(() => {
					this.render();
				})
				.catch(error => {
					console.error('Error updating task:', error);
					// Revert the change if save failed
					task.completed = !task.completed;
					this.renderError('Failed to update task');
				});
		}
	}

	renderLoading() {
		this.innerHTML = `<div class="loading">Loading tasks...</div>`;
	}

	renderSaving() {
		const saveIndicator = document.createElement('div');
		saveIndicator.className = 'save-indicator';
		saveIndicator.textContent = 'Saving...';
		this.appendChild(saveIndicator);

		// Remove after 1 second
		setTimeout(() => {
			if (this.contains(saveIndicator)) {
				this.removeChild(saveIndicator);
			}
		}, 1000);
	}

	renderError(message) {
		const errorElement = document.createElement('div');
		errorElement.className = 'error-message';
		errorElement.textContent = message;
		this.appendChild(errorElement);

		// Remove after 3 seconds
		setTimeout(() => {
			if (this.contains(errorElement)) {
				this.removeChild(errorElement);
			}
		}, 3000);

		this.render();
	}

	render() {
		this.innerHTML = `
        <div class="task-container">
            <h3>${this.taskService.getName()} Storage Tasks</h3>
            <div class="add-task">
                <input type="text" class="task-input" placeholder="Add a new task...">
                <button class="add-btn">Add</button>
            </div>
            <ul class="task-list">
                ${this.tasks.map(task => `
                    <li class="task-item ${task.completed ? 'completed' : ''}">
                        <input type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                        <span>${task.text}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

		this.setupListeners();
	}

	setupListeners() {
		// Add task on button click
		this.addEventListener('click', e => {
			if (e.target.classList.contains('add-btn')) {
				const input = this.querySelector('.task-input');
				this.addTask(input.value);
				input.value = '';
				input.focus();
			}

			// Toggle completion status
			if (e.target.type === 'checkbox') {
				this.toggleTask(e.target.dataset.id);
			}
		});

		// Add task on Enter key
		this.addEventListener('keypress', e => {
			if (e.key === 'Enter' && e.target.classList.contains('task-input')) {
				this.addTask(e.target.value);
				e.target.value = '';
			}
		});
	}

}

// Register the web component
customElements.define('task-list', TaskListComponent);
