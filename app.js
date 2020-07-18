
Vue.component('task',{
    props:['task'],
    template:                    
        `<div class="ui segment task" v-bind:class="task.completed ? 'done' : 'todo'"> 
            <div class="ui grid">
                <div class="row">
                    <div class="left floated equal wide column">
                        <div class="ui checkbox">
                            <input type="checkbox" name="task" v-on:click="toggleDone($event, task.id)" :checked="task.completed">
                            <label>{{task.name}}<span class="description">{{task.description}}</span></label>
                        </div>
                    <div>
                    <div class="right floated equal wide column">
                        <i class="icon pencil" alt="Edit" v-on:click="editTask($event, task.id)"></i>
                        <i class="icon trash" alt="Delete" v-on:click="deleteTask($event, task.id)"></i>
                    </div>
                </div>
         </div>`,
    methods:{
        findTask: function(id){
            return app.tasks.find(item => item.id == id);
        },
        toggleDone: function(event, id){
            
            event.stopImmediatePropagation();

            let task = this.findTask(id);
            if(task){
                task.completed = !task.completed;
                app.message = `Task ${id} updated.`
            }
        },
        editTask: function(event, id){
            app.action = 'edit';
            let task = this.findTask(id);
            
            if(task){
                app.task = {
                            id: task.id, 
                            name: task.name,
                            description: task.description,
                            completed: task.completed
                            };
            }
            
        },
        
        deleteTask: function(event, id){
          
            event.stopImmediatePropagation();
            let taskIndex = app.tasks.findIndex(item => item.id == id);
            
            if(taskIndex >= 0){
                app.$delete(app.tasks, taskIndex);
                app.message = `Task ${id} deleted.`
            }

           
        }
    }

})

var app = new Vue({
    el: '#app',
    data:{
        tasks: [
            {   
                id:1, 
                name:'Todo 1', 
                description: 'This is a todo', 
                completed: false
            },
            {   
                id:2, 
                name:'Todo 2', 
                description: 'this is the todo number 2', 
                completed: true
            },
            {   
                id:3, 
                name:'Todo 3', 
                description: 'This is todo number 3', 
                completed: true  
            }, 
            {   
                id:4, 
                name:'Todo 4', 
                description: 'This is todo number 4', 
                completed: true 
            }
        ],
        task: {},
        message: '',
        action: 'create'
    },
    computed:{
        completedTasks: function(){
            return this.tasks.filter( item => item.completed == true );      
        },
        todoTasks: function(){
            return this.tasks.filter( item => item.completed == false);
        },
        nextId: function(){
            return (this.tasks.sort(function(a,b){return a.id - b.id;}))[this.tasks.length - 1].id + 1;
        }
       
    },
    methods:{
        clear: function(){
            this.task = {};
            this.action = 'create';
            this.message = '';
        },
        updateTask: function(event, id){
            event.stopImmediatePropagation();
            
            
            let task = this.tasks.find(item => item.id == id);
            
            if (task){
                task.name = this.task.name;
                task.description = this.task.description;
                task.completed = this.task.completed;
                this.message = `Task ${id} updated.`
            }
        },
        createTask: function(event){
            event.stopImmediatePropagation();
            
            (!this.task.completed) ? this.task.completed = false : this.task.completed = true;
            let taskId = this.nextId;
            this.task.id = taskId;
            let newTask = Object.assign({}, this.task);
            this.tasks.push(newTask);
            this.clear();
            this.message = `Task ${taskId} created.`
            
        }
    }
})
