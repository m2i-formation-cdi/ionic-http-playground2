import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage implements OnInit {


  public task = {
    taskName: '',
    done: false
  };

  constructor(private taskService: TaskService,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private route: ActivatedRoute) { 

      let id = this.route.snapshot.params['id'];
      
      if(id){
        this.taskService.findOne(id).subscribe(
          (data: any) => this.task = data,
          (err) => this.manageError(err)
        );
      }
  }

  ngOnInit() {
  }

  private async manageError(err){
    console.log(err);
    let toast = await this.toastCtrl.create(
      {
        message: "Une erreur nous empêche d'accèder à votre demande",
        duration: 1000,
        position: "middle"
      }
    );

    toast.present();
  }

  validateForm(){
    if(this.task.taskName && this.task.taskName.trim() != ""){
      if('id' in this.task){
        this.updateTask();
      } else {
        this.insertTask();
      } 
    } 
  }

  private updateTask(){
    this.taskService.update(this.task)
      .subscribe(
          //callback de succès
          () => this.navCtrl.back(),
          //callback d'erreur
          (err) => this.manageError(err)
      );
  }

  private insertTask() {
    this.taskService.insert(this.task)
      .subscribe(
        //callback de succès
        () => this.navCtrl.back(),
        //callback d'erreur
        (err) => this.manageError(err)
      );
  }
}
