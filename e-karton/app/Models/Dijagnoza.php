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

    public function lekar()
    {
        return $this->belongsTo(Lekar::class);
    }

}
