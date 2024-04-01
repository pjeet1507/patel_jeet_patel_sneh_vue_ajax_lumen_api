<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Studio;


class StudioController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */

     public function getAll() {
         $Studio = Studio::all();
         return response()->json($Studio);
     }
    
}
