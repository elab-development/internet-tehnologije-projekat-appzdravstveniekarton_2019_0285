<?php

namespace App\Http\Controllers;

use App\Models\Lekar;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LekarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lekars=Lekar::all();
        return $lekars;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($lekar_id)
    {
        $lekar=Lekar::find($lekar_id);
        if(is_null($lekar))
        {
            return response()->json('Data not found',404);
        }
        return response()->json($lekar);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lekar $lekar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lekar $lekar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($lekar_id)
{
    // Pronalaženje lekara po ID-u
    $lekar = Lekar::find($lekar_id);

    // Provera da li je lekar pronađen
    if (!$lekar) {
        // Ako lekar nije pronađen, vraćamo odgovarajući odgovor sa statusom 404
        return response()->json(['message' => 'Lekar not found'], 404);
    }

    // Brisanje lekara iz baze podataka
    $lekar->delete();

    // Vraćanje odgovora o uspehu kao JSON odgovor
    return response()->json(['message' => 'Lekar deleted']);
}

}
