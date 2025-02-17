import { fileApi } from "@/features/file/services";
import { togglerAppLoading } from "@/lib/redux/GlobalState";
import { store } from "@/lib/redux/Store";

export const scanPCHandler = (fileName: string, folderName: string, handler: (newFile: string) => void) => {
        try { 
            const bte = new window.TD.Bte()
            console.log(bte);
            store.dispatch(togglerAppLoading(true))
            bte.scanner() 
                .done(async function(data: Blob){ 
                    var newBlob = new Blob([data], { type: "application/pdf" });
                    const res = await fileApi.UploadFileBucketWithBlob({blob: newBlob, fileName, folderName})
                    if(res.data.succeeded){
                        handler(res.data.data)
                    }
                    store.dispatch(togglerAppLoading(false))
                }) 
                .fail(function(){ 
                    alert("not scanned."); 
                    store.dispatch(togglerAppLoading(false))
                }) 
                .connectionError(function(){ 
                    alert("connectionError"); 
                    store.dispatch(togglerAppLoading(false))
                }) 
                .scan(); 
        } catch (e) { 
            alert("lỗi kết nối"); 
            console.log(e); 
            store.dispatch(togglerAppLoading(false))
        } 
    // try {
    //     var f = new TD.bte();
    //     console.log(f);
    //     console.log(TD);
    //     f.scanFinished = function (res, data) {
    //         console.log(res);
    //     };
    //     f.ondatareceived= function(res) {
    //         console.log(res);
            
    //     }
    //     f.onclose= function(res) {
    //         console.log(res);
            
    //     }
    //     f.onmessage= function(res) {
    //         console.log(res);
            
    //     }
    //     f.onopen= function(res) {
    //         console.log(res);
            
    //     }
    //     f.onstatus= function(res) {
    //         console.log(res);
            
    //     }
    //     f.scan();
    //     // (f as any).scanFinished = async function (res: any, data: Blob) {
    //     //     console.log(res, data);
    //     //     if (res) {
    //     //         const res = await fileApi.UploadFileBucketWithBlob({blob: data, fileName, folderName})
    //     //         console.log(res);
    //     //         if(res.data.succeeded){
    //     //             handler(res.data.data)
    //     //         }
    //     //     } else {
    //     //         alert("not scanned.");
    //     //     }
    //     // };
    //     // console.log((f as any).scanFinished);
    //     // f.scan();
    // } catch (e) {
    //     console.log(e);
        
    //     alert("Bạn chưa cài phần mềm tích hợp scan!");
    // }     	
}