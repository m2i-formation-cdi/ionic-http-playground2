import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { NavController, AlertController } from '@ionic/angular';
import { AlertButton } from '@ionic/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  public taskList:Array<{id: number, taskName: string, done: boolean}> = [];

  constructor(private taskService: TaskService,
              private navCtrl: NavController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loadTasks();
  }

  private loadTasks() {
    this.taskService.findAll().subscribe((data: any) => {
      this.taskList = data;
    });
  }

  editTask(taskId){
    this.navCtrl.navigateForward('/task-form/' + taskId);
  }

  async deleteTask(taskId){

    const okButton: AlertButton = {
      text: "Oui",
      handler: ()=> {
        this.taskService.delete(taskId)
          .subscribe( ()=> this.loadTasks());
      }
    };

    const noButton: AlertButton = {
      text: "Non",
      role: "cancel"
    };

    let confirm = await this.alertCtrl.create(
      {
        message: "Etes vous absolument certain(e) de vouloir supprimer cet élement ?",
        header: "Confirmation",
        buttons: [okButton, noButton] 
      }
    );

    confirm.present();
  }

}
