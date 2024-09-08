<?php

namespace App\Http\Controllers;

use App\Models\Lekar;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LekarController extends Controller
{
<<<<<<< HEAD
    
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function index()
    {
        $lekars = Lekar::all();

        return response()->json($lekars)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');
    }

<<<<<<< HEAD
   
    public function create()
{
    
    return view('lekars.create');
}


    
=======

    public function create()
{

    return view('lekars.create');
}



>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'specijalizacija' => 'required|string|max:255',
            'adresa' => 'required|string|max:255',
        ]);

        $lekar = Lekar::create($validatedData);
        return response()->json($lekar, 201);
    }

<<<<<<< HEAD
    
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function show($lekar_id)
    {
        $lekar=Lekar::find($lekar_id);
        if(is_null($lekar))
        {
            return response()->json('Data not found',404);
        }
        return response()->json($lekar);
    }

<<<<<<< HEAD
    
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function edit(Lekar $lekar)
    {
        //
    }

<<<<<<< HEAD
    
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function update(Request $request, Lekar $lekar)
    {
        //
    }

<<<<<<< HEAD
   
    public function destroy($lekar_id)
{
    
    $lekar = Lekar::find($lekar_id);

    
    if (!$lekar) {
        
        return response()->json(['message' => 'Lekar not found'], 404);
    }

    
    $lekar->delete();

    
=======

    public function destroy($lekar_id)
{

    $lekar = Lekar::find($lekar_id);


    if (!$lekar) {

        return response()->json(['message' => 'Lekar not found'], 404);
    }


    $lekar->delete();


>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    return response()->json(['message' => 'Lekar deleted']);
}

}
