<?php

namespace App\Http\Controllers;

use App\Models\Dijagnoza;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class DijagnozaController extends Controller
{
    public function index()
    {
        $dijagnoze = Dijagnoza::all();
        return response()->json($dijagnoze);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'lekar_id' => 'required|exists:lekars,id',
            'naziv' => 'required|string|max:255',
            'opis' => 'required|string',
        ]);

        $dijagnoza = Dijagnoza::create($validatedData);
        return response()->json($dijagnoza, 201);
    }

    public function show($id)
    {
        $dijagnoza = Dijagnoza::findOrFail($id);
        return response()->json($dijagnoza);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'user_id' => 'exists:users,id',
            'lekar_id' => 'exists:lekars,id',
            'naziv' => 'string|max:255',
            'opis' => 'string',
        ]);

        $dijagnoza = Dijagnoza::findOrFail($id);
        $dijagnoza->update($validatedData);
        return response()->json($dijagnoza, 200);
    }

    public function destroy($id)
    {
        $dijagnoza = Dijagnoza::findOrFail($id);
        $dijagnoza->delete();
        return response()->json(null, 204);
    }
}
