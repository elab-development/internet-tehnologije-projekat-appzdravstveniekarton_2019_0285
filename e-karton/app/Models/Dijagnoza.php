<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dijagnoza extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'lekar_id', 'naziv', 'opis'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
<<<<<<< HEAD

    public function lekar()
    {
        return $this->belongsTo(Lekar::class);
    }
=======
>>>>>>> 1322f0259a970ee86529d24a6997197b54eaa345

    public function lekar()
    {
        return $this->belongsTo(Lekar::class);
    }

}