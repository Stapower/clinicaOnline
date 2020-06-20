import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';
import { DataBaseConnectionService } from './../../services/database-connection.service';


@Component({
	selector: 'app-upload-image',
	templateUrl: './upload-image.component.html',
	styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

	constructor( public dataBaseService : DataBaseConnectionService) { }

	@Output() imageUrl = new EventEmitter();
	@Input() cleanIt;


	ngOnInit(): void {
	}

	fileData: File = null;
	previewUrl: any = null;
	fileUploadProgress: string = null;
	uploadedFilePath: string = null;

	fileProgress(fileInput: any) {
		this.fileData = <File>fileInput.target.files[0];
		this.preview();
		this.onSubmit();
	}

	preview() {
		// Show preview 
		var mimeType = this.fileData.type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(this.fileData);
		reader.onload = (_event) => {
			this.previewUrl = reader.result;
		}
	}

	async onSubmit() {
		const formData = new FormData();
		formData.append('file', this.fileData);
		console.log(this.fileData);
		console.log("previewUrl", this.previewUrl);
		console.log("arrayBuffer", this.fileData.arrayBuffer());
		console.log("slice", this.fileData.slice());
		
		var arrayBuffer;
		await this.fileData.slice().arrayBuffer().then(i => {
			console.log("array", i);
			arrayBuffer = i;
		});
		

		var x = await this.dataBaseService.addImage(arrayBuffer, this.fileData.name);
		this.imageUrl.emit(x);
		
		if(this.cleanIt != null && this.cleanIt != undefined){
			this.clean();
		}
		
	}

	clean(){
		this.previewUrl = null;
		this.fileData = null;
		this.fileUploadProgress = null;
		this.uploadedFilePath = null;
	}



}
