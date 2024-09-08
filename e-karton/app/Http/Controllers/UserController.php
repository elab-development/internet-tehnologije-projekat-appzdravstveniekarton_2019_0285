<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
<<<<<<< HEAD
    
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function index()
    {
        $users = User::all();
        return $users;
    }

<<<<<<< HEAD
    
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function create()
    {
        //
    }

<<<<<<< HEAD
    
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function store(Request $request)
    {
        //
    }

<<<<<<< HEAD
    
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function show($user_id)
    {
        $user=User::find($user_id);
        if(is_null($user))
        {
            return response()->json('Data not found',404);
        }
        return response()->json($user);
    }

<<<<<<< HEAD
   
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function edit(User $user)
    {
        //
    }

<<<<<<< HEAD
   
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function update(Request $request, User $user)
    {
        //
    }

<<<<<<< HEAD
    
=======

>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
    public function destroy(User $user)
    {
        //
    }


    public function showUserDijagnoze($user_id)
    {
<<<<<<< HEAD
        
        $user = User::findOrFail($user_id);

        
        $dijagnoze = $user->dijagnozas; 

        
=======

        $user = User::findOrFail($user_id);


        $dijagnoze = $user->dijagnozas; 


>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345
        return response()->json($dijagnoze);
    }


}
