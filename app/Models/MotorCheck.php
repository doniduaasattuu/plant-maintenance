<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class MotorCheck extends Model
{
    use HasFactory;

    protected $table = 'motor_checks';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'operational_status_id',
        'cleanliness_id',
        'number_of_greasing',
        'temperature_de',
        'temperature_body',
        'temperature_nde',
        'vibration_dev',
        'vibration_deh',
        'vibration_dea',
        'vibration_def',
        'noise_de',
        'vibration_ndev',
        'vibration_ndeh',
        'vibration_ndef',
        'noise_nde',
        'created_at',
        'updated_at',
        'checked_by',
    ];

    public function checkingForm()
    {
        return $this->morphOne(EquipmentCheckingForm::class, 'formable');
    }
}
