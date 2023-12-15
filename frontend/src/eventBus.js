// eventBus.js
import { createApp } from 'vue';

const eventBus = createApp({});
eventBus.config.globalProperties.eventBus = eventBus;

export default eventBus;
