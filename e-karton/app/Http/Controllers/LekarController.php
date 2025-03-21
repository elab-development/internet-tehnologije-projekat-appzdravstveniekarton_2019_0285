<?php

namespace App\Http\Controllers;

use App\Models\Lekar;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LekarController extends Controller
{
    
    public function index()
    {
        $lekars = Lekar::all();

        return response()->json($lekars)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');
    }

   
    public function create()
{
    
    return view('lekars.create');
}


    
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

    
    public function show($lekar_id)
    {
        $lekar=Lekar::find($lekar_id);
        if(is_null($lekar))
        {
            return response()->json('Data not found',404);
        }
        return response()->json($lekar);
    }

    
    public function edit(Lekar $lekar)
    {
        //
    }

    
    public function update(Request $request, Lekar $lekar)
    {
        //
    }

   
    public function destroy($lekar_id)
{
    
    $lekar = Lekar::find($lekar_id);

    
    if (!$lekar) {
        
        return response()->json(['message' => 'Lekar not found'], 404);
    }

    
    $lekar->delete();

    
    return response()->json(['message' => 'Lekar deleted']);
}

}
